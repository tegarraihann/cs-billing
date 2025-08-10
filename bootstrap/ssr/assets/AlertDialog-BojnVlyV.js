import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AlertDialog",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "info",
      // success, error, warning, info, confirm
      validator: (value) => ["success", "error", "warning", "info", "confirm"].includes(value)
    },
    title: {
      type: String,
      default: ""
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: ""
    },
    closeOnBackdrop: {
      type: Boolean,
      default: true
    }
  },
  emits: ["confirm", "cancel", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const defaultTitle = computed(() => {
      switch (props.type) {
        case "success":
          return "Berhasil";
        case "error":
          return "Terjadi Kesalahan";
        case "warning":
          return "Peringatan";
        case "confirm":
          return "Konfirmasi";
        case "info":
        default:
          return "Informasi";
      }
    });
    const defaultConfirmText = computed(() => {
      switch (props.type) {
        case "success":
        case "info":
          return "OK";
        case "error":
          return "Tutup";
        case "warning":
          return "Mengerti";
        case "confirm":
          return "Ya, Hapus";
        default:
          return "OK";
      }
    });
    const headerClass = computed(() => {
      switch (props.type) {
        case "success":
          return "bg-green-50";
        case "error":
          return "bg-red-50";
        case "warning":
          return "bg-yellow-50";
        case "confirm":
          return "bg-red-50";
        case "info":
        default:
          return "bg-blue-50";
      }
    });
    const primaryButtonClass = computed(() => {
      switch (props.type) {
        case "success":
          return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
        case "error":
          return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
        case "warning":
          return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
        case "confirm":
          return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
        case "info":
        default:
          return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.show) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" }, _attrs))} data-v-bbc44156><template>`);
        if (__props.show) {
          _push(`<div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden" data-v-bbc44156><div class="${ssrRenderClass([headerClass.value, "px-6 py-4 border-b border-gray-200"])}" data-v-bbc44156><div class="flex items-center" data-v-bbc44156><div class="flex-shrink-0 mr-3" data-v-bbc44156>`);
          if (__props.type === "success") {
            _push(`<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bbc44156><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bbc44156></path></svg>`);
          } else if (__props.type === "error") {
            _push(`<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bbc44156><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-bbc44156></path></svg>`);
          } else if (__props.type === "warning") {
            _push(`<svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bbc44156><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-bbc44156></path></svg>`);
          } else if (__props.type === "info") {
            _push(`<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bbc44156><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bbc44156></path></svg>`);
          } else {
            _push(`<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bbc44156><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-bbc44156></path></svg>`);
          }
          _push(`</div><div data-v-bbc44156><h3 class="text-lg font-medium text-gray-900" data-v-bbc44156>${ssrInterpolate(__props.title || defaultTitle.value)}</h3></div></div></div><div class="px-6 py-4" data-v-bbc44156><p class="text-sm text-gray-600" data-v-bbc44156>${ssrInterpolate(__props.message)}</p></div><div class="px-6 py-4 bg-gray-50 border-t border-gray-200" data-v-bbc44156><div class="flex justify-end space-x-3" data-v-bbc44156>`);
          if (__props.type === "confirm") {
            _push(`<button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors" data-v-bbc44156>${ssrInterpolate(__props.cancelText || "Batal")}</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="${ssrRenderClass([primaryButtonClass.value, "px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-2 transition-colors"])}" data-v-bbc44156>${ssrInterpolate(__props.confirmText || defaultConfirmText.value)}</button></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</template></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AlertDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AlertDialog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-bbc44156"]]);
export {
  AlertDialog as A
};
