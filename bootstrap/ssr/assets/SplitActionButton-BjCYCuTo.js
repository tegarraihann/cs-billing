import { ref, onMounted, onBeforeUnmount, mergeProps, createVNode, resolveDynamicComponent, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderVNode, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import "@inertiajs/vue3";
import { ChevronDown } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SplitActionButton",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: [Object, Function],
      default: null
    },
    onClick: {
      type: Function,
      default: null
    },
    href: {
      type: [String, Object],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const open = ref(false);
    const root = ref(null);
    const handleClickOutside = (event) => {
      if (!root.value) return;
      if (!root.value.contains(event.target)) {
        open.value = false;
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "root",
        ref: root,
        class: "relative inline-flex"
      }, _attrs))} data-v-c272cf5b><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-l-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-c272cf5b>`);
      if (__props.icon) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.icon), { class: "w-4 h-4 mr-2" }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(__props.label)}</button><button type="button" class="inline-flex items-center px-2 py-2 bg-sage-600 border border-transparent rounded-r-md font-semibold text-xs text-white hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(__props.disabled || __props.items.length === 0) ? " disabled" : ""} data-v-c272cf5b>`);
      _push(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4" }, null, _parent));
      _push(`</button>`);
      if (open.value) {
        _push(`<div class="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5" data-v-c272cf5b><div class="py-1" data-v-c272cf5b><!--[-->`);
        ssrRenderList(__props.items, (item, index) => {
          _push(`<button type="button" class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(item.disabled) ? " disabled" : ""} data-v-c272cf5b>`);
          if (item.icon) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(item.icon), { class: "w-4 h-4 mr-2" }, null), _parent);
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(item.label)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SplitActionButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SplitActionButton = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c272cf5b"]]);
export {
  SplitActionButton as S
};
