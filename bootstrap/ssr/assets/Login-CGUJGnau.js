import { computed, mergeProps, useSSRContext, ref, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode } from "vue";
import { ssrRenderAttrs, ssrLooseContain, ssrGetDynamicModelProps, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$2, b as _sfc_main$3, a as _sfc_main$4 } from "./TextInput-SoXY5mdM.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    },
    roles: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const showPassword = ref(false);
    const form = useForm({
      role: "",
      email: "",
      password: "",
      remember: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 flex items-center justify-center p-4" }, _attrs))} data-v-470cd30a>`);
      _push(ssrRenderComponent(unref(Head), { title: "Sign In - Master Admin" }, null, _parent));
      _push(`<div class="absolute inset-0 opacity-5" data-v-470cd30a><svg class="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" data-v-470cd30a><defs data-v-470cd30a><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse" data-v-470cd30a><circle cx="30" cy="30" r="2" fill="currentColor" class="text-sage-400" data-v-470cd30a></circle></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" data-v-470cd30a></rect></svg></div><div class="w-full max-w-md relative z-10" data-v-470cd30a><div class="text-center mb-8" data-v-470cd30a><div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sage-600 to-sage-700 rounded-2xl shadow-lg mb-4" data-v-470cd30a><svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-470cd30a></path></svg></div><h1 class="text-2xl sm:text-3xl font-bold text-sage-800 mb-2" data-v-470cd30a>Welcome Back</h1><p class="text-sage-600 text-sm sm:text-base" data-v-470cd30a>Sign in to access your dashboard</p></div><div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-sage-200/50 p-6 sm:p-8" data-v-470cd30a>`);
      if (__props.status) {
        _push(`<div class="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start space-x-3" data-v-470cd30a><svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-470cd30a></path></svg><span data-v-470cd30a>${ssrInterpolate(__props.status)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl" data-v-470cd30a><h3 class="font-semibold text-blue-800 mb-2 flex items-center" data-v-470cd30a><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-470cd30a></path></svg> Demo Credentials </h3><div class="text-xs text-blue-700 space-y-1" data-v-470cd30a><p data-v-470cd30a><strong data-v-470cd30a>Master Admin:</strong> masteradmin@example.com</p><p data-v-470cd30a><strong data-v-470cd30a>Admin CS:</strong> CS@example.com</p><p data-v-470cd30a><strong data-v-470cd30a>Admin Keuangan:</strong> keuangan@example.com</p><p class="mt-2" data-v-470cd30a><strong data-v-470cd30a>Password for all:</strong> password</p></div></div><form class="space-y-5 sm:space-y-6" data-v-470cd30a><div class="space-y-2" data-v-470cd30a>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "role",
        value: "Login As",
        class: "text-sage-800 font-semibold text-sm"
      }, null, _parent));
      _push(`<div class="relative" data-v-470cd30a><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-470cd30a><svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-470cd30a></path></svg></div><select id="role" class="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200 text-sm sm:text-base bg-white appearance-none" required data-v-470cd30a><option value="" data-v-470cd30a${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, "") : ssrLooseEqual(unref(form).role, "")) ? " selected" : ""}>Select your role</option><!--[-->`);
      ssrRenderList(__props.roles, (role) => {
        _push(`<option${ssrRenderAttr("value", role.value)} data-v-470cd30a${ssrIncludeBooleanAttr(Array.isArray(unref(form).role) ? ssrLooseContain(unref(form).role, role.value) : ssrLooseEqual(unref(form).role, role.value)) ? " selected" : ""}>${ssrInterpolate(role.label)}</option>`);
      });
      _push(`<!--]--></select><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none" data-v-470cd30a><svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-470cd30a></path></svg></div></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "text-xs sm:text-sm",
        message: unref(form).errors.role
      }, null, _parent));
      _push(`</div><div class="space-y-2" data-v-470cd30a>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "email",
        value: "Email Address",
        class: "text-sage-800 font-semibold text-sm"
      }, null, _parent));
      _push(`<div class="relative" data-v-470cd30a><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-470cd30a><svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" data-v-470cd30a></path></svg></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "email",
        type: "email",
        class: "w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200 text-sm sm:text-base",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username",
        placeholder: "Enter your email address"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "text-xs sm:text-sm",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div><div class="space-y-2" data-v-470cd30a>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        for: "password",
        value: "Password",
        class: "text-sage-800 font-semibold text-sm"
      }, null, _parent));
      _push(`<div class="relative" data-v-470cd30a><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-v-470cd30a><svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" data-v-470cd30a></path></svg></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        id: "password",
        type: showPassword.value ? "text" : "password",
        class: "w-full pl-10 pr-12 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200 text-sm sm:text-base",
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        required: "",
        autocomplete: "current-password",
        placeholder: "Enter your password"
      }, null, _parent));
      _push(`<button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sage-400 hover:text-sage-600 transition-colors focus:outline-none" aria-label="Toggle password visibility" data-v-470cd30a>`);
      if (!showPassword.value) {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-470cd30a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-470cd30a></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" data-v-470cd30a></path></svg>`);
      }
      _push(`</button></div>`);
      _push(ssrRenderComponent(_sfc_main$3, {
        class: "text-xs sm:text-sm",
        message: unref(form).errors.password
      }, null, _parent));
      _push(`</div><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0" data-v-470cd30a><label class="flex items-center cursor-pointer group" data-v-470cd30a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        name: "remember",
        checked: unref(form).remember,
        "onUpdate:checked": ($event) => unref(form).remember = $event,
        class: "rounded border-sage-300 text-sage-600 focus:ring-sage-500 focus:ring-offset-0"
      }, null, _parent));
      _push(`<span class="ml-2 text-sm text-sage-600 group-hover:text-sage-800 transition-colors select-none" data-v-470cd30a> Remember me </span></label>`);
      if (__props.canResetPassword) {
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("password.request"),
          class: "text-sm text-sage-600 hover:text-sage-800 font-medium transition-colors duration-200 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Forgot your password? `);
            } else {
              return [
                createTextVNode(" Forgot your password? ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 disabled:from-sage-400 disabled:to-sage-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transform hover:-translate-y-0.5 disabled:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 text-sm sm:text-base" data-v-470cd30a>`);
      if (unref(form).processing) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-470cd30a><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-470cd30a></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-470cd30a></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-470cd30a>${ssrInterpolate(unref(form).processing ? "Signing In..." : "Sign In")}</span></button></form><div class="mt-6 space-y-4" data-v-470cd30a><div class="relative" data-v-470cd30a><div class="absolute inset-0 flex items-center" data-v-470cd30a><div class="w-full border-t border-sage-300" data-v-470cd30a></div></div><div class="relative flex justify-center text-sm" data-v-470cd30a><span class="px-3 bg-white text-sage-500" data-v-470cd30a>Don&#39;t have an account?</span></div></div><div class="text-center" data-v-470cd30a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("register"),
        class: "inline-flex items-center text-sage-600 hover:text-sage-800 font-medium transition-colors duration-200 text-sm hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-470cd30a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" data-v-470cd30a${_scopeId}></path></svg> Create a new account `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4 mr-1",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                })
              ])),
              createTextVNode(" Create a new account ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="text-center mt-6 sm:mt-8" data-v-470cd30a><p class="text-xs sm:text-sm text-sage-500" data-v-470cd30a> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} All rights reserved. </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-470cd30a"]]);
export {
  Login as default
};
