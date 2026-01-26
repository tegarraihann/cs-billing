import { withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DOmrD4T_.js";
import { ChevronRight, Edit as Edit$1, ArrowLeft, AlertTriangle } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-A0RXUIxC.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    user: Object,
    errors: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const form = useForm({
      name: ((_a = props.user) == null ? void 0 : _a.name) || "",
      email: ((_b = props.user) == null ? void 0 : _b.email) || "",
      phone: ((_c = props.user) == null ? void 0 : _c.phone) || "",
      role: ((_d = props.user) == null ? void 0 : _d.role) || "",
      status: ((_e = props.user) == null ? void 0 : _e.status) || "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      var _a2;
      if (((_a2 = props.user) == null ? void 0 : _a2.role) === "masteradmin") {
        form.role = props.user.role;
        form.status = props.user.status;
      }
      form.put(route("masteradmin.users.update", props.user.id), {
        onSuccess: () => {
        },
        onError: (errors) => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: `Edit User: ${(_a2 = __props.user) == null ? void 0 : _a2.name}`
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-0be8c4c6${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-0be8c4c6${_scopeId}><nav class="flex mb-6" aria-label="Breadcrumb" data-v-0be8c4c6${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-0be8c4c6${_scopeId}><li class="inline-flex items-center" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.dashboard"),
              class: "text-gray-600 hover:text-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Dashboard `);
                } else {
                  return [
                    createTextVNode(" Dashboard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-0be8c4c6${_scopeId}><div class="flex items-center" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.index"),
              class: "ml-1 text-gray-600 hover:text-gray-900 md:ml-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` User Management `);
                } else {
                  return [
                    createTextVNode(" User Management ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></li><li aria-current="page" data-v-0be8c4c6${_scopeId}><div class="flex items-center" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "w-4 h-4 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`<span class="ml-1 text-gray-500 md:ml-2" data-v-0be8c4c6${_scopeId}>Edit User</span></div></li></ol></nav><div class="bg-white shadow rounded-lg mb-6" data-v-0be8c4c6${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-0be8c4c6${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0be8c4c6${_scopeId}><div class="flex items-center" data-v-0be8c4c6${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit$1), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-0be8c4c6${_scopeId}>Edit User: ${ssrInterpolate((_b2 = __props.user) == null ? void 0 : _b2.name)}</h1><p class="mt-1 text-sm text-gray-600" data-v-0be8c4c6${_scopeId}>Update user information and permissions</p></div></div><div class="mt-4 sm:mt-0" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm overflow-hidden" data-v-0be8c4c6${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50" data-v-0be8c4c6${_scopeId}><h3 class="text-lg font-semibold text-gray-900" data-v-0be8c4c6${_scopeId}>User Information</h3><p class="mt-1 text-sm text-gray-600" data-v-0be8c4c6${_scopeId}>Edit the user details below</p></div><div class="p-6" data-v-0be8c4c6${_scopeId}><form class="space-y-6" data-v-0be8c4c6${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0be8c4c6${_scopeId}><div data-v-0be8c4c6${_scopeId}><label for="name" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Full Name <span class="text-red-500" data-v-0be8c4c6${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" id="name" required class="${ssrRenderClass([{ "border-red-300": unref(form).errors.name }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"])}" placeholder="Enter full name" data-v-0be8c4c6${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><label for="email" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Email Address <span class="text-red-500" data-v-0be8c4c6${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).email)} type="email" id="email" required class="${ssrRenderClass([{ "border-red-300": unref(form).errors.email }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"])}" placeholder="Enter email address" data-v-0be8c4c6${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><label for="phone" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Phone Number </label><input${ssrRenderAttr("value", unref(form).phone)} type="tel" id="phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter phone number" data-v-0be8c4c6${_scopeId}>`);
            if (unref(form).errors.phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><label for="role" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Role <span class="text-red-500" data-v-0be8c4c6${_scopeId}>*</span></label><select id="role" required${ssrIncludeBooleanAttr(((_c2 = __props.user) == null ? void 0 : _c2.role) === "masteradmin") ? " disabled" : ""} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" data-v-0be8c4c6${_scopeId}><option value="" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "") : ssrLooseEqual(unref(form).role, "")) ? " selected" : ""}${_scopeId}>Select Role</option><option value="masteradmin" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "masteradmin") : ssrLooseEqual(unref(form).role, "masteradmin")) ? " selected" : ""}${_scopeId}>Master Admin</option><option value="admin_cs" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "admin_cs") : ssrLooseEqual(unref(form).role, "admin_cs")) ? " selected" : ""}${_scopeId}>Admin CS</option><option value="admin_keuangan" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "admin_keuangan") : ssrLooseEqual(unref(form).role, "admin_keuangan")) ? " selected" : ""}${_scopeId}>Finance Dept</option></select>`);
            if (unref(form).errors.role) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.role)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_d2 = __props.user) == null ? void 0 : _d2.role) === "masteradmin") {
              _push2(`<div class="mt-2 text-sm text-amber-600 flex items-center" data-v-0be8c4c6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Role Master Admin tidak dapat diubah </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><label for="status" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Status <span class="text-red-500" data-v-0be8c4c6${_scopeId}>*</span></label><select id="status" required${ssrIncludeBooleanAttr(((_e2 = __props.user) == null ? void 0 : _e2.role) === "masteradmin") ? " disabled" : ""} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed" data-v-0be8c4c6${_scopeId}><option value="" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "") : ssrLooseEqual(unref(form).status, "")) ? " selected" : ""}${_scopeId}>Select Status</option><option value="active" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive" data-v-0be8c4c6${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "inactive") : ssrLooseEqual(unref(form).status, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option></select>`);
            if (unref(form).errors.status) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_f = __props.user) == null ? void 0 : _f.role) === "masteradmin") {
              _push2(`<div class="mt-2 text-sm text-amber-600 flex items-center" data-v-0be8c4c6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Status Master Admin tidak dapat diubah </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="pt-6 border-t border-gray-200" data-v-0be8c4c6${_scopeId}><h4 class="text-lg font-medium text-gray-900 mb-2" data-v-0be8c4c6${_scopeId}>Change Password</h4><p class="text-sm text-gray-600 mb-4" data-v-0be8c4c6${_scopeId}> Leave password fields empty if you don&#39;t want to change the password </p><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0be8c4c6${_scopeId}><div data-v-0be8c4c6${_scopeId}><label for="password" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> New Password </label><input${ssrRenderAttr("value", unref(form).password)} type="password" id="password" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter new password" data-v-0be8c4c6${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0be8c4c6${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0be8c4c6${_scopeId}><label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2" data-v-0be8c4c6${_scopeId}> Confirm New Password </label><input${ssrRenderAttr("value", unref(form).password_confirmation)} type="password" id="password_confirmation" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Confirm new password" data-v-0be8c4c6${_scopeId}></div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200" data-v-0be8c4c6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.index"),
              class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-0be8c4c6${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-0be8c4c6${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-0be8c4c6${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-0be8c4c6${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-0be8c4c6${_scopeId}>Updating...</span>`);
            } else {
              _push2(`<span data-v-0be8c4c6${_scopeId}>Update User</span>`);
            }
            _push2(`</button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: `Edit User: ${(_g = __props.user) == null ? void 0 : _g.name}`
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("nav", {
                    class: "flex mb-6",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("masteradmin.dashboard"),
                          class: "text-gray-600 hover:text-gray-900"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Dashboard ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(unref(ChevronRight), { class: "w-4 h-4 text-gray-400" }),
                          createVNode(unref(Link), {
                            href: _ctx.route("masteradmin.users.index"),
                            class: "ml-1 text-gray-600 hover:text-gray-900 md:ml-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" User Management ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ]),
                      createVNode("li", { "aria-current": "page" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode(unref(ChevronRight), { class: "w-4 h-4 text-gray-400" }),
                          createVNode("span", { class: "ml-1 text-gray-500 md:ml-2" }, "Edit User")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                            createVNode(unref(Edit$1), { class: "w-6 h-6 text-white" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit User: " + toDisplayString((_h = __props.user) == null ? void 0 : _h.name), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Update user information and permissions")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("masteradmin.users.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "User Information"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Edit the user details below")
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
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Full Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              type: "text",
                              id: "name",
                              required: "",
                              class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors", { "border-red-300": unref(form).errors.name }],
                              placeholder: "Enter full name"
                            }, null, 10, ["onUpdate:modelValue"]), [
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
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Email Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              type: "email",
                              id: "email",
                              required: "",
                              class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors", { "border-red-300": unref(form).errors.email }],
                              placeholder: "Enter email address"
                            }, null, 10, ["onUpdate:modelValue"]), [
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
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Phone Number "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                              type: "tel",
                              id: "phone",
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter phone number"
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
                              for: "role",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Role "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).role = $event,
                              id: "role",
                              required: "",
                              disabled: ((_i = __props.user) == null ? void 0 : _i.role) === "masteradmin",
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            }, [
                              createVNode("option", { value: "" }, "Select Role"),
                              createVNode("option", { value: "masteradmin" }, "Master Admin"),
                              createVNode("option", { value: "admin_cs" }, "Admin CS"),
                              createVNode("option", { value: "admin_keuangan" }, "Finance Dept")
                            ], 8, ["onUpdate:modelValue", "disabled"]), [
                              [vModelSelect, unref(form).role]
                            ]),
                            unref(form).errors.role ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.role), 1)) : createCommentVNode("", true),
                            ((_j = __props.user) == null ? void 0 : _j.role) === "masteradmin" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-2 text-sm text-amber-600 flex items-center"
                            }, [
                              createVNode(unref(AlertTriangle), { class: "w-4 h-4 mr-1" }),
                              createTextVNode(" Role Master Admin tidak dapat diubah ")
                            ])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "status",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Status "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).status = $event,
                              id: "status",
                              required: "",
                              disabled: ((_k = __props.user) == null ? void 0 : _k.role) === "masteradmin",
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                            }, [
                              createVNode("option", { value: "" }, "Select Status"),
                              createVNode("option", { value: "active" }, "Active"),
                              createVNode("option", { value: "inactive" }, "Inactive")
                            ], 8, ["onUpdate:modelValue", "disabled"]), [
                              [vModelSelect, unref(form).status]
                            ]),
                            unref(form).errors.status ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.status), 1)) : createCommentVNode("", true),
                            ((_l = __props.user) == null ? void 0 : _l.role) === "masteradmin" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-2 text-sm text-amber-600 flex items-center"
                            }, [
                              createVNode(unref(AlertTriangle), { class: "w-4 h-4 mr-1" }),
                              createTextVNode(" Status Master Admin tidak dapat diubah ")
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "pt-6 border-t border-gray-200" }, [
                          createVNode("h4", { class: "text-lg font-medium text-gray-900 mb-2" }, "Change Password"),
                          createVNode("p", { class: "text-sm text-gray-600 mb-4" }, " Leave password fields empty if you don't want to change the password "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "password",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, " New Password "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                type: "password",
                                id: "password",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                                placeholder: "Enter new password"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).password]
                              ]),
                              unref(form).errors.password ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "password_confirmation",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, " Confirm New Password "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                type: "password",
                                id: "password_confirmation",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                                placeholder: "Confirm new password"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).password_confirmation]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("masteradmin.users.index"),
                            class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
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
                            unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Updating...")) : (openBlock(), createBlock("span", { key: 2 }, "Update User"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0be8c4c6"]]);
export {
  Edit as default
};
