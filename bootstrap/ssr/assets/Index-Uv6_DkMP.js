import { ref, reactive, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, createTextVNode, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const dashboardRoute = "/master-admin/dashboard";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    settings: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const props = __props;
    const loading = ref(false);
    const form = reactive({
      company_name: ((_a = props.settings) == null ? void 0 : _a.company_name) || "",
      company_description: ((_b = props.settings) == null ? void 0 : _b.company_description) || "",
      trust_badge_text: ((_c = props.settings) == null ? void 0 : _c.trust_badge_text) || "Trusted for over 20 Years",
      contact_phone: ((_d = props.settings) == null ? void 0 : _d.contact_phone) || "",
      contact_email: ((_e = props.settings) == null ? void 0 : _e.contact_email) || "",
      whatsapp_number: ((_f = props.settings) == null ? void 0 : _f.whatsapp_number) || "",
      meta_description: ((_g = props.settings) == null ? void 0 : _g.meta_description) || "",
      meta_keywords: ((_h = props.settings) == null ? void 0 : _h.meta_keywords) || "",
      hero_background_image: null,
      company_logo: null
    });
    const handleFileUpload = (event, type) => {
      const file = event.target.files[0];
      if (!file) return;
      {
        form.hero_background_image = file;
      }
    };
    const updateSettings = () => {
      loading.value = true;
      const formData = new FormData();
      const textFields = [
        "company_name",
        "company_description",
        "trust_badge_text",
        "contact_phone",
        "contact_email",
        "whatsapp_number",
        "meta_description",
        "meta_keywords"
      ];
      textFields.forEach((field) => {
        const value = form[field];
        if (value !== null && value !== "" && value !== void 0) {
          formData.append(field, value);
        }
      });
      if (form.hero_background_image && form.hero_background_image instanceof File) {
        formData.append("hero_background_image", form.hero_background_image);
      }
      if (form.company_logo && form.company_logo instanceof File) {
        formData.append("company_logo", form.company_logo);
      }
      formData.append("_method", "PUT");
      router.post(
        route("masteradmin.website-settings.pengaturan-umum.update"),
        formData,
        {
          onSuccess: () => {
            form.hero_background_image = null;
            form.company_logo = null;
          },
          onError: (errors) => {
            console.error("Errors:", errors);
            alert("Error: " + JSON.stringify(errors));
          },
          onFinish: () => {
            loading.value = false;
          },
          preserveState: false
        }
      );
    };
    onMounted(() => {
      console.log("Settings data:", props.settings);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f2;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pengaturan Umum" }, null, _parent2, _scopeId));
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-5d20be17${_scopeId}>`);
            if ((_a2 = _ctx.$page.props.flash) == null ? void 0 : _a2.success) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-5d20be17${_scopeId}><span class="block sm:inline" data-v-5d20be17${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_b2 = _ctx.$page.props.flash) == null ? void 0 : _b2.error) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-5d20be17${_scopeId}><span class="block sm:inline" data-v-5d20be17${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-6" data-v-5d20be17${_scopeId}><nav class="flex" aria-label="Breadcrumb" data-v-5d20be17${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-5d20be17${_scopeId}><li class="inline-flex items-center" data-v-5d20be17${_scopeId}><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-5d20be17${_scopeId}>Dashboard</a></li><li data-v-5d20be17${_scopeId}><div class="flex items-center" data-v-5d20be17${_scopeId}><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-5d20be17${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-5d20be17${_scopeId}></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-5d20be17${_scopeId}>Pengaturan Umum</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-5d20be17${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-5d20be17${_scopeId}><div data-v-5d20be17${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-5d20be17${_scopeId}> Pengaturan Umum Website </h2><p class="text-sage-600" data-v-5d20be17${_scopeId}> Kelola pengaturan dasar dan konten utama website </p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-5d20be17${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-5d20be17${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-5d20be17${_scopeId}>Pengaturan Umum</h3><p class="text-sm text-sage-600 mt-1" data-v-5d20be17${_scopeId}> Ubah pengaturan dasar website Anda </p></div><form class="p-6 space-y-6" data-v-5d20be17${_scopeId}><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Background Hero</label><div class="flex items-center space-x-4" data-v-5d20be17${_scopeId}>`);
            if ((_c2 = __props.settings) == null ? void 0 : _c2.hero_background_image) {
              _push2(`<div class="relative" data-v-5d20be17${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.settings.hero_background_image}`)} alt="Hero Background" class="w-32 h-20 object-cover rounded border" data-v-5d20be17${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-5d20be17${_scopeId}><input type="file" accept="image/*" class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700 hover:file:bg-sage-100" data-v-5d20be17${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Maksimal 5MB (JPEG, PNG, JPG, GIF) </p></div></div></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Nama Perusahaan <span class="text-red-500" data-v-5d20be17${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.company_name)} type="text" required placeholder="PT ESHAKA WIJAYA LOGISTICS" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Nama perusahaan yang akan ditampilkan di hero section </p></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Deskripsi Perusahaan</label><textarea rows="4" placeholder="Trusted solutions for your international export-import and logistics needs with professional and experienced services." class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}>${ssrInterpolate(form.company_description)}</textarea><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Deskripsi singkat perusahaan yang akan ditampilkan di bawah nama perusahaan </p></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Badge Kepercayaan</label><input${ssrRenderAttr("value", form.trust_badge_text)} type="text" placeholder="Trusted for over 20 Years" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Teks badge kepercayaan yang akan ditampilkan di hero section </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-5d20be17${_scopeId}><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Nomor Telepon</label><input${ssrRenderAttr("value", form.contact_phone)} type="text" placeholder="+62 21 1234567" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Email</label><input${ssrRenderAttr("value", form.contact_email)} type="email" placeholder="info@example.com" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>WhatsApp (format: 628xxxxxxxxx)</label><input${ssrRenderAttr("value", form.whatsapp_number)} type="text" placeholder="628123456789" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}></div></div><div class="pt-6 border-t border-sage-200" data-v-5d20be17${_scopeId}><h4 class="text-lg font-medium text-sage-800 mb-4" data-v-5d20be17${_scopeId}> SEO Settings </h4><div class="space-y-4" data-v-5d20be17${_scopeId}><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Meta Description</label><textarea rows="3" placeholder="Deskripsi website untuk SEO" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}>${ssrInterpolate(form.meta_description)}</textarea><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Maksimal 160 karakter untuk hasil pencarian yang optimal </p></div><div data-v-5d20be17${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5d20be17${_scopeId}>Meta Keywords</label><input${ssrRenderAttr("value", form.meta_keywords)} type="text" placeholder="logistics, export, import, shipping" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-5d20be17${_scopeId}><p class="text-xs text-gray-500 mt-1" data-v-5d20be17${_scopeId}> Pisahkan dengan koma untuk kata kunci yang berbeda </p></div></div></div><div class="flex justify-end pt-6 border-t border-sage-200" data-v-5d20be17${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 disabled:opacity-50 transition-colors" data-v-5d20be17${_scopeId}>`);
            if (loading.value) {
              _push2(`<span data-v-5d20be17${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-5d20be17${_scopeId}>Simpan Pengaturan</span>`);
            }
            _push2(`</button></div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Pengaturan Umum" }),
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                ((_d2 = _ctx.$page.props.flash) == null ? void 0 : _d2.success) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.success), 1)
                ])) : createCommentVNode("", true),
                ((_e2 = _ctx.$page.props.flash) == null ? void 0 : _e2.error) ? (openBlock(), createBlock("div", {
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
                          createVNode("span", { class: "ml-1 text-sage-500 md:ml-2" }, "Pengaturan Umum")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Pengaturan Umum Website "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola pengaturan dasar dan konten utama website ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Pengaturan Umum"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Ubah pengaturan dasar website Anda ")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(updateSettings, ["prevent"]),
                    class: "p-6 space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Background Hero"),
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        ((_f2 = __props.settings) == null ? void 0 : _f2.hero_background_image) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "relative"
                        }, [
                          createVNode("img", {
                            src: `/storage/${__props.settings.hero_background_image}`,
                            alt: "Hero Background",
                            class: "w-32 h-20 object-cover rounded border"
                          }, null, 8, ["src"])
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("input", {
                            type: "file",
                            onChange: ($event) => handleFileUpload($event),
                            accept: "image/*",
                            class: "block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700 hover:file:bg-sage-100"
                          }, null, 40, ["onChange"]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Maksimal 5MB (JPEG, PNG, JPG, GIF) ")
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode("Nama Perusahaan "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.company_name = $event,
                        type: "text",
                        required: "",
                        placeholder: "PT ESHAKA WIJAYA LOGISTICS",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.company_name]
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Nama perusahaan yang akan ditampilkan di hero section ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Deskripsi Perusahaan"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => form.company_description = $event,
                        rows: "4",
                        placeholder: "Trusted solutions for your international export-import and logistics needs with professional and experienced services.",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.company_description]
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Deskripsi singkat perusahaan yang akan ditampilkan di bawah nama perusahaan ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Badge Kepercayaan"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.trust_badge_text = $event,
                        type: "text",
                        placeholder: "Trusted for over 20 Years",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.trust_badge_text]
                      ]),
                      createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Teks badge kepercayaan yang akan ditampilkan di hero section ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Nomor Telepon"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => form.contact_phone = $event,
                          type: "text",
                          placeholder: "+62 21 1234567",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.contact_phone]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Email"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => form.contact_email = $event,
                          type: "email",
                          placeholder: "info@example.com",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.contact_email]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "WhatsApp (format: 628xxxxxxxxx)"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => form.whatsapp_number = $event,
                          type: "text",
                          placeholder: "628123456789",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.whatsapp_number]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "pt-6 border-t border-sage-200" }, [
                      createVNode("h4", { class: "text-lg font-medium text-sage-800 mb-4" }, " SEO Settings "),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Meta Description"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => form.meta_description = $event,
                            rows: "3",
                            placeholder: "Deskripsi website untuk SEO",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.meta_description]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Maksimal 160 karakter untuk hasil pencarian yang optimal ")
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Meta Keywords"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.meta_keywords = $event,
                            type: "text",
                            placeholder: "logistics, export, import, shipping",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.meta_keywords]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Pisahkan dengan koma untuk kata kunci yang berbeda ")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end pt-6 border-t border-sage-200" }, [
                      createVNode("button", {
                        type: "submit",
                        disabled: loading.value,
                        class: "bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 disabled:opacity-50 transition-colors"
                      }, [
                        loading.value ? (openBlock(), createBlock("span", { key: 0 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 1 }, "Simpan Pengaturan"))
                      ], 8, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/PengaturanUmum/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5d20be17"]]);
export {
  Index as default
};
