import { withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-5xAgxkNI.js";
import { Edit as Edit$1, Eye, ArrowLeft, X, LoaderCircle, CheckCircle } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CwW4XkV3.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    vendor: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      nama_vendor: props.vendor.nama_vendor,
      pic: props.vendor.pic || "",
      no_hp: props.vendor.no_hp || "",
      email: props.vendor.email || "",
      no_kantor: props.vendor.no_kantor || "",
      nomor_rekening: props.vendor.nomor_rekening,
      nama_rekening: props.vendor.nama_rekening,
      nib: props.vendor.nib || "",
      photo: null,
      legal_document: null
    });
    const handlePhotoChange = (event) => {
      const file = event.target.files[0];
      form.photo = file || null;
    };
    const handleLegalDocumentChange = (event) => {
      const file = event.target.files[0];
      form.legal_document = file || null;
    };
    const submit = () => {
      const hasFiles = form.photo || form.legal_document;
      if (hasFiles) {
        form.transform((data) => ({
          ...data,
          _method: "PUT"
        })).post(route("admin-keuangan.vendors.update", props.vendor.id), {
          onSuccess: () => {
          },
          onError: (errors) => {
            console.log("Validation errors:", errors);
          }
        });
      } else {
        form.put(route("admin-keuangan.vendors.update", props.vendor.id), {
          onSuccess: () => {
          },
          onError: (errors) => {
            console.log("Validation errors:", errors);
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-836b6999${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-836b6999${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-836b6999${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-836b6999${_scopeId}><div class="flex items-center" data-v-836b6999${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-836b6999${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit$1), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-836b6999${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-836b6999${_scopeId}>Edit Vendor: ${ssrInterpolate(__props.vendor.nama_vendor)}</h1><p class="mt-1 text-sm text-gray-600" data-v-836b6999${_scopeId}>Perbarui informasi vendor</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-836b6999${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.show", __props.vendor.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Lihat Detail `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Lihat Detail ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-836b6999${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-836b6999${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-836b6999${_scopeId}>Form Edit Vendor</h3><p class="mt-1 text-sm text-gray-600" data-v-836b6999${_scopeId}>Perbarui informasi vendor dengan benar</p></div><div class="p-6" data-v-836b6999${_scopeId}><form class="space-y-6" data-v-836b6999${_scopeId}><div data-v-836b6999${_scopeId}><label for="nama_vendor" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Nama Vendor <span class="text-red-500" data-v-836b6999${_scopeId}>*</span></label><input id="nama_vendor"${ssrRenderAttr("value", unref(form).nama_vendor)} type="text" placeholder="Masukkan nama vendor" class="${ssrRenderClass([{ "border-red-500": __props.errors.nama_vendor }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.nama_vendor) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.nama_vendor)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="pic" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> PIC (Person In Charge) </label><input id="pic"${ssrRenderAttr("value", unref(form).pic)} type="text" placeholder="Masukkan nama PIC" class="${ssrRenderClass([{ "border-red-500": __props.errors.pic }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.pic) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.pic)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="no_hp" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> No HP </label><input id="no_hp"${ssrRenderAttr("value", unref(form).no_hp)} type="text" placeholder="Masukkan nomor HP" class="${ssrRenderClass([{ "border-red-500": __props.errors.no_hp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.no_hp) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.no_hp)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Email </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Masukkan alamat email" class="${ssrRenderClass([{ "border-red-500": __props.errors.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.email) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="no_kantor" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> No Kantor </label><input id="no_kantor"${ssrRenderAttr("value", unref(form).no_kantor)} type="text" placeholder="Masukkan nomor kantor" class="${ssrRenderClass([{ "border-red-500": __props.errors.no_kantor }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.no_kantor) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.no_kantor)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="nomor_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Nomor Rekening <span class="text-red-500" data-v-836b6999${_scopeId}>*</span></label><input id="nomor_rekening"${ssrRenderAttr("value", unref(form).nomor_rekening)} type="text" placeholder="Masukkan nomor rekening" class="${ssrRenderClass([{ "border-red-500": __props.errors.nomor_rekening }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.nomor_rekening) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.nomor_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="nama_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Nama Rekening <span class="text-red-500" data-v-836b6999${_scopeId}>*</span></label><input id="nama_rekening"${ssrRenderAttr("value", unref(form).nama_rekening)} type="text" placeholder="Masukkan nama pemilik rekening" class="${ssrRenderClass([{ "border-red-500": __props.errors.nama_rekening }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.nama_rekening) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.nama_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> NIB (Nomor Induk Berusaha) </label><input id="nib"${ssrRenderAttr("value", unref(form).nib)} type="text" placeholder="Masukkan nomor induk berusaha" class="${ssrRenderClass([{ "border-red-500": __props.errors.nib }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-836b6999${_scopeId}>`);
            if (__props.errors.nib) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Foto Vendor </label>`);
            if (__props.vendor.photo_path) {
              _push2(`<div class="mb-3" data-v-836b6999${_scopeId}><p class="text-sm text-gray-600 mb-2" data-v-836b6999${_scopeId}>Foto saat ini:</p><img${ssrRenderAttr("src", `/storage/${__props.vendor.photo_path}`)} alt="Foto Vendor" class="w-20 h-20 object-cover rounded-lg border border-gray-200" data-v-836b6999${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" id="photo" accept="image/*" class="${ssrRenderClass([{ "border-red-500": __props.errors.photo }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"])}" data-v-836b6999${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-836b6999${_scopeId}> Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. Kosongkan jika tidak ingin mengubah foto. </p>`);
            if (__props.errors.photo) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-836b6999${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-836b6999${_scopeId}> Dokumen Legal </label>`);
            if (__props.vendor.legal_document_path) {
              _push2(`<div class="mb-3" data-v-836b6999${_scopeId}><p class="text-sm text-gray-600 mb-2" data-v-836b6999${_scopeId}>Dokumen saat ini:</p><a${ssrRenderAttr("href", `/storage/${__props.vendor.legal_document_path}`)} target="_blank" class="inline-flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200" data-v-836b6999${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-836b6999${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-836b6999${_scopeId}></path></svg> Lihat Dokumen </a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<input type="file" id="legal_document" accept=".pdf" class="${ssrRenderClass([{ "border-red-500": __props.errors.legal_document }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"])}" data-v-836b6999${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-836b6999${_scopeId}> Format yang didukung: PDF. Maksimal 10MB. Kosongkan jika tidak ingin mengubah dokumen. </p>`);
            if (__props.errors.legal_document) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-836b6999${_scopeId}>${ssrInterpolate(__props.errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3 pt-4 border-t border-gray-200" data-v-836b6999${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.show", __props.vendor.id),
              class: "inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(X), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Batal `);
                } else {
                  return [
                    createVNode(unref(X), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed" data-v-836b6999${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(unref(LoaderCircle), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
                          createVNode(unref(Edit$1), { class: "w-6 h-6 text-white" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit Vendor: " + toDisplayString(__props.vendor.nama_vendor), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Perbarui informasi vendor")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.show", __props.vendor.id),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Lihat Detail ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Kembali ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Form Edit Vendor"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Perbarui informasi vendor dengan benar")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nama_vendor",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Nama Vendor "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nama_vendor",
                          "onUpdate:modelValue": ($event) => unref(form).nama_vendor = $event,
                          type: "text",
                          placeholder: "Masukkan nama vendor",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nama_vendor }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nama_vendor]
                        ]),
                        __props.errors.nama_vendor ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nama_vendor), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "pic",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " PIC (Person In Charge) "),
                        withDirectives(createVNode("input", {
                          id: "pic",
                          "onUpdate:modelValue": ($event) => unref(form).pic = $event,
                          type: "text",
                          placeholder: "Masukkan nama PIC",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.pic }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).pic]
                        ]),
                        __props.errors.pic ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.pic), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "no_hp",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " No HP "),
                        withDirectives(createVNode("input", {
                          id: "no_hp",
                          "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
                          type: "text",
                          placeholder: "Masukkan nomor HP",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.no_hp }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).no_hp]
                        ]),
                        __props.errors.no_hp ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.no_hp), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "email",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Email "),
                        withDirectives(createVNode("input", {
                          id: "email",
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Masukkan alamat email",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.email }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).email]
                        ]),
                        __props.errors.email ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "no_kantor",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " No Kantor "),
                        withDirectives(createVNode("input", {
                          id: "no_kantor",
                          "onUpdate:modelValue": ($event) => unref(form).no_kantor = $event,
                          type: "text",
                          placeholder: "Masukkan nomor kantor",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.no_kantor }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).no_kantor]
                        ]),
                        __props.errors.no_kantor ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.no_kantor), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nomor_rekening",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Nomor Rekening "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nomor_rekening",
                          "onUpdate:modelValue": ($event) => unref(form).nomor_rekening = $event,
                          type: "text",
                          placeholder: "Masukkan nomor rekening",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nomor_rekening }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nomor_rekening]
                        ]),
                        __props.errors.nomor_rekening ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nomor_rekening), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nama_rekening",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Nama Rekening "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nama_rekening",
                          "onUpdate:modelValue": ($event) => unref(form).nama_rekening = $event,
                          type: "text",
                          placeholder: "Masukkan nama pemilik rekening",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nama_rekening }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nama_rekening]
                        ]),
                        __props.errors.nama_rekening ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nama_rekening), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nib",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " NIB (Nomor Induk Berusaha) "),
                        withDirectives(createVNode("input", {
                          id: "nib",
                          "onUpdate:modelValue": ($event) => unref(form).nib = $event,
                          type: "text",
                          placeholder: "Masukkan nomor induk berusaha",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nib }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nib]
                        ]),
                        __props.errors.nib ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nib), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "photo",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Foto Vendor "),
                        __props.vendor.photo_path ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-2" }, "Foto saat ini:"),
                          createVNode("img", {
                            src: `/storage/${__props.vendor.photo_path}`,
                            alt: "Foto Vendor",
                            class: "w-20 h-20 object-cover rounded-lg border border-gray-200"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        createVNode("input", {
                          type: "file",
                          id: "photo",
                          onChange: handlePhotoChange,
                          accept: "image/*",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200", { "border-red-500": __props.errors.photo }]
                        }, null, 34),
                        createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. Kosongkan jika tidak ingin mengubah foto. "),
                        __props.errors.photo ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.photo), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "legal_document",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Dokumen Legal "),
                        __props.vendor.legal_document_path ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-3"
                        }, [
                          createVNode("p", { class: "text-sm text-gray-600 mb-2" }, "Dokumen saat ini:"),
                          createVNode("a", {
                            href: `/storage/${__props.vendor.legal_document_path}`,
                            target: "_blank",
                            class: "inline-flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                          }, [
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
                                d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              })
                            ])),
                            createTextVNode(" Lihat Dokumen ")
                          ], 8, ["href"])
                        ])) : createCommentVNode("", true),
                        createVNode("input", {
                          type: "file",
                          id: "legal_document",
                          onChange: handleLegalDocumentChange,
                          accept: ".pdf",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200", { "border-red-500": __props.errors.legal_document }]
                        }, null, 34),
                        createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Format yang didukung: PDF. Maksimal 10MB. Kosongkan jika tidak ingin mengubah dokumen. "),
                        __props.errors.legal_document ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.legal_document), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-gray-200" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.show", __props.vendor.id),
                          class: "inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(X), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock(unref(LoaderCircle), {
                            key: 0,
                            class: "w-4 h-4 mr-2 animate-spin"
                          })) : (openBlock(), createBlock(unref(CheckCircle), {
                            key: 1,
                            class: "w-4 h-4 mr-2"
                          })),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                        ], 8, ["disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Vendors/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-836b6999"]]);
export {
  Edit as default
};
