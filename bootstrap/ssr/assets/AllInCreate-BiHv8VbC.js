import { computed, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelRadio, toDisplayString, openBlock, Fragment, renderList, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BDTNgS_F.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Loader2, Info } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "AllInCreate",
  __ssrInlineRender: true,
  props: {
    divisions: Object,
    previewStats: Object,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      target_type: "",
      target_value: "",
      period_month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7),
      salary_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      basic_salary: "",
      allowances: "",
      deductions: "",
      notes: ""
    });
    const processing = computed(() => form.processing);
    const totalSalary = computed(() => {
      const basic = parseFloat(form.basic_salary) || 0;
      const allowances = parseFloat(form.allowances) || 0;
      const deductions = parseFloat(form.deductions) || 0;
      return basic + allowances - deductions;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID").format(amount || 0);
    };
    const getTargetDescription = () => {
      switch (form.target_type) {
        case "all_staff":
          return `${props.previewStats.total_staff || 0} karyawan (ALL STAFF)`;
        case "all_division":
          if (form.target_value && props.previewStats.divisions[form.target_value]) {
            const division = props.previewStats.divisions[form.target_value];
            return `${division.count} karyawan dari divisi ${division.label}`;
          }
          return "divisi yang dipilih";
        case "all_position":
          if (form.target_value && props.previewStats.positions[form.target_value]) {
            return `${props.previewStats.positions[form.target_value]} karyawan dengan jabatan "${form.target_value}"`;
          }
          return "jabatan yang dimasukkan";
        default:
          return "target yang dipilih";
      }
    };
    const submit = () => {
      form.post(route("admin-keuangan.employee-salary.all-in-store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Input Gaji All In" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Daftar Gaji Karyawan `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Daftar Gaji Karyawan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Input Gaji All In</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Input gaji untuk seluruh karyawan, divisi, atau jabatan sekaligus</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form${_scopeId}><div class="border-b border-gray-200 pb-6 mb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Pilih Target Karyawan</h3><div class="space-y-4"${_scopeId}><div class="flex items-center"${_scopeId}><input id="target_all_staff"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).target_type, "all_staff")) ? " checked" : ""} value="all_staff" type="radio" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"${_scopeId}><label for="target_all_staff" class="ml-3 block text-sm font-medium text-gray-700"${_scopeId}><span class="font-semibold"${_scopeId}>ALL STAFF</span><span class="text-gray-500 ml-2"${_scopeId}>(${ssrInterpolate(__props.previewStats.total_staff || 0)} karyawan)</span></label></div><div class="flex items-start"${_scopeId}><input id="target_all_division"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).target_type, "all_division")) ? " checked" : ""} value="all_division" type="radio" class="mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"${_scopeId}><div class="ml-3 flex-1"${_scopeId}><label for="target_all_division" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}><span class="font-semibold"${_scopeId}>ALL DIVISI</span></label><select${ssrIncludeBooleanAttr(unref(form).target_type !== "all_division") ? " disabled" : ""} class="${ssrRenderClass([{
              "bg-gray-100 text-gray-400": unref(form).target_type !== "all_division",
              "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.target_value
            }, "mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).target_value) ? ssrLooseContain(unref(form).target_value, "") : ssrLooseEqual(unref(form).target_value, "")) ? " selected" : ""}${_scopeId}>Pilih Divisi</option><!--[-->`);
            ssrRenderList(__props.previewStats.divisions, (division, key) => {
              _push2(`<option${ssrRenderAttr("value", key)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).target_value) ? ssrLooseContain(unref(form).target_value, key) : ssrLooseEqual(unref(form).target_value, key)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(division.label)} (${ssrInterpolate(division.count)} karyawan) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.target_value && unref(form).target_type === "all_division") {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.target_value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex items-start"${_scopeId}><input id="target_all_position"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).target_type, "all_position")) ? " checked" : ""} value="all_position" type="radio" class="mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"${_scopeId}><div class="ml-3 flex-1"${_scopeId}><label for="target_all_position" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}><span class="font-semibold"${_scopeId}>ALL JABATAN</span></label><input${ssrRenderAttr("value", unref(form).target_value)}${ssrIncludeBooleanAttr(unref(form).target_type !== "all_position") ? " disabled" : ""} type="text" class="${ssrRenderClass([{
              "bg-gray-100 text-gray-400": unref(form).target_type !== "all_position",
              "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.target_value
            }, "mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Masukkan nama jabatan (contoh: Manager)"${_scopeId}>`);
            if (__props.errors.target_value && unref(form).target_type === "all_position") {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.target_value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-2 text-xs text-gray-500"${_scopeId}><strong${_scopeId}>Jabatan yang tersedia:</strong><div class="mt-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.previewStats.positions, (count, position) => {
              _push2(`<span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs mr-2 mb-1"${_scopeId}>${ssrInterpolate(position)} (${ssrInterpolate(count)}) </span>`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
            if (__props.errors.target_type) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.target_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="border-b border-gray-200 pb-6 mb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Informasi Periode</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="period_month" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Periode (Bulan-Tahun) <span class="text-red-500"${_scopeId}>*</span></label><input id="period_month"${ssrRenderAttr("value", unref(form).period_month)} type="month" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_month }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.period_month) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.period_month)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="salary_date" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tanggal Gaji <span class="text-red-500"${_scopeId}>*</span></label><input id="salary_date"${ssrRenderAttr("value", unref(form).salary_date)} type="date" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.salary_date }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.salary_date) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.salary_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border-b border-gray-200 pb-6 mb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Detail Gaji Uniform</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div${_scopeId}><label for="basic_salary" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Gaji Pokok <span class="text-red-500"${_scopeId}>*</span></label><input id="basic_salary"${ssrRenderAttr("value", unref(form).basic_salary)} type="number" step="0.01" min="0" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.basic_salary }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}>`);
            if (__props.errors.basic_salary) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.basic_salary)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="allowances" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tunjangan </label><input id="allowances"${ssrRenderAttr("value", unref(form).allowances)} type="number" step="0.01" min="0" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.allowances }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}>`);
            if (__props.errors.allowances) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.allowances)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="deductions" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Potongan </label><input id="deductions"${ssrRenderAttr("value", unref(form).deductions)} type="number" step="0.01" min="0" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.deductions }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}>`);
            if (__props.errors.deductions) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.deductions)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="mt-6 p-4 bg-gray-50 rounded-lg"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span class="text-lg font-medium text-gray-900"${_scopeId}>Total Gaji per Karyawan:</span><span class="text-2xl font-bold text-sage-600"${_scopeId}> Rp ${ssrInterpolate(formatCurrency(totalSalary.value))}</span></div></div></div><div class="mb-8"${_scopeId}><label for="notes" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Catatan </label><textarea id="notes" rows="3" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.notes }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Catatan tambahan untuk gaji ini..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (__props.errors.notes) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value || !unref(form).target_type) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Memproses..." : "Simpan Gaji All In")}</button></div>`);
            if (unref(form).target_type) {
              _push2(`<div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"${_scopeId}><div class="flex"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400 mt-0.5 mr-2" }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-blue-800 mb-1"${_scopeId}>Preview Eksekusi</h4><p class="text-sm text-blue-700"${_scopeId}> Sistem akan membuat record gaji individual untuk <strong${_scopeId}>${ssrInterpolate(getTargetDescription())}</strong> dengan total gaji <strong${_scopeId}>Rp ${ssrInterpolate(formatCurrency(totalSalary.value))}</strong> per karyawan. </p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Input Gaji All In" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.employee-salary.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Daftar Gaji Karyawan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Input Gaji All In"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Input gaji untuk seluruh karyawan, divisi, atau jabatan sekaligus")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "border-b border-gray-200 pb-6 mb-6" }, [
                          createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 mb-4" }, "Pilih Target Karyawan"),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              withDirectives(createVNode("input", {
                                id: "target_all_staff",
                                "onUpdate:modelValue": ($event) => unref(form).target_type = $event,
                                value: "all_staff",
                                type: "radio",
                                class: "h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(form).target_type]
                              ]),
                              createVNode("label", {
                                for: "target_all_staff",
                                class: "ml-3 block text-sm font-medium text-gray-700"
                              }, [
                                createVNode("span", { class: "font-semibold" }, "ALL STAFF"),
                                createVNode("span", { class: "text-gray-500 ml-2" }, "(" + toDisplayString(__props.previewStats.total_staff || 0) + " karyawan)", 1)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-start" }, [
                              withDirectives(createVNode("input", {
                                id: "target_all_division",
                                "onUpdate:modelValue": ($event) => unref(form).target_type = $event,
                                value: "all_division",
                                type: "radio",
                                class: "mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(form).target_type]
                              ]),
                              createVNode("div", { class: "ml-3 flex-1" }, [
                                createVNode("label", {
                                  for: "target_all_division",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, [
                                  createVNode("span", { class: "font-semibold" }, "ALL DIVISI")
                                ]),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(form).target_value = $event,
                                  disabled: unref(form).target_type !== "all_division",
                                  class: ["mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", {
                                    "bg-gray-100 text-gray-400": unref(form).target_type !== "all_division",
                                    "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.target_value
                                  }]
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Divisi"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.previewStats.divisions, (division, key) => {
                                    return openBlock(), createBlock("option", {
                                      key,
                                      value: key
                                    }, toDisplayString(division.label) + " (" + toDisplayString(division.count) + " karyawan) ", 9, ["value"]);
                                  }), 128))
                                ], 10, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelSelect, unref(form).target_value]
                                ]),
                                __props.errors.target_value && unref(form).target_type === "all_division" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.target_value), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "flex items-start" }, [
                              withDirectives(createVNode("input", {
                                id: "target_all_position",
                                "onUpdate:modelValue": ($event) => unref(form).target_type = $event,
                                value: "all_position",
                                type: "radio",
                                class: "mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelRadio, unref(form).target_type]
                              ]),
                              createVNode("div", { class: "ml-3 flex-1" }, [
                                createVNode("label", {
                                  for: "target_all_position",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, [
                                  createVNode("span", { class: "font-semibold" }, "ALL JABATAN")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).target_value = $event,
                                  disabled: unref(form).target_type !== "all_position",
                                  type: "text",
                                  class: ["mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", {
                                    "bg-gray-100 text-gray-400": unref(form).target_type !== "all_position",
                                    "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.target_value
                                  }],
                                  placeholder: "Masukkan nama jabatan (contoh: Manager)"
                                }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelText, unref(form).target_value]
                                ]),
                                __props.errors.target_value && unref(form).target_type === "all_position" ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.target_value), 1)) : createCommentVNode("", true),
                                createVNode("div", { class: "mt-2 text-xs text-gray-500" }, [
                                  createVNode("strong", null, "Jabatan yang tersedia:"),
                                  createVNode("div", { class: "mt-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.previewStats.positions, (count, position) => {
                                      return openBlock(), createBlock("span", {
                                        key: position,
                                        class: "inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs mr-2 mb-1"
                                      }, toDisplayString(position) + " (" + toDisplayString(count) + ") ", 1);
                                    }), 128))
                                  ])
                                ])
                              ])
                            ])
                          ]),
                          __props.errors.target_type ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(__props.errors.target_type), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "border-b border-gray-200 pb-6 mb-6" }, [
                          createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 mb-4" }, "Informasi Periode"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "period_month",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Periode (Bulan-Tahun) "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "period_month",
                                "onUpdate:modelValue": ($event) => unref(form).period_month = $event,
                                type: "month",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_month }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).period_month]
                              ]),
                              __props.errors.period_month ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.period_month), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "salary_date",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Tanggal Gaji "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "salary_date",
                                "onUpdate:modelValue": ($event) => unref(form).salary_date = $event,
                                type: "date",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.salary_date }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).salary_date]
                              ]),
                              __props.errors.salary_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.salary_date), 1)) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-b border-gray-200 pb-6 mb-6" }, [
                          createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 mb-4" }, "Detail Gaji Uniform"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "basic_salary",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Gaji Pokok "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "basic_salary",
                                "onUpdate:modelValue": ($event) => unref(form).basic_salary = $event,
                                type: "number",
                                step: "0.01",
                                min: "0",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.basic_salary }],
                                placeholder: "0"
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(form).basic_salary,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              __props.errors.basic_salary ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.basic_salary), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "allowances",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, " Tunjangan "),
                              withDirectives(createVNode("input", {
                                id: "allowances",
                                "onUpdate:modelValue": ($event) => unref(form).allowances = $event,
                                type: "number",
                                step: "0.01",
                                min: "0",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.allowances }],
                                placeholder: "0"
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(form).allowances,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              __props.errors.allowances ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.allowances), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "deductions",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, " Potongan "),
                              withDirectives(createVNode("input", {
                                id: "deductions",
                                "onUpdate:modelValue": ($event) => unref(form).deductions = $event,
                                type: "number",
                                step: "0.01",
                                min: "0",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.deductions }],
                                placeholder: "0"
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [
                                  vModelText,
                                  unref(form).deductions,
                                  void 0,
                                  { number: true }
                                ]
                              ]),
                              __props.errors.deductions ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.deductions), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "mt-6 p-4 bg-gray-50 rounded-lg" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", { class: "text-lg font-medium text-gray-900" }, "Total Gaji per Karyawan:"),
                              createVNode("span", { class: "text-2xl font-bold text-sage-600" }, " Rp " + toDisplayString(formatCurrency(totalSalary.value)), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mb-8" }, [
                          createVNode("label", {
                            for: "notes",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, " Catatan "),
                          withDirectives(createVNode("textarea", {
                            id: "notes",
                            "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                            rows: "3",
                            class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.notes }],
                            placeholder: "Catatan tambahan untuk gaji ini..."
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).notes]
                          ]),
                          __props.errors.notes ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(__props.errors.notes), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.employee-salary.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: processing.value || !unref(form).target_type,
                            class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          }, [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "w-4 h-4 mr-2 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(processing.value ? "Memproses..." : "Simpan Gaji All In"), 1)
                          ], 8, ["disabled"])
                        ]),
                        unref(form).target_type ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode(unref(Info), { class: "h-5 w-5 text-blue-400 mt-0.5 mr-2" }),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-sm font-medium text-blue-800 mb-1" }, "Preview Eksekusi"),
                              createVNode("p", { class: "text-sm text-blue-700" }, [
                                createTextVNode(" Sistem akan membuat record gaji individual untuk "),
                                createVNode("strong", null, toDisplayString(getTargetDescription()), 1),
                                createTextVNode(" dengan total gaji "),
                                createVNode("strong", null, "Rp " + toDisplayString(formatCurrency(totalSalary.value)), 1),
                                createTextVNode(" per karyawan. ")
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/EmployeeSalary/AllInCreate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
