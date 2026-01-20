import { computed, ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-LJhNLIxn.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-B0UJB87s.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    const form = useForm({
      period_name: "",
      period_type: "",
      start_date: "",
      end_date: "",
      notes: ""
    });
    const processing = computed(() => form.processing);
    const dateSuggestions = ref([]);
    const submit = () => {
      console.log("Submitting profit loss period form:", form.data());
      form.post(route("admin-keuangan.profit-loss.store"), {
        onSuccess: (page) => {
          console.log("Profit loss period created successfully", page);
        },
        onError: (errors) => {
          console.error("Income statement period creation failed:", errors);
          alert("Failed to create income statement period. Check the console for details.");
        },
        onFinish: () => {
          console.log("Profit loss period creation request finished");
        }
      });
    };
    const updateDateSuggestions = () => {
      const today = /* @__PURE__ */ new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      dateSuggestions.value = [];
      if (form.period_type === "monthly") {
        const startOfMonth = new Date(currentYear, currentMonth, 1);
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
        dateSuggestions.value.push({
          label: `This Month (${getMonthName(currentMonth)} ${currentYear})`,
          start_date: formatDate(startOfMonth),
          end_date: formatDate(endOfMonth)
        });
        const startOfPrevMonth = new Date(currentYear, currentMonth - 1, 1);
        const endOfPrevMonth = new Date(currentYear, currentMonth, 0);
        dateSuggestions.value.push({
          label: `Last Month (${getMonthName(currentMonth - 1)} ${currentMonth === 0 ? currentYear - 1 : currentYear})`,
          start_date: formatDate(startOfPrevMonth),
          end_date: formatDate(endOfPrevMonth)
        });
      } else if (form.period_type === "quarterly") {
        const quarter = Math.floor(currentMonth / 3) + 1;
        const startOfQuarter = new Date(currentYear, (quarter - 1) * 3, 1);
        const endOfQuarter = new Date(currentYear, quarter * 3, 0);
        dateSuggestions.value.push({
          label: `Quarter ${quarter} ${currentYear}`,
          start_date: formatDate(startOfQuarter),
          end_date: formatDate(endOfQuarter)
        });
      } else if (form.period_type === "yearly") {
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31);
        dateSuggestions.value.push({
          label: `Year ${currentYear}`,
          start_date: formatDate(startOfYear),
          end_date: formatDate(endOfYear)
        });
        const startOfPrevYear = new Date(currentYear - 1, 0, 1);
        const endOfPrevYear = new Date(currentYear - 1, 11, 31);
        dateSuggestions.value.push({
          label: `Year ${currentYear - 1}`,
          start_date: formatDate(startOfPrevYear),
          end_date: formatDate(endOfPrevYear)
        });
      }
    };
    const applySuggestion = (suggestion) => {
      form.start_date = suggestion.start_date;
      form.end_date = suggestion.end_date;
      if (!form.period_name) {
        form.period_name = `Income Statement ${suggestion.label}`;
      }
    };
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    const getMonthName = (monthIndex) => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return months[monthIndex < 0 ? monthIndex + 12 : monthIndex];
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Add Income Statement Period" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back to Income Statement Reports `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back to Income Statement Reports ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Add Income Statement Period</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Create a new period for the income statement</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}>`);
            if (__props.errors.error) {
              _push2(`<div class="mb-6 bg-red-50 border border-red-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}><svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"${_scopeId}></path></svg></div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-red-800"${_scopeId}>An Error Occurred</h3><div class="mt-2 text-sm text-red-700"${_scopeId}>${ssrInterpolate(__props.errors.error)}</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="grid grid-cols-1 gap-6"${_scopeId}><div${_scopeId}><label for="period_name" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Period Name <span class="text-red-500"${_scopeId}>*</span></label><input id="period_name"${ssrRenderAttr("value", unref(form).period_name)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_name }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Example: December 2024 Income Statement"${_scopeId}>`);
            if (__props.errors.period_name) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.period_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="period_type" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Period Type <span class="text-red-500"${_scopeId}>*</span></label><select id="period_type" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_type }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).period_type) ? ssrLooseContain(unref(form).period_type, "") : ssrLooseEqual(unref(form).period_type, "")) ? " selected" : ""}${_scopeId}>Select Period Type</option><option value="monthly"${ssrIncludeBooleanAttr(Array.isArray(unref(form).period_type) ? ssrLooseContain(unref(form).period_type, "monthly") : ssrLooseEqual(unref(form).period_type, "monthly")) ? " selected" : ""}${_scopeId}>Monthly</option><option value="quarterly"${ssrIncludeBooleanAttr(Array.isArray(unref(form).period_type) ? ssrLooseContain(unref(form).period_type, "quarterly") : ssrLooseEqual(unref(form).period_type, "quarterly")) ? " selected" : ""}${_scopeId}>Quarterly</option><option value="yearly"${ssrIncludeBooleanAttr(Array.isArray(unref(form).period_type) ? ssrLooseContain(unref(form).period_type, "yearly") : ssrLooseEqual(unref(form).period_type, "yearly")) ? " selected" : ""}${_scopeId}>Yearly</option></select>`);
            if (__props.errors.period_type) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.period_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="start_date" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Start Date <span class="text-red-500"${_scopeId}>*</span></label><input id="start_date"${ssrRenderAttr("value", unref(form).start_date)} type="date" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.start_date }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.start_date) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.start_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="end_date" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> End Date <span class="text-red-500"${_scopeId}>*</span></label><input id="end_date"${ssrRenderAttr("value", unref(form).end_date)} type="date" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.end_date }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.end_date) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.end_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (dateSuggestions.value.length > 0) {
              _push2(`<div class="p-4 bg-blue-50 rounded-md"${_scopeId}><h3 class="text-sm font-medium text-blue-900 mb-2"${_scopeId}>Date Suggestions:</h3><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(dateSuggestions.value, (suggestion) => {
                _push2(`<button type="button" class="inline-flex items-center px-3 py-1 border border-blue-200 rounded-md text-sm text-blue-700 hover:bg-blue-100 mr-2"${_scopeId}>${ssrInterpolate(suggestion.label)}</button>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label for="notes" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Notes </label><textarea id="notes" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Additional notes for this period..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></div></div><div class="mt-8 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.index"),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Saving..." : "Save Period")}</button></div></form></div></div><div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-yellow-800"${_scopeId}>Important Information</h3><div class="mt-2 text-sm text-yellow-700"${_scopeId}><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>After the period is created, the system will automatically import data from Sales Orders, Petty Cash, and Employee Salaries based on the date range.</li><li${_scopeId}>You can still add or edit manual entries before the period is finalized.</li><li${_scopeId}>Make sure the date range is correct because it affects the imported data.</li></ul></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Add Income Statement Period" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.profit-loss.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Back to Income Statement Reports ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Add Income Statement Period"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Create a new period for the income statement")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      __props.errors.error ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-6 bg-red-50 border border-red-200 rounded-md p-4"
                      }, [
                        createVNode("div", { class: "flex" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "h-5 w-5 text-red-400",
                              fill: "currentColor",
                              viewBox: "0 0 20 20"
                            }, [
                              createVNode("path", {
                                "fill-rule": "evenodd",
                                d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                                "clip-rule": "evenodd"
                              })
                            ]))
                          ]),
                          createVNode("div", { class: "ml-3" }, [
                            createVNode("h3", { class: "text-sm font-medium text-red-800" }, "An Error Occurred"),
                            createVNode("div", { class: "mt-2 text-sm text-red-700" }, toDisplayString(__props.errors.error), 1)
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "period_name",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Period Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "period_name",
                              "onUpdate:modelValue": ($event) => unref(form).period_name = $event,
                              type: "text",
                              class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_name }],
                              placeholder: "Example: December 2024 Income Statement"
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).period_name]
                            ]),
                            __props.errors.period_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(__props.errors.period_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "period_type",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Period Type "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              id: "period_type",
                              "onUpdate:modelValue": ($event) => unref(form).period_type = $event,
                              class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_type }],
                              onChange: updateDateSuggestions
                            }, [
                              createVNode("option", { value: "" }, "Select Period Type"),
                              createVNode("option", { value: "monthly" }, "Monthly"),
                              createVNode("option", { value: "quarterly" }, "Quarterly"),
                              createVNode("option", { value: "yearly" }, "Yearly")
                            ], 42, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).period_type]
                            ]),
                            __props.errors.period_type ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(__props.errors.period_type), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "start_date",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Start Date "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "start_date",
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.start_date }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).start_date]
                              ]),
                              __props.errors.start_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.start_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "end_date",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" End Date "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "end_date",
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.end_date }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).end_date]
                              ]),
                              __props.errors.end_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.end_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          dateSuggestions.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-4 bg-blue-50 rounded-md"
                          }, [
                            createVNode("h3", { class: "text-sm font-medium text-blue-900 mb-2" }, "Date Suggestions:"),
                            createVNode("div", { class: "space-y-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(dateSuggestions.value, (suggestion) => {
                                return openBlock(), createBlock("button", {
                                  key: suggestion.label,
                                  type: "button",
                                  onClick: ($event) => applySuggestion(suggestion),
                                  class: "inline-flex items-center px-3 py-1 border border-blue-200 rounded-md text-sm text-blue-700 hover:bg-blue-100 mr-2"
                                }, toDisplayString(suggestion.label), 9, ["onClick"]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "notes",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Notes "),
                            withDirectives(createVNode("textarea", {
                              id: "notes",
                              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                              rows: "3",
                              class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                              placeholder: "Additional notes for this period..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).notes]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.profit-loss.index"),
                            class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
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
                            createTextVNode(" " + toDisplayString(processing.value ? "Saving..." : "Save Period"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-yellow-800" }, "Important Information"),
                        createVNode("div", { class: "mt-2 text-sm text-yellow-700" }, [
                          createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                            createVNode("li", null, "After the period is created, the system will automatically import data from Sales Orders, Petty Cash, and Employee Salaries based on the date range."),
                            createVNode("li", null, "You can still add or edit manual entries before the period is finalized."),
                            createVNode("li", null, "Make sure the date range is correct because it affects the imported data.")
                          ])
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ProfitLoss/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
