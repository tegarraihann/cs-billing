import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-KfHTSO_U.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const alertDialog = ref({
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "",
      cancelText: "",
      onConfirm: null
    });
    const form = useForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
      inquiry_source: "",
      status: "new",
      notes: ""
    });
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
    const submit = () => {
      form.post(route("admin-cs.customers.store"), {
        onSuccess: () => {
          showAlert(
            "success",
            "Berhasil",
            "Data pelanggan berhasil ditambahkan ke dalam sistem."
          );
        },
        onError: (errors) => {
          const errorMessage = Object.keys(errors).length > 0 ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan." : "Terjadi kesalahan saat menyimpan data pelanggan.";
          showAlert("error", "Gagal Menyimpan", errorMessage);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-fddc8f90${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-fddc8f90${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-fddc8f90${_scopeId}><div class="flex items-center" data-v-fddc8f90${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-fddc8f90${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fddc8f90${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-fddc8f90${_scopeId}></path></svg></div><div data-v-fddc8f90${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-fddc8f90${_scopeId}> Tambah Pelanggan Baru </h2><p class="text-sage-600" data-v-fddc8f90${_scopeId}> Tambahkan data pelanggan baru ke dalam sistem </p></div></div><div class="mt-4 sm:mt-0" data-v-fddc8f90${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-fddc8f90${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-fddc8f90${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-fddc8f90${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-fddc8f90${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-fddc8f90${_scopeId}> Form Tambah Pelanggan </h3><p class="text-sm text-sage-600 mt-1" data-v-fddc8f90${_scopeId}> Lengkapi informasi pelanggan dengan benar </p></div><div class="p-6" data-v-fddc8f90${_scopeId}><form class="space-y-6" data-v-fddc8f90${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-fddc8f90${_scopeId}><div data-v-fddc8f90${_scopeId}><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Nama Lengkap <span class="text-red-500" data-v-fddc8f90${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Email <span class="text-red-500" data-v-fddc8f90${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).email)} type="email" id="email" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Nomor Telepon <span class="text-red-500" data-v-fddc8f90${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" id="phone" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}>`);
            if (unref(form).errors.phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="company" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Nama Perusahaan </label><input${ssrRenderAttr("value", unref(form).company)} type="text" id="company" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}>`);
            if (unref(form).errors.company) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.company)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="inquiry_source" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Sumber Inquiry <span class="text-red-500" data-v-fddc8f90${_scopeId}>*</span></label><select id="inquiry_source" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}><option value="" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).inquiry_source) ? ssrLooseContain(unref(form).inquiry_source, "") : ssrLooseEqual(unref(form).inquiry_source, "")) ? " selected" : ""}${_scopeId}>Pilih Sumber</option><option value="whatsapp" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).inquiry_source) ? ssrLooseContain(unref(form).inquiry_source, "whatsapp") : ssrLooseEqual(unref(form).inquiry_source, "whatsapp")) ? " selected" : ""}${_scopeId}>WhatsApp</option><option value="email" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).inquiry_source) ? ssrLooseContain(unref(form).inquiry_source, "email") : ssrLooseEqual(unref(form).inquiry_source, "email")) ? " selected" : ""}${_scopeId}>Email</option><option value="phone" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).inquiry_source) ? ssrLooseContain(unref(form).inquiry_source, "phone") : ssrLooseEqual(unref(form).inquiry_source, "phone")) ? " selected" : ""}${_scopeId}>Telepon</option><option value="website" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).inquiry_source) ? ssrLooseContain(unref(form).inquiry_source, "website") : ssrLooseEqual(unref(form).inquiry_source, "website")) ? " selected" : ""}${_scopeId}>Website</option></select>`);
            if (unref(form).errors.inquiry_source) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.inquiry_source)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="status" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Status <span class="text-red-500" data-v-fddc8f90${_scopeId}>*</span></label><select id="status" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-fddc8f90${_scopeId}><option value="" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "") : ssrLooseEqual(unref(form).status, "")) ? " selected" : ""}${_scopeId}>Pilih Status</option><option value="new" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "new") : ssrLooseEqual(unref(form).status, "new")) ? " selected" : ""}${_scopeId}>Baru</option><option value="contacted" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "contacted") : ssrLooseEqual(unref(form).status, "contacted")) ? " selected" : ""}${_scopeId}>Dihubungi</option><option value="quoted" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "quoted") : ssrLooseEqual(unref(form).status, "quoted")) ? " selected" : ""}${_scopeId}>Dikutip</option><option value="converted" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "converted") : ssrLooseEqual(unref(form).status, "converted")) ? " selected" : ""}${_scopeId}>Konversi</option><option value="closed" data-v-fddc8f90${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "closed") : ssrLooseEqual(unref(form).status, "closed")) ? " selected" : ""}${_scopeId}>Ditutup</option></select>`);
            if (unref(form).errors.status) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-fddc8f90${_scopeId}><label for="address" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Alamat </label><textarea id="address" rows="3" placeholder="Masukkan alamat lengkap pelanggan..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).address)}</textarea>`);
            if (unref(form).errors.address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-fddc8f90${_scopeId}><label for="notes" class="block text-sm font-medium text-sage-700 mb-2" data-v-fddc8f90${_scopeId}> Catatan </label><textarea id="notes" rows="4" placeholder="Catatan tentang pelanggan, inquiry, atau komunikasi..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (unref(form).errors.notes) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-fddc8f90${_scopeId}>${ssrInterpolate(unref(form).errors.notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-fddc8f90${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-fddc8f90${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-fddc8f90${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-fddc8f90${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-fddc8f90${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-fddc8f90${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-fddc8f90${_scopeId}>Simpan Pelanggan</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
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
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
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
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Tambah Pelanggan Baru "),
                        createVNode("p", { class: "text-sage-600" }, " Tambahkan data pelanggan baru ke dalam sistem ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Form Tambah Pelanggan "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Lengkapi informasi pelanggan dengan benar ")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "name",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Nama Lengkap "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            id: "name",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "email",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Email "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            id: "email",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "phone",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Nomor Telepon "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                            type: "tel",
                            id: "phone",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).phone]
                          ]),
                          unref(form).errors.phone ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.phone), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "company",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, " Nama Perusahaan "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).company = $event,
                            type: "text",
                            id: "company",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).company]
                          ]),
                          unref(form).errors.company ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.company), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "inquiry_source",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Sumber Inquiry "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).inquiry_source = $event,
                            id: "inquiry_source",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, [
                            createVNode("option", { value: "" }, "Pilih Sumber"),
                            createVNode("option", { value: "whatsapp" }, "WhatsApp"),
                            createVNode("option", { value: "email" }, "Email"),
                            createVNode("option", { value: "phone" }, "Telepon"),
                            createVNode("option", { value: "website" }, "Website")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).inquiry_source]
                          ]),
                          unref(form).errors.inquiry_source ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.inquiry_source), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "status",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Status "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).status = $event,
                            id: "status",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                          }, [
                            createVNode("option", { value: "" }, "Pilih Status"),
                            createVNode("option", { value: "new" }, "Baru"),
                            createVNode("option", { value: "contacted" }, "Dihubungi"),
                            createVNode("option", { value: "quoted" }, "Dikutip"),
                            createVNode("option", { value: "converted" }, "Konversi"),
                            createVNode("option", { value: "closed" }, "Ditutup")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).status]
                          ]),
                          unref(form).errors.status ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.status), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "address",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Alamat "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).address = $event,
                          id: "address",
                          rows: "3",
                          placeholder: "Masukkan alamat lengkap pelanggan...",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                        }, "              ", 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).address]
                        ]),
                        unref(form).errors.address ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.address), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "notes",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Catatan "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          id: "notes",
                          rows: "4",
                          placeholder: "Catatan tentang pelanggan, inquiry, atau komunikasi...",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                        }, "              ", 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).notes]
                        ]),
                        unref(form).errors.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.notes), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-cs.customers.index"),
                          class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "animate-spin -ml-1 mr-3 h-4 w-4 text-white",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              class: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4"
                            }),
                            createVNode("path", {
                              class: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })
                          ])) : createCommentVNode("", true),
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Pelanggan"))
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fddc8f90"]]);
export {
  Create as default
};
