import { computed, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BEyxLQNh.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Plus, Users, Trash2, Info, Loader2, HelpCircle } from "lucide-vue-next";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B8fnJf_r.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "BulkCreate",
  __ssrInlineRender: true,
  props: {
    divisions: Object,
    errors: Object
  },
  setup(__props) {
    const form = useForm({
      period_month: (/* @__PURE__ */ new Date()).toISOString().slice(0, 7),
      // Current month
      salary_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      // Today
      employees: []
    });
    const processing = computed(() => form.processing);
    const addEmployee = () => {
      form.employees.push({
        employee_name: "",
        employee_id: "",
        division: "",
        position: "",
        basic_salary: 0,
        allowances: 0,
        deductions: 0
      });
    };
    const removeEmployee = (index) => {
      if (confirm("Hapus data karyawan ini?")) {
        form.employees.splice(index, 1);
      }
    };
    const calculateTotal = (employee) => {
      const basic = parseFloat(employee.basic_salary) || 0;
      const allowances = parseFloat(employee.allowances) || 0;
      const deductions = parseFloat(employee.deductions) || 0;
      return basic + allowances - deductions;
    };
    const grandTotal = computed(() => {
      return form.employees.reduce((total, employee) => {
        return total + calculateTotal(employee);
      }, 0);
    });
    const submit = () => {
      form.post(route("admin-keuangan.employee-salary.bulk-store"));
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    if (form.employees.length === 0) {
      addEmployee();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Bulk Input Gaji Karyawan" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Daftar Gaji `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Daftar Gaji ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Bulk Input Gaji Karyawan</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Tambahkan data gaji untuk multiple karyawan sekaligus</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form${_scopeId}><div class="border-b border-gray-200 pb-6 mb-6"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900 mb-4"${_scopeId}>Informasi Periode</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="period_month" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Periode (Bulan-Tahun) <span class="text-red-500"${_scopeId}>*</span></label><input id="period_month"${ssrRenderAttr("value", unref(form).period_month)} type="month" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_month }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
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
            _push2(`</div></div></div><div class="mb-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-medium leading-6 text-gray-900"${_scopeId}>Data Karyawan</h3><button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-sage-700 bg-sage-100 hover:bg-sage-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Tambah Karyawan </button></div>`);
            if (unref(form).employees.length === 0) {
              _push2(`<div class="text-center py-12 border-2 border-gray-300 border-dashed rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "mx-auto h-12 w-12 text-gray-400 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-medium text-gray-900 mb-2"${_scopeId}>Belum ada data karyawan</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}>Mulai dengan menambahkan data karyawan pertama</p><button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Tambah Karyawan Pertama </button></div>`);
            } else {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).employees, (employee, index) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-6 bg-gray-50"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h4 class="text-md font-medium text-gray-900"${_scopeId}>Karyawan #${ssrInterpolate(index + 1)}</h4>`);
                if (unref(form).employees.length > 1) {
                  _push2(`<button type="button" class="text-red-600 hover:text-red-900 p-1"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Nama Karyawan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", employee.employee_name)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.employee_name`] }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Nama lengkap karyawan"${_scopeId}>`);
                if (__props.errors[`employees.${index}.employee_name`]) {
                  _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors[`employees.${index}.employee_name`])}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> ID Karyawan </label><input${ssrRenderAttr("value", employee.employee_id)} type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="ID karyawan (opsional)"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Divisi <span class="text-red-500"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.division`] }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(employee.division) ? ssrLooseContain(employee.division, "") : ssrLooseEqual(employee.division, "")) ? " selected" : ""}${_scopeId}>Pilih Divisi</option><!--[-->`);
                ssrRenderList(__props.divisions, (label, value) => {
                  _push2(`<option${ssrRenderAttr("value", value)}${ssrIncludeBooleanAttr(Array.isArray(employee.division) ? ssrLooseContain(employee.division, value) : ssrLooseEqual(employee.division, value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(label)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (__props.errors[`employees.${index}.division`]) {
                  _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors[`employees.${index}.division`])}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Jabatan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", employee.position)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.position`] }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Jabatan karyawan"${_scopeId}>`);
                if (__props.errors[`employees.${index}.position`]) {
                  _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors[`employees.${index}.position`])}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Gaji Pokok <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", employee.basic_salary)} type="number" step="0.01" min="0" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.basic_salary`] }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}>`);
                if (__props.errors[`employees.${index}.basic_salary`]) {
                  _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors[`employees.${index}.basic_salary`])}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tunjangan </label><input${ssrRenderAttr("value", employee.allowances)} type="number" step="0.01" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="0"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Potongan </label><input${ssrRenderAttr("value", employee.deductions)} type="number" step="0.01" min="0" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="0"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Total Gaji </label><div class="mt-1 block w-full border border-gray-200 bg-gray-100 rounded-md shadow-sm py-2 px-3 text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(calculateTotal(employee)))}</div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div>`);
            if (unref(form).employees.length > 0) {
              _push2(`<div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
              _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-blue-800"${_scopeId}>Ringkasan</h3><div class="mt-2 text-sm text-blue-700"${_scopeId}><p${_scopeId}>Total Karyawan: <span class="font-semibold"${_scopeId}>${ssrInterpolate(unref(form).employees.length)}</span></p><p${_scopeId}>Total Gaji Keseluruhan: <span class="font-semibold"${_scopeId}>${ssrInterpolate(formatCurrency(grandTotal.value))}</span></p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-end space-x-3"${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value || unref(form).employees.length === 0) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Menyimpan..." : `Simpan ${unref(form).employees.length} Data Gaji`)}</button></div></form></div></div><div class="mt-6 bg-gray-50 border border-gray-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(HelpCircle), { class: "h-5 w-5 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-gray-800"${_scopeId}>Tips Bulk Input</h3><div class="mt-2 text-sm text-gray-600"${_scopeId}><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>Gunakan fitur ini untuk input gaji multiple karyawan dengan periode yang sama</li><li${_scopeId}>Semua data akan tersimpan dengan status &quot;Draft&quot; dan bisa diedit sebelum di-approve</li><li${_scopeId}>Total gaji akan dihitung otomatis: Gaji Pokok + Tunjangan - Potongan</li><li${_scopeId}>Anda bisa menambah/hapus karyawan sebelum menyimpan data</li></ul></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Bulk Input Gaji Karyawan" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.employee-salary.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Daftar Gaji ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Bulk Input Gaji Karyawan"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Tambahkan data gaji untuk multiple karyawan sekaligus")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
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
                        createVNode("div", { class: "mb-6" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h3", { class: "text-lg font-medium leading-6 text-gray-900" }, "Data Karyawan"),
                            createVNode("button", {
                              type: "button",
                              onClick: addEmployee,
                              class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-sage-700 bg-sage-100 hover:bg-sage-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Karyawan ")
                            ])
                          ]),
                          unref(form).employees.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center py-12 border-2 border-gray-300 border-dashed rounded-lg"
                          }, [
                            createVNode(unref(Users), { class: "mx-auto h-12 w-12 text-gray-400 mb-4" }),
                            createVNode("h3", { class: "text-sm font-medium text-gray-900 mb-2" }, "Belum ada data karyawan"),
                            createVNode("p", { class: "text-sm text-gray-500 mb-4" }, "Mulai dengan menambahkan data karyawan pertama"),
                            createVNode("button", {
                              type: "button",
                              onClick: addEmployee,
                              class: "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Karyawan Pertama ")
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-6"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).employees, (employee, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "border border-gray-200 rounded-lg p-6 bg-gray-50"
                              }, [
                                createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                  createVNode("h4", { class: "text-md font-medium text-gray-900" }, "Karyawan #" + toDisplayString(index + 1), 1),
                                  unref(form).employees.length > 1 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    onClick: ($event) => removeEmployee(index),
                                    class: "text-red-600 hover:text-red-900 p-1"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                                      createTextVNode(" Nama Karyawan "),
                                      createVNode("span", { class: "text-red-500" }, "*")
                                    ]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.employee_name = $event,
                                      type: "text",
                                      class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.employee_name`] }],
                                      placeholder: "Nama lengkap karyawan"
                                    }, null, 10, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.employee_name]
                                    ]),
                                    __props.errors[`employees.${index}.employee_name`] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-sm text-red-600"
                                    }, toDisplayString(__props.errors[`employees.${index}.employee_name`]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " ID Karyawan "),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.employee_id = $event,
                                      type: "text",
                                      class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                                      placeholder: "ID karyawan (opsional)"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.employee_id]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                                      createTextVNode(" Divisi "),
                                      createVNode("span", { class: "text-red-500" }, "*")
                                    ]),
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => employee.division = $event,
                                      class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.division`] }]
                                    }, [
                                      createVNode("option", { value: "" }, "Pilih Divisi"),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.divisions, (label, value) => {
                                        return openBlock(), createBlock("option", {
                                          key: value,
                                          value
                                        }, toDisplayString(label), 9, ["value"]);
                                      }), 128))
                                    ], 10, ["onUpdate:modelValue"]), [
                                      [vModelSelect, employee.division]
                                    ]),
                                    __props.errors[`employees.${index}.division`] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-sm text-red-600"
                                    }, toDisplayString(__props.errors[`employees.${index}.division`]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                                      createTextVNode(" Jabatan "),
                                      createVNode("span", { class: "text-red-500" }, "*")
                                    ]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.position = $event,
                                      type: "text",
                                      class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.position`] }],
                                      placeholder: "Jabatan karyawan"
                                    }, null, 10, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.position]
                                    ]),
                                    __props.errors[`employees.${index}.position`] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-sm text-red-600"
                                    }, toDisplayString(__props.errors[`employees.${index}.position`]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                                      createTextVNode(" Gaji Pokok "),
                                      createVNode("span", { class: "text-red-500" }, "*")
                                    ]),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.basic_salary = $event,
                                      type: "number",
                                      step: "0.01",
                                      min: "0",
                                      class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors[`employees.${index}.basic_salary`] }],
                                      placeholder: "0"
                                    }, null, 10, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.basic_salary]
                                    ]),
                                    __props.errors[`employees.${index}.basic_salary`] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-1 text-sm text-red-600"
                                    }, toDisplayString(__props.errors[`employees.${index}.basic_salary`]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Tunjangan "),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.allowances = $event,
                                      type: "number",
                                      step: "0.01",
                                      min: "0",
                                      class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                                      placeholder: "0"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.allowances]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Potongan "),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => employee.deductions = $event,
                                      type: "number",
                                      step: "0.01",
                                      min: "0",
                                      class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                                      placeholder: "0"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, employee.deductions]
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Total Gaji "),
                                    createVNode("div", { class: "mt-1 block w-full border border-gray-200 bg-gray-100 rounded-md shadow-sm py-2 px-3 text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(calculateTotal(employee))), 1)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ]))
                        ]),
                        unref(form).employees.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-blue-50 border border-blue-200 rounded-md p-4 mb-6"
                        }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(Info), { class: "h-5 w-5 text-blue-400" })
                            ]),
                            createVNode("div", { class: "ml-3" }, [
                              createVNode("h3", { class: "text-sm font-medium text-blue-800" }, "Ringkasan"),
                              createVNode("div", { class: "mt-2 text-sm text-blue-700" }, [
                                createVNode("p", null, [
                                  createTextVNode("Total Karyawan: "),
                                  createVNode("span", { class: "font-semibold" }, toDisplayString(unref(form).employees.length), 1)
                                ]),
                                createVNode("p", null, [
                                  createTextVNode("Total Gaji Keseluruhan: "),
                                  createVNode("span", { class: "font-semibold" }, toDisplayString(formatCurrency(grandTotal.value)), 1)
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-end space-x-3" }, [
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
                            disabled: processing.value || unref(form).employees.length === 0,
                            class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                          }, [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "animate-spin -ml-1 mr-2 h-4 w-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : `Simpan ${unref(form).employees.length} Data Gaji`), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 bg-gray-50 border border-gray-200 rounded-md p-4" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(HelpCircle), { class: "h-5 w-5 text-gray-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-gray-800" }, "Tips Bulk Input"),
                        createVNode("div", { class: "mt-2 text-sm text-gray-600" }, [
                          createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                            createVNode("li", null, "Gunakan fitur ini untuk input gaji multiple karyawan dengan periode yang sama"),
                            createVNode("li", null, 'Semua data akan tersimpan dengan status "Draft" dan bisa diedit sebelum di-approve'),
                            createVNode("li", null, "Total gaji akan dihitung otomatis: Gaji Pokok + Tunjangan - Potongan"),
                            createVNode("li", null, "Anda bisa menambah/hapus karyawan sebelum menyimpan data")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/EmployeeSalary/BulkCreate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
