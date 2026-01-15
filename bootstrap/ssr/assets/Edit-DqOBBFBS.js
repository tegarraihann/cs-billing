import { ref, computed, watch, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, withModifiers, withDirectives, vModelText, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-KnprtzM7.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, AlertTriangle, FileText, Upload, X, Save } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DOEtrGyc.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    otherIncome: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      default: () => []
    },
    customers: {
      type: Array,
      default: () => []
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    linkedBankAccountId: {
      type: [Number, String, null],
      default: null
    },
    revenueAccounts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const todayDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const formatDateInput = (value) => {
      if (!value) return "";
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        return value.slice(0, 10);
      }
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    };
    const form = useForm({
      reference_number: props.otherIncome.reference_number || "",
      customer_id: props.otherIncome.customer_id || "",
      customer_name: props.otherIncome.customer_name || "",
      transaction_date: formatDateInput(props.otherIncome.transaction_date),
      due_date: formatDateInput(props.otherIncome.due_date),
      category: props.otherIncome.category,
      description: props.otherIncome.description,
      amount: props.otherIncome.amount,
      notes: props.otherIncome.notes || "",
      bank_account_id: props.linkedBankAccountId || "",
      pl_account_id: props.otherIncome.pl_account_id || "",
      receipt_file: null
    });
    const filePreview = ref("");
    const categoryOptions = computed(() => props.categories ?? []);
    const customers = computed(() => props.customers ?? []);
    const bankAccounts = computed(() => props.bankAccounts ?? []);
    const revenueAccounts = computed(() => props.revenueAccounts ?? []);
    const plAccountOptions = computed(
      () => revenueAccounts.value.map((account) => ({
        label: `${account.account_code} - ${account.account_name}`,
        value: account.id,
        code: account.account_code,
        name: account.account_name
      }))
    );
    const plAccountInputClass = computed(() => {
      var _a;
      const base = "w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm";
      const error = ((_a = form.errors) == null ? void 0 : _a.pl_account_id) ? " border-red-300" : " border-sage-300";
      const disabled = props.otherIncome.posted_to_profit_loss ? " bg-gray-100 cursor-not-allowed" : "";
      return `${base}${error}${disabled}`;
    });
    watch(
      categoryOptions,
      (options) => {
        if (!options.length) {
          return;
        }
        if (!options.includes(form.category)) {
          form.category = options[0];
        }
      },
      { immediate: true }
    );
    watch(
      bankAccounts,
      (options) => {
        if (!form.bank_account_id && options.length > 0) {
          form.bank_account_id = options[0].id;
        }
      },
      { immediate: true }
    );
    watch(
      revenueAccounts,
      (options) => {
        if (!form.pl_account_id && options.length > 0) {
          form.pl_account_id = options[0].id;
        }
      },
      { immediate: true }
    );
    watch(
      () => form.customer_id,
      (value) => {
        if (value) {
          const found = customers.value.find((customer) => customer.id === value);
          if (found) {
            form.customer_name = found.company_name;
          }
        }
      },
      { immediate: true }
    );
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.receipt_file = file;
        filePreview.value = file.name;
      }
    };
    const removeFile = () => {
      form.receipt_file = null;
      filePreview.value = "";
    };
    const normalizeBeforeSubmit = () => {
      form.transaction_date = formatDateInput(form.transaction_date);
      form.due_date = formatDateInput(form.due_date);
      if (form.amount !== null && form.amount !== void 0 && form.amount !== "") {
        const normalized = String(form.amount).replace(/\s+/g, "").replace(/,/g, ".");
        const parsed = parseFloat(normalized);
        form.amount = isNaN(parsed) ? "" : parsed;
      }
      if (!form.bank_account_id && bankAccounts.value.length > 0) {
        form.bank_account_id = bankAccounts.value[0].id;
      }
    };
    const submitForm = () => {
      normalizeBeforeSubmit();
      form.transform((data) => ({
        ...data,
        _method: "put"
      })).post(route("admin-keuangan.other-incomes.update", props.otherIncome.id), {
        preserveScroll: true,
        forceFormData: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Pendapatan Lain-lain" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6 max-w-4xl mx-auto"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center space-x-4 mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.other-incomes.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Edit Pendapatan Lain-lain</h1></div><p class="text-sm text-sage-600 ml-9"${_scopeId}>Ubah data pendapatan lain-lain</p></div>`);
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(`<div class="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" }, null, _parent2, _scopeId));
              _push2(`</div><div class="ml-3"${_scopeId}><p class="text-sm text-yellow-700"${_scopeId}><strong${_scopeId}>Perhatian:</strong> Pendapatan ini sudah diposting ke Laba Rugi dan tidak dapat diedit. Silakan unpost terlebih dahulu jika ingin melakukan perubahan. </p></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Nomor Referensi </label><input${ssrRenderAttr("value", unref(form).reference_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).errors.reference_number) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.reference_number)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Jatuh Tempo </label><input${ssrRenderAttr("value", unref(form).due_date)} type="date"${ssrRenderAttr("min", unref(form).transaction_date)} class="${ssrRenderClass([{ "border-red-300": unref(form).errors.due_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).errors.due_date) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.due_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Customer </label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, "") : ssrLooseEqual(unref(form).customer_id, "")) ? " selected" : ""}${_scopeId}>- Tanpa Customer -</option><!--[-->`);
            ssrRenderList(customers.value, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).customer_id) ? ssrLooseContain(unref(form).customer_id, customer.id) : ssrLooseEqual(unref(form).customer_id, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.company_name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.customer_id) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.customer_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Nama Customer (opsional) </label><input${ssrRenderAttr("value", unref(form).customer_name)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).errors.customer_name) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.customer_name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Tanggal Pendapatan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).transaction_date)} type="date"${ssrRenderAttr("max", unref(todayDate))} class="${ssrRenderClass([{ "border-red-300": unref(form).errors.transaction_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}>`);
            if (unref(form).errors.transaction_date) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.transaction_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Kategori <span class="text-red-500"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": unref(form).errors.category }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss || categoryOptions.value.length === 0) ? " disabled" : ""}${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><!--[-->`);
            ssrRenderList(categoryOptions.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, category) : ssrLooseEqual(unref(form).category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (!__props.otherIncome.posted_to_profit_loss && categoryOptions.value.length === 0) {
              _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> Tidak ada kategori aktif. Tambahkan kategori di master Operational Cost Categories. </p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.category) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.category)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Deskripsi <span class="text-red-500"${_scopeId}>*</span></label><textarea rows="3" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""} placeholder="Contoh: Bunga bank periode Desember 2024"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Jumlah (Rp) <span class="text-red-500"${_scopeId}>*</span></label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 text-sm"${_scopeId}>Rp</span></div><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="0.01" min="0.01" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.amount }, "w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""} placeholder="0.00"${_scopeId}></div>`);
            if (unref(form).errors.amount) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Bank Penerima <span class="text-red-500"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": unref(form).errors.bank_account_id }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, "") : ssrLooseEqual(unref(form).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Pilih Bank</option><!--[-->`);
            ssrRenderList(bankAccounts.value, (bank) => {
              _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, bank.id) : ssrLooseEqual(unref(form).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} • ${ssrInterpolate(bank.account_number)} (${ssrInterpolate(bank.account_name)}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.bank_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.bank_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> Pendapatan ini akan langsung menambah saldo bank terpilih. </p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Akun Pendapatan (P&amp;L) <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).pl_account_id,
              "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
              options: plAccountOptions.value,
              placeholder: "Cari akun...",
              "label-field": "label",
              "value-field": "value",
              "search-fields": ["label", "code", "name"],
              "input-class": plAccountInputClass.value,
              disabled: __props.otherIncome.posted_to_profit_loss
            }, null, _parent2, _scopeId));
            if (unref(form).errors.pl_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.pl_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> Pendapatan akan dicatat ke akun ini di laporan laba rugi. </p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Catatan (Optional) </label><textarea rows="2" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.notes }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}"${ssrIncludeBooleanAttr(__props.otherIncome.posted_to_profit_loss) ? " disabled" : ""} placeholder="Catatan tambahan jika ada..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (unref(form).errors.notes) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.notes)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Upload Bukti (Optional) </label>`);
            if (__props.otherIncome.receipt_file && !filePreview.value) {
              _push2(`<div class="mb-2"${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.otherIncome.receipt_file}`)} target="_blank" class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Lihat file saat ini </a></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<div class="flex items-center space-x-4"${_scopeId}><label class="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors"${_scopeId}><div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Upload), { class: "mx-auto h-8 w-8 text-sage-400" }, null, _parent2, _scopeId));
              _push2(`<p class="mt-1 text-sm text-sage-600"${_scopeId}><span class="font-medium"${_scopeId}>Klik untuk upload</span> atau drag &amp; drop </p><p class="text-xs text-sage-500"${_scopeId}>JPG, PNG, PDF (max 2MB)</p></div><input type="file" accept=".jpg,.jpeg,.png,.pdf" class="hidden"${_scopeId}></label></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (filePreview.value) {
              _push2(`<p class="mt-2 text-sm text-sage-600"${_scopeId}> File baru terpilih: <span class="font-medium"${_scopeId}>${ssrInterpolate(filePreview.value)}</span><button type="button" class="ml-2 text-red-600 hover:text-red-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4 inline" }, null, _parent2, _scopeId));
              _push2(`</button></p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.receipt_file) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.receipt_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3 pt-4 border-t border-sage-200"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.other-incomes.index"),
              class: "inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing || categoryOptions.value.length === 0) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Edit Pendapatan Lain-lain" }),
              createVNode("div", { class: "p-6 max-w-4xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center space-x-4 mb-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.other-incomes.index"),
                      class: "text-sage-600 hover:text-sage-800 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Edit Pendapatan Lain-lain")
                  ]),
                  createVNode("p", { class: "text-sm text-sage-600 ml-9" }, "Ubah data pendapatan lain-lain")
                ]),
                __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4"
                }, [
                  createVNode("div", { class: "flex" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" })
                    ]),
                    createVNode("div", { class: "ml-3" }, [
                      createVNode("p", { class: "text-sm text-yellow-700" }, [
                        createVNode("strong", null, "Perhatian:"),
                        createTextVNode(" Pendapatan ini sudah diposting ke Laba Rugi dan tidak dapat diedit. Silakan unpost terlebih dahulu jika ingin melakukan perubahan. ")
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Nomor Referensi "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).reference_number = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                          disabled: __props.otherIncome.posted_to_profit_loss
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).reference_number]
                        ]),
                        unref(form).errors.reference_number ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.reference_number), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Jatuh Tempo "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).due_date = $event,
                          type: "date",
                          min: unref(form).transaction_date,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.due_date }],
                          disabled: __props.otherIncome.posted_to_profit_loss
                        }, null, 10, ["onUpdate:modelValue", "min", "disabled"]), [
                          [vModelText, unref(form).due_date]
                        ]),
                        unref(form).errors.due_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.due_date), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Customer "),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).customer_id = $event,
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                          disabled: __props.otherIncome.posted_to_profit_loss
                        }, [
                          createVNode("option", { value: "" }, "- Tanpa Customer -"),
                          (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                            return openBlock(), createBlock("option", {
                              key: customer.id,
                              value: customer.id
                            }, toDisplayString(customer.company_name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(form).customer_id]
                        ]),
                        unref(form).errors.customer_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.customer_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Nama Customer (opsional) "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).customer_name = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                          disabled: __props.otherIncome.posted_to_profit_loss
                        }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).customer_name]
                        ]),
                        unref(form).errors.customer_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.customer_name), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Tanggal Pendapatan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).transaction_date = $event,
                          type: "date",
                          max: unref(todayDate),
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.transaction_date }],
                          disabled: __props.otherIncome.posted_to_profit_loss
                        }, null, 10, ["onUpdate:modelValue", "max", "disabled"]), [
                          [vModelText, unref(form).transaction_date]
                        ]),
                        unref(form).errors.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Kategori "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.category }],
                          disabled: __props.otherIncome.posted_to_profit_loss || categoryOptions.value.length === 0
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Pilih Kategori"),
                          (openBlock(true), createBlock(Fragment, null, renderList(categoryOptions.value, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category,
                              value: category
                            }, toDisplayString(category), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(form).category]
                        ]),
                        !__props.otherIncome.posted_to_profit_loss && categoryOptions.value.length === 0 ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Tidak ada kategori aktif. Tambahkan kategori di master Operational Cost Categories. ")) : createCommentVNode("", true),
                        unref(form).errors.category ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Deskripsi "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": unref(form).errors.description }],
                        disabled: __props.otherIncome.posted_to_profit_loss,
                        placeholder: "Contoh: Bunga bank periode Desember 2024"
                      }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(form).errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Jumlah (Rp) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode("div", { class: "relative" }, [
                        createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          createVNode("span", { class: "text-gray-500 text-sm" }, "Rp")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          step: "0.01",
                          min: "0.01",
                          class: ["w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.amount }],
                          disabled: __props.otherIncome.posted_to_profit_loss,
                          placeholder: "0.00"
                        }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                          [vModelText, unref(form).amount]
                        ])
                      ]),
                      unref(form).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Bank Penerima "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).bank_account_id = $event,
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.bank_account_id }],
                        disabled: __props.otherIncome.posted_to_profit_loss
                      }, [
                        createVNode("option", { value: "" }, "Pilih Bank"),
                        (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                          return openBlock(), createBlock("option", {
                            key: bank.id,
                            value: bank.id
                          }, toDisplayString(bank.bank_name) + " • " + toDisplayString(bank.account_number) + " (" + toDisplayString(bank.account_name) + ") ", 9, ["value"]);
                        }), 128))
                      ], 10, ["onUpdate:modelValue", "disabled"]), [
                        [vModelSelect, unref(form).bank_account_id]
                      ]),
                      unref(form).errors.bank_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.bank_account_id), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Pendapatan ini akan langsung menambah saldo bank terpilih. ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Akun Pendapatan (P&L) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_sfc_main$1, {
                        modelValue: unref(form).pl_account_id,
                        "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
                        options: plAccountOptions.value,
                        placeholder: "Cari akun...",
                        "label-field": "label",
                        "value-field": "value",
                        "search-fields": ["label", "code", "name"],
                        "input-class": plAccountInputClass.value,
                        disabled: __props.otherIncome.posted_to_profit_loss
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class", "disabled"]),
                      unref(form).errors.pl_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.pl_account_id), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Pendapatan akan dicatat ke akun ini di laporan laba rugi. ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Catatan (Optional) "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "2",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": unref(form).errors.notes }],
                        disabled: __props.otherIncome.posted_to_profit_loss,
                        placeholder: "Catatan tambahan jika ada..."
                      }, null, 10, ["onUpdate:modelValue", "disabled"]), [
                        [vModelText, unref(form).notes]
                      ]),
                      unref(form).errors.notes ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.notes), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Upload Bukti (Optional) "),
                      __props.otherIncome.receipt_file && !filePreview.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-2"
                      }, [
                        createVNode("a", {
                          href: `/storage/${__props.otherIncome.receipt_file}`,
                          target: "_blank",
                          class: "inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                        }, [
                          createVNode(unref(FileText), { class: "w-4 h-4 mr-1" }),
                          createTextVNode(" Lihat file saat ini ")
                        ], 8, ["href"])
                      ])) : createCommentVNode("", true),
                      !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex items-center space-x-4"
                      }, [
                        createVNode("label", { class: "flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode(unref(Upload), { class: "mx-auto h-8 w-8 text-sage-400" }),
                            createVNode("p", { class: "mt-1 text-sm text-sage-600" }, [
                              createVNode("span", { class: "font-medium" }, "Klik untuk upload"),
                              createTextVNode(" atau drag & drop ")
                            ]),
                            createVNode("p", { class: "text-xs text-sage-500" }, "JPG, PNG, PDF (max 2MB)")
                          ]),
                          createVNode("input", {
                            type: "file",
                            onChange: handleFileUpload,
                            accept: ".jpg,.jpeg,.png,.pdf",
                            class: "hidden"
                          }, null, 32)
                        ])
                      ])) : createCommentVNode("", true),
                      filePreview.value ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "mt-2 text-sm text-sage-600"
                      }, [
                        createTextVNode(" File baru terpilih: "),
                        createVNode("span", { class: "font-medium" }, toDisplayString(filePreview.value), 1),
                        createVNode("button", {
                          onClick: removeFile,
                          type: "button",
                          class: "ml-2 text-red-600 hover:text-red-800"
                        }, [
                          createVNode(unref(X), { class: "w-4 h-4 inline" })
                        ])
                      ])) : createCommentVNode("", true),
                      unref(form).errors.receipt_file ? (openBlock(), createBlock("p", {
                        key: 3,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.receipt_file), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.other-incomes.index"),
                        class: "inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "submit",
                        disabled: unref(form).processing || categoryOptions.value.length === 0,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"
                      }, [
                        createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 1)
                      ], 8, ["disabled"])) : createCommentVNode("", true)
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OtherIncomes/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
