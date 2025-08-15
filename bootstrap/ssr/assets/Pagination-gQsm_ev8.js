import { computed, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const pageNumbers = computed(() => {
      const pages = [];
      const current = props.data.current_page;
      const last = props.data.last_page;
      if (last > 1) {
        pages.push(1);
      }
      if (current > 4) {
        pages.push("...");
      }
      const start = Math.max(2, current - 2);
      const end = Math.min(last - 1, current + 2);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      if (current < last - 3) {
        pages.push("...");
      }
      if (last > 1 && !pages.includes(last)) {
        pages.push(last);
      }
      return pages;
    });
    const getPageUrl = (page) => {
      if (page === "...") return null;
      const url = new URL(props.data.path, window.location.origin);
      const params = new URLSearchParams(window.location.search);
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page);
      }
      const queryString = params.toString();
      return `${url.pathname}${queryString ? "?" + queryString : ""}`;
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.data.last_page > 1) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between" }, _attrs))} data-v-f7bb30dd><div class="flex flex-1 justify-between sm:hidden" data-v-f7bb30dd>`);
        if (__props.data.prev_page_url) {
          _push(ssrRenderComponent(unref(Link), {
            href: __props.data.prev_page_url,
            class: "relative inline-flex items-center px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-md hover:bg-sage-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Sebelumnya `);
              } else {
                return [
                  createTextVNode(" Sebelumnya ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-sage-400 bg-sage-100 border border-sage-300 rounded-md cursor-not-allowed" data-v-f7bb30dd> Sebelumnya </div>`);
        }
        if (__props.data.next_page_url) {
          _push(ssrRenderComponent(unref(Link), {
            href: __props.data.next_page_url,
            class: "relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-md hover:bg-sage-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Selanjutnya `);
              } else {
                return [
                  createTextVNode(" Selanjutnya ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-sage-400 bg-sage-100 border border-sage-300 rounded-md cursor-not-allowed" data-v-f7bb30dd> Selanjutnya </div>`);
        }
        _push(`</div><div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between" data-v-f7bb30dd><div data-v-f7bb30dd><p class="text-sm text-sage-700" data-v-f7bb30dd> Menampilkan <span class="font-medium" data-v-f7bb30dd>${ssrInterpolate(__props.data.from || 0)}</span> sampai <span class="font-medium" data-v-f7bb30dd>${ssrInterpolate(__props.data.to || 0)}</span> dari <span class="font-medium" data-v-f7bb30dd>${ssrInterpolate(__props.data.total || 0)}</span> hasil </p></div><div data-v-f7bb30dd><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination" data-v-f7bb30dd>`);
        if (__props.data.prev_page_url) {
          _push(ssrRenderComponent(unref(Link), {
            href: __props.data.prev_page_url,
            class: "relative inline-flex items-center px-2 py-2 rounded-l-md border border-sage-300 bg-white text-sm font-medium text-sage-500 hover:bg-sage-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="sr-only" data-v-f7bb30dd${_scopeId}>Sebelumnya</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-f7bb30dd${_scopeId}><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" data-v-f7bb30dd${_scopeId}></path></svg>`);
              } else {
                return [
                  createVNode("span", { class: "sr-only" }, "Sebelumnya"),
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-sage-300 bg-sage-100 text-sm font-medium text-sage-400 cursor-not-allowed" data-v-f7bb30dd><span class="sr-only" data-v-f7bb30dd>Sebelumnya</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-f7bb30dd><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" data-v-f7bb30dd></path></svg></div>`);
        }
        _push(`<!--[-->`);
        ssrRenderList(pageNumbers.value, (page) => {
          _push(`<!--[-->`);
          if (page === __props.data.current_page) {
            _push(`<div class="relative inline-flex items-center px-4 py-2 border border-sage-500 bg-sage-600 text-sm font-medium text-white cursor-default" data-v-f7bb30dd>${ssrInterpolate(page)}</div>`);
          } else {
            _push(ssrRenderComponent(unref(Link), {
              href: getPageUrl(page),
              class: "relative inline-flex items-center px-4 py-2 border border-sage-300 bg-white text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(page)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(page), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]-->`);
        if (__props.data.next_page_url) {
          _push(ssrRenderComponent(unref(Link), {
            href: __props.data.next_page_url,
            class: "relative inline-flex items-center px-2 py-2 rounded-r-md border border-sage-300 bg-white text-sm font-medium text-sage-500 hover:bg-sage-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="sr-only" data-v-f7bb30dd${_scopeId}>Selanjutnya</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-f7bb30dd${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-f7bb30dd${_scopeId}></path></svg>`);
              } else {
                return [
                  createVNode("span", { class: "sr-only" }, "Selanjutnya"),
                  (openBlock(), createBlock("svg", {
                    class: "h-5 w-5",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-sage-300 bg-sage-100 text-sm font-medium text-sage-400 cursor-not-allowed" data-v-f7bb30dd><span class="sr-only" data-v-f7bb30dd>Selanjutnya</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-f7bb30dd><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-f7bb30dd></path></svg></div>`);
        }
        _push(`</nav></div></div></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Pagination = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f7bb30dd"]]);
export {
  Pagination as P
};
