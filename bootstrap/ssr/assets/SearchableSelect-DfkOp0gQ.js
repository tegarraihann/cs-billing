import { ref, computed, watch, onMounted, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "SearchableSelect",
  __ssrInlineRender: true,
  props: {
    options: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: "Cari..."
    },
    labelField: {
      type: String,
      default: "label"
    },
    subLabelField: {
      type: String,
      default: "subLabel"
    },
    valueField: {
      type: String,
      default: "value"
    },
    searchFields: {
      type: Array,
      default: () => ["label"]
    },
    inputClass: {
      type: String,
      default: "w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "select"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const searchQuery = ref("");
    const showOptions = ref(false);
    const selectedIndex = ref(-1);
    const dropdown = ref(null);
    const searchInput = ref(null);
    const computedInputClass = computed(() => {
      return [
        props.inputClass,
        props.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
      ].filter(Boolean).join(" ");
    });
    const selectedOption = computed(() => {
      return props.options.find((option) => option[props.valueField] == props.modelValue);
    });
    watch(() => props.modelValue, (newValue) => {
      if (newValue && selectedOption.value) {
        searchQuery.value = selectedOption.value[props.labelField];
      } else {
        searchQuery.value = "";
      }
    }, { immediate: true });
    const filteredOptions = computed(() => {
      if (!searchQuery.value) {
        return props.options;
      }
      const query = searchQuery.value.toLowerCase();
      return props.options.filter((option) => {
        return props.searchFields.some((field) => {
          const value = option[field];
          return value && value.toString().toLowerCase().includes(query);
        });
      });
    });
    const handleClickOutside = (event) => {
      if (dropdown.value && !dropdown.value.contains(event.target)) {
        showOptions.value = false;
        selectedIndex.value = -1;
        if (selectedOption.value) {
          searchQuery.value = selectedOption.value[props.labelField];
        } else {
          searchQuery.value = "";
        }
      }
    };
    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });
    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });
    watch(() => props.disabled, (isDisabled) => {
      if (isDisabled) {
        showOptions.value = false;
        selectedIndex.value = -1;
      }
    });
    const focus = () => {
      var _a;
      (_a = searchInput.value) == null ? void 0 : _a.focus();
    };
    __expose({
      focus
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative searchable-select-container",
        ref_key: "dropdown",
        ref: dropdown
      }, _attrs))}><div class="relative"><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", __props.placeholder)} class="${ssrRenderClass(computedInputClass.value)}"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} autocomplete="off"><div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div></div>`);
      if (showOptions.value && filteredOptions.value.length > 0) {
        _push(`<div class="searchable-select-dropdown absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-auto" style="${ssrRenderStyle({ "z-index": "9999" })}"><!--[-->`);
        ssrRenderList(filteredOptions.value, (option, index) => {
          _push(`<div class="${ssrRenderClass([
            "px-3 py-2 cursor-pointer hover:bg-gray-100",
            selectedIndex.value === index ? "bg-blue-100" : ""
          ])}"><div class="font-medium text-gray-900">${ssrInterpolate(option[__props.labelField])}</div>`);
          if (option[__props.subLabelField]) {
            _push(`<div class="text-sm text-gray-500">${ssrInterpolate(option[__props.subLabelField])}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showOptions.value && searchQuery.value && filteredOptions.value.length === 0) {
        _push(`<div class="searchable-select-dropdown absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl" style="${ssrRenderStyle({ "z-index": "9999" })}"><div class="px-3 py-2 text-gray-500 text-center"> Tidak ada hasil untuk &quot;${ssrInterpolate(searchQuery.value)}&quot; </div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SearchableSelect.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
