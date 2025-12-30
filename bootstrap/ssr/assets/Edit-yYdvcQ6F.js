import { computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-KnprtzM7.js";
import { ArrowLeft, Loader2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DOEtrGyc.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    serviceType: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      code: props.serviceType.code,
      description: props.serviceType.description || "",
      is_active: props.serviceType.is_active
    });
    const processing = computed(() => form.processing);
    const submit = () => {
      form.put(route("admin-keuangan.service-types.update", props.serviceType.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Service Type" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.service-types.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Manajemen Service Type `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Manajemen Service Type ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Edit Service Type</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Edit service type ${ssrInterpolate(__props.serviceType.code)}</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="code" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Kode Service Type <span class="text-red-500"${_scopeId}>*</span></label><input id="code"${ssrRenderAttr("value", unref(form).code)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.code }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Contoh: OF/AF, HANDLING"${_scopeId}>`);
            if (unref(form).errors.code) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Deskripsi </label><textarea id="description" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Deskripsi detail tentang jenis biaya/service..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="flex items-center"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"${_scopeId}><span class="ml-2 block text-sm text-gray-900"${_scopeId}> Status Aktif </span></label></div><div class="mt-8 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.service-types.index"),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Edit Service Type" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.service-types.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Manajemen Service Type ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Edit Service Type"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Edit service type " + toDisplayString(__props.serviceType.code), 1)
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "code",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, [
                            createTextVNode(" Kode Service Type "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "code",
                            "onUpdate:modelValue": ($event) => unref(form).code = $event,
                            type: "text",
                            class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.code }],
                            placeholder: "Contoh: OF/AF, HANDLING"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).code]
                          ]),
                          unref(form).errors.code ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.code), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "description",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, " Deskripsi "),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                            placeholder: "Deskripsi detail tentang jenis biaya/service..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("label", { class: "flex items-center cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              type: "checkbox",
                              class: "h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("span", { class: "ml-2 block text-sm text-gray-900" }, " Status Aktif ")
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.service-types.index"),
                            class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: processing.value,
                            class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                          }, [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "animate-spin -ml-1 mr-2 h-4 w-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : "Simpan Perubahan"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ServiceTypes/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
