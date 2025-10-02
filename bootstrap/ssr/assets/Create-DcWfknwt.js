import { computed, withCtx, unref, createVNode, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-S8MrU6NK.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Loader2, Info } from "lucide-vue-next";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B6ie8KC7.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    divisions: Object,
    errors: Object
  },
  setup(__props) {
    const form = useForm({
      employee_name: "",
      employee_id: "",
      division: "",
      position: "",
      basic_salary: "",
      allowances: "",
      deductions: "",
      salary_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      period_month: (/* @__PURE__ */ new Date()).toISOString().substr(0, 7),
      notes: ""
    });
    const processing = computed(() => form.processing);
    const totalSalary = computed(() => {
      const basic = parseFloat(form.basic_salary) || 0;
      const allowances = parseFloat(form.allowances) || 0;
      const deductions = parseFloat(form.deductions) || 0;
      return basic + allowances - deductions;
    });
    const submit = () => {
      form.post(route("admin-keuangan.employee-salary.store"));
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Gaji Karyawan" }, null, _parent2, _scopeId));
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
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Tambah Gaji Karyawan</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Input data gaji karyawan baru</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form${_scopeId}><div class="grid grid-cols-1 gap-6"${_scopeId}><div class="border-b border-gray-200 pb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Informasi Karyawan</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="employee_name" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Nama Karyawan <span class="text-red-500"${_scopeId}>*</span></label><input id="employee_name"${ssrRenderAttr("value", unref(form).employee_name)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.employee_name }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Nama lengkap karyawan"${_scopeId}>`);
            if (__props.errors.employee_name) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.employee_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="employee_id" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> ID Karyawan </label><input id="employee_id"${ssrRenderAttr("value", unref(form).employee_id)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.employee_id }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Nomor ID karyawan"${_scopeId}>`);
            if (__props.errors.employee_id) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.employee_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="division" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Divisi <span class="text-red-500"${_scopeId}>*</span></label><select id="division" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.division }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).division) ? ssrLooseContain(unref(form).division, "") : ssrLooseEqual(unref(form).division, "")) ? " selected" : ""}${_scopeId}>Pilih Divisi</option><!--[-->`);
            ssrRenderList(__props.divisions, (label, value) => {
              _push2(`<option${ssrRenderAttr("value", value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).division) ? ssrLooseContain(unref(form).division, value) : ssrLooseEqual(unref(form).division, value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(label)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.division) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.division)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="position" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Jabatan <span class="text-red-500"${_scopeId}>*</span></label><input id="position"${ssrRenderAttr("value", unref(form).position)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.position }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Jabatan karyawan"${_scopeId}>`);
            if (__props.errors.position) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.position)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border-b border-gray-200 pb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Informasi Gaji</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="basic_salary" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Gaji Pokok <span class="text-red-500"${_scopeId}>*</span></label><input id="basic_salary"${ssrRenderAttr("value", unref(form).basic_salary)} type="number" step="0.01" min="0" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.basic_salary }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}>`);
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
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Total Gaji </label><div class="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(totalSalary.value))}</div></div></div></div><div${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Informasi Periode</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="period_month" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Periode (Bulan-Tahun) <span class="text-red-500"${_scopeId}>*</span></label><input id="period_month"${ssrRenderAttr("value", unref(form).period_month)} type="month" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_month }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
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
            _push2(`</div></div><div class="mt-6"${_scopeId}><label for="notes" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Catatan </label><textarea id="notes" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Catatan tambahan..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></div></div></div><div class="mt-8 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.index"),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Menyimpan..." : "Simpan Gaji")}</button></div></form></div></div><div class="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-blue-800"${_scopeId}>Informasi</h3><div class="mt-2 text-sm text-blue-700"${_scopeId}><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>Gaji yang dibuat akan berstatus &quot;Draft&quot; terlebih dahulu</li><li${_scopeId}>Setelah di-approve, gaji akan otomatis masuk ke laporan laba rugi</li><li${_scopeId}>Pastikan periode sudah sesuai dengan bulan gaji yang akan dibayarkan</li></ul></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Gaji Karyawan" }),
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
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Tambah Gaji Karyawan"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Input data gaji karyawan baru")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-6" }, [
                          createVNode("div", { class: "border-b border-gray-200 pb-6" }, [
                            createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 mb-4" }, "Informasi Karyawan"),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                              createVNode("div", null, [
                                createVNode("label", {
                                  for: "employee_name",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, [
                                  createTextVNode(" Nama Karyawan "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  id: "employee_name",
                                  "onUpdate:modelValue": ($event) => unref(form).employee_name = $event,
                                  type: "text",
                                  class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.employee_name }],
                                  placeholder: "Nama lengkap karyawan"
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).employee_name]
                                ]),
                                __props.errors.employee_name ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.employee_name), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", {
                                  for: "employee_id",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, " ID Karyawan "),
                                withDirectives(createVNode("input", {
                                  id: "employee_id",
                                  "onUpdate:modelValue": ($event) => unref(form).employee_id = $event,
                                  type: "text",
                                  class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.employee_id }],
                                  placeholder: "Nomor ID karyawan"
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).employee_id]
                                ]),
                                __props.errors.employee_id ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.employee_id), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", {
                                  for: "division",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, [
                                  createTextVNode(" Divisi "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("select", {
                                  id: "division",
                                  "onUpdate:modelValue": ($event) => unref(form).division = $event,
                                  class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.division }]
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Divisi"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.divisions, (label, value) => {
                                    return openBlock(), createBlock("option", {
                                      key: value,
                                      value
                                    }, toDisplayString(label), 9, ["value"]);
                                  }), 128))
                                ], 10, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(form).division]
                                ]),
                                __props.errors.division ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.division), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", {
                                  for: "position",
                                  class: "block text-sm font-medium text-gray-700 mb-2"
                                }, [
                                  createTextVNode(" Jabatan "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  id: "position",
                                  "onUpdate:modelValue": ($event) => unref(form).position = $event,
                                  type: "text",
                                  class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.position }],
                                  placeholder: "Jabatan karyawan"
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).position]
                                ]),
                                __props.errors.position ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.position), 1)) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "border-b border-gray-200 pb-6" }, [
                            createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900 mb-4" }, "Informasi Gaji"),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
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
                                  [vModelText, unref(form).basic_salary]
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
                                  [vModelText, unref(form).allowances]
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
                                  [vModelText, unref(form).deductions]
                                ]),
                                __props.errors.deductions ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(__props.errors.deductions), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Total Gaji "),
                                createVNode("div", { class: "mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalSalary.value)), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
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
                            ]),
                            createVNode("div", { class: "mt-6" }, [
                              createVNode("label", {
                                for: "notes",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, " Catatan "),
                              withDirectives(createVNode("textarea", {
                                id: "notes",
                                "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                                rows: "3",
                                class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                                placeholder: "Catatan tambahan..."
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).notes]
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.employee-salary.index"),
                            class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
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
                            createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : "Simpan Gaji"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 bg-blue-50 border border-blue-200 rounded-md p-4" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(Info), { class: "h-5 w-5 text-blue-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-blue-800" }, "Informasi"),
                        createVNode("div", { class: "mt-2 text-sm text-blue-700" }, [
                          createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                            createVNode("li", null, 'Gaji yang dibuat akan berstatus "Draft" terlebih dahulu'),
                            createVNode("li", null, "Setelah di-approve, gaji akan otomatis masuk ke laporan laba rugi"),
                            createVNode("li", null, "Pastikan periode sudah sesuai dengan bulan gaji yang akan dibayarkan")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/EmployeeSalary/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
