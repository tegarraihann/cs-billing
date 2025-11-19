import { ref, computed, reactive, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, withModifiers, withDirectives, vModelSelect, openBlock, Fragment, renderList, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-RVI0Lmfy.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: Object,
    summary: {
      type: Object,
      default: () => ({})
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    pettyCashCategories: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const showPurchaseModal = ref(false);
    const showDepreciationModal = ref(false);
    const bankAccounts = computed(() => props.bankAccounts ?? []);
    const pettyCashCategories = computed(() => props.pettyCashCategories ?? []);
    const filterForm = reactive({
      transaction_type: ((_a = props.filters) == null ? void 0 : _a.transaction_type) ?? "",
      category: ((_b = props.filters) == null ? void 0 : _b.category) ?? "",
      date_from: ((_c = props.filters) == null ? void 0 : _c.date_from) ?? "",
      date_to: ((_d = props.filters) == null ? void 0 : _d.date_to) ?? ""
    });
    const purchaseForm = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      asset_name: "",
      category: "",
      amount: "",
      description: "",
      reference_number: "",
      source_type: "bank",
      bank_account_id: "",
      petty_cash_category_id: "",
      useful_life_months: "",
      depreciation_start_date: "",
      notes: ""
    });
    const depreciationForm = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      asset_name: "",
      amount: "",
      description: "",
      notes: ""
    });
    watch(
      () => purchaseForm.source_type,
      (value) => {
        if (value !== "bank") {
          purchaseForm.bank_account_id = "";
        }
        if (value !== "petty_cash") {
          purchaseForm.petty_cash_category_id = "";
        }
      }
    );
    const openPurchaseModal = () => {
      purchaseForm.reset();
      purchaseForm.transaction_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      purchaseForm.source_type = "bank";
      showPurchaseModal.value = true;
    };
    const closePurchaseModal = () => {
      showPurchaseModal.value = false;
    };
    const openDepreciationModal = () => {
      depreciationForm.reset();
      depreciationForm.transaction_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      showDepreciationModal.value = true;
    };
    const closeDepreciationModal = () => {
      showDepreciationModal.value = false;
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.equipment.index"), filterForm, {
        preserveState: true,
        replace: true
      });
    };
    const resetFilters = () => {
      filterForm.transaction_type = "";
      filterForm.category = "";
      filterForm.date_from = "";
      filterForm.date_to = "";
      applyFilters();
    };
    const submitPurchase = () => {
      purchaseForm.post(route("admin-keuangan.equipment.purchase"), {
        onSuccess: () => {
          closePurchaseModal();
        }
      });
    };
    const submitDepreciation = () => {
      depreciationForm.post(route("admin-keuangan.equipment.depreciation"), {
        onSuccess: () => {
          closeDepreciationModal();
        }
      });
    };
    const formatNumber = (value) => {
      return new Intl.NumberFormat("id-ID").format(Number(value) || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Equipment Ledger" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Equipment Ledger</h1><p class="text-sm text-gray-500"${_scopeId}>Catat pembelian aset dan penyusutan otomatis untuk laporan keuangan.</p></div><div class="flex space-x-3"${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Tambah Pembelian </button><button class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Catat Penyusutan </button></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Pembelian</p><p class="text-2xl font-semibold text-gray-900 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.total_purchase || 0))}</p></div><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Penyusutan</p><p class="text-2xl font-semibold text-gray-900 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.total_depreciation || 0))}</p></div><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Nilai Buku</p><p class="text-2xl font-semibold text-green-600 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.net_book_value || 0))}</p></div></div><div class="bg-white shadow rounded-lg"${_scopeId}><form class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Jenis Transaksi</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "") : ssrLooseEqual(filterForm.transaction_type, "")) ? " selected" : ""}${_scopeId}>Semua</option><option value="purchase"${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "purchase") : ssrLooseEqual(filterForm.transaction_type, "purchase")) ? " selected" : ""}${_scopeId}>Pembelian</option><option value="depreciation"${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "depreciation") : ssrLooseEqual(filterForm.transaction_type, "depreciation")) ? " selected" : ""}${_scopeId}>Penyusutan</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.category) ? ssrLooseContain(filterForm.category, "") : ssrLooseEqual(filterForm.category, "")) ? " selected" : ""}${_scopeId}>Semua</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(filterForm.category) ? ssrLooseContain(filterForm.category, category) : ssrLooseEqual(filterForm.category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input type="date"${ssrRenderAttr("value", filterForm.date_from)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input type="date"${ssrRenderAttr("value", filterForm.date_to)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div class="flex items-end space-x-2"${_scopeId}><button type="submit" class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Terapkan </button><button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"${_scopeId}> Reset </button></div></div></form><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Tanggal</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Tipe</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Aset</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Nominal</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Sumber</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>User</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.transactions.data, (transaction) => {
              var _a2;
              _push2(`<tr${_scopeId}><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</td><td class="px-3 py-3"${_scopeId}><span class="${ssrRenderClass([transaction.transaction_type === "purchase" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(transaction.transaction_type === "purchase" ? "Pembelian" : "Penyusutan")}</span></td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(transaction.asset_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(transaction.category || "-")}</div>`);
              if (transaction.notes) {
                _push2(`<div class="text-xs text-gray-500 mt-1 line-clamp-2"${_scopeId}>${ssrInterpolate(transaction.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-3 py-3 text-sm font-semibold text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(transaction.amount))}</td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}><div class="capitalize"${_scopeId}>${ssrInterpolate(transaction.source_type || "-")}</div>`);
              if (transaction.bank_account) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(transaction.bank_account.bank_name)} - ${ssrInterpolate(transaction.bank_account.account_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = transaction.creator) == null ? void 0 : _a2.name) || "-")}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.transactions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-3 py-6 text-center text-sm text-gray-500"${_scopeId}>Belum ada transaksi.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(Pagination, { data: __props.transactions }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
            if (showPurchaseModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"${_scopeId}><div class="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Tambah Pembelian Equipment</h3><button class="text-gray-400 hover:text-gray-600"${_scopeId}>×</button></div><form class="px-6 py-4 space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Tanggal *</label><input${ssrRenderAttr("value", unref(purchaseForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>`);
              if (unref(purchaseForm).errors.transaction_date) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.transaction_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nominal *</label><input${ssrRenderAttr("value", unref(purchaseForm).amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="0"${_scopeId}>`);
              if (unref(purchaseForm).errors.amount) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nama Aset *</label><input${ssrRenderAttr("value", unref(purchaseForm).asset_name)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: Laptop Admin"${_scopeId}>`);
              if (unref(purchaseForm).errors.asset_name) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.asset_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori</label><input${ssrRenderAttr("value", unref(purchaseForm).category)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Opsional"${_scopeId}></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Deskripsi</label><input${ssrRenderAttr("value", unref(purchaseForm).description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Keterangan tambahan"${_scopeId}></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sumber Dana *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).source_type) ? ssrLooseContain(unref(purchaseForm).source_type, "bank") : ssrLooseEqual(unref(purchaseForm).source_type, "bank")) ? " selected" : ""}${_scopeId}>Transfer Bank</option><option value="petty_cash"${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).source_type) ? ssrLooseContain(unref(purchaseForm).source_type, "petty_cash") : ssrLooseEqual(unref(purchaseForm).source_type, "petty_cash")) ? " selected" : ""}${_scopeId}>Petty Cash</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).source_type) ? ssrLooseContain(unref(purchaseForm).source_type, "other") : ssrLooseEqual(unref(purchaseForm).source_type, "other")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
              if (unref(purchaseForm).errors.source_type) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.source_type)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(purchaseForm).source_type === "bank") {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Akun Bank *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).bank_account_id) ? ssrLooseContain(unref(purchaseForm).bank_account_id, "") : ssrLooseEqual(unref(purchaseForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Pilih Akun</option><!--[-->`);
                ssrRenderList(bankAccounts.value, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).bank_account_id) ? ssrLooseContain(unref(purchaseForm).bank_account_id, bank.id) : ssrLooseEqual(unref(purchaseForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(purchaseForm).errors.bank_account_id) {
                  _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.bank_account_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(purchaseForm).source_type === "petty_cash") {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori Petty Cash *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).petty_cash_category_id) ? ssrLooseContain(unref(purchaseForm).petty_cash_category_id, "") : ssrLooseEqual(unref(purchaseForm).petty_cash_category_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><!--[-->`);
                ssrRenderList(pettyCashCategories.value, (category) => {
                  _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(purchaseForm).petty_cash_category_id) ? ssrLooseContain(unref(purchaseForm).petty_cash_category_id, category.id) : ssrLooseEqual(unref(purchaseForm).petty_cash_category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(purchaseForm).errors.petty_cash_category_id) {
                  _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.petty_cash_category_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Umur Ekonomis (bulan)</label><input${ssrRenderAttr("value", unref(purchaseForm).useful_life_months)} type="number" min="1" max="240" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: 36"${_scopeId}>`);
              if (unref(purchaseForm).errors.useful_life_months) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(purchaseForm).errors.useful_life_months)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Mulai Penyusutan</label><input${ssrRenderAttr("value", unref(purchaseForm).depreciation_start_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Catatan</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(unref(purchaseForm).notes)}</textarea></div><div class="flex justify-end space-x-3 pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"${_scopeId}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(purchaseForm).processing) ? " disabled" : ""} class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(purchaseForm).processing ? "Menyimpan..." : "Simpan")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showDepreciationModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"${_scopeId}><div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Catat Penyusutan Equipment</h3><button class="text-gray-400 hover:text-gray-600"${_scopeId}>×</button></div><form class="px-6 py-4 space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Tanggal *</label><input${ssrRenderAttr("value", unref(depreciationForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>`);
              if (unref(depreciationForm).errors.transaction_date) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(depreciationForm).errors.transaction_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nama Aset *</label><input${ssrRenderAttr("value", unref(depreciationForm).asset_name)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: Laptop Admin"${_scopeId}>`);
              if (unref(depreciationForm).errors.asset_name) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(depreciationForm).errors.asset_name)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nominal *</label><input${ssrRenderAttr("value", unref(depreciationForm).amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="0"${_scopeId}>`);
              if (unref(depreciationForm).errors.amount) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(depreciationForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Deskripsi</label><input${ssrRenderAttr("value", unref(depreciationForm).description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: Depresiasi April"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Catatan</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(unref(depreciationForm).notes)}</textarea></div><div class="flex justify-end space-x-3 pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"${_scopeId}>Batal</button><button type="submit"${ssrIncludeBooleanAttr(unref(depreciationForm).processing) ? " disabled" : ""} class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(depreciationForm).processing ? "Menyimpan..." : "Simpan")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Equipment Ledger" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Equipment Ledger"),
                      createVNode("p", { class: "text-sm text-gray-500" }, "Catat pembelian aset dan penyusutan otomatis untuk laporan keuangan.")
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode("button", {
                        onClick: openPurchaseModal,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, " Tambah Pembelian "),
                      createVNode("button", {
                        onClick: openDepreciationModal,
                        class: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, " Catat Penyusutan ")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Pembelian"),
                      createVNode("p", { class: "text-2xl font-semibold text-gray-900 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.total_purchase || 0)), 1)
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Penyusutan"),
                      createVNode("p", { class: "text-2xl font-semibold text-gray-900 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.total_depreciation || 0)), 1)
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Nilai Buku"),
                      createVNode("p", { class: "text-2xl font-semibold text-green-600 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.net_book_value || 0)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(applyFilters, ["prevent"]),
                      class: "px-4 py-5 sm:px-6 border-b border-gray-200"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-5 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Jenis Transaksi"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.transaction_type = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua"),
                            createVNode("option", { value: "purchase" }, "Pembelian"),
                            createVNode("option", { value: "depreciation" }, "Penyusutan")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.transaction_type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.category = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                              return openBlock(), createBlock("option", {
                                key: category,
                                value: category
                              }, toDisplayString(category), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.category]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dari Tanggal"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => filterForm.date_from = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.date_from]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sampai Tanggal"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => filterForm.date_to = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.date_to]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end space-x-2" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, " Terapkan "),
                          createVNode("button", {
                            type: "button",
                            onClick: resetFilters,
                            class: "inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          }, " Reset ")
                        ])
                      ])
                    ], 32),
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tanggal"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tipe"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Aset"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Nominal"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Sumber"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "User")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (transaction) => {
                              var _a2;
                              return openBlock(), createBlock("tr", {
                                key: transaction.id
                              }, [
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, toDisplayString(formatDate(transaction.transaction_date)), 1),
                                createVNode("td", { class: "px-3 py-3" }, [
                                  createVNode("span", {
                                    class: [transaction.transaction_type === "purchase" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"]
                                  }, toDisplayString(transaction.transaction_type === "purchase" ? "Pembelian" : "Penyusutan"), 3)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(transaction.asset_name), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(transaction.category || "-"), 1),
                                  transaction.notes ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-500 mt-1 line-clamp-2"
                                  }, toDisplayString(transaction.notes), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm font-semibold text-gray-900" }, " Rp " + toDisplayString(formatNumber(transaction.amount)), 1),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, [
                                  createVNode("div", { class: "capitalize" }, toDisplayString(transaction.source_type || "-"), 1),
                                  transaction.bank_account ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-500"
                                  }, toDisplayString(transaction.bank_account.bank_name) + " - " + toDisplayString(transaction.bank_account.account_number), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, toDisplayString(((_a2 = transaction.creator) == null ? void 0 : _a2.name) || "-"), 1)
                              ]);
                            }), 128)),
                            __props.transactions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "px-3 py-6 text-center text-sm text-gray-500"
                              }, "Belum ada transaksi.")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode(Pagination, { data: __props.transactions }, null, 8, ["data"])
                      ])
                    ])
                  ])
                ])
              ]),
              showPurchaseModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Tambah Pembelian Equipment"),
                    createVNode("button", {
                      onClick: closePurchaseModal,
                      class: "text-gray-400 hover:text-gray-600"
                    }, "×")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitPurchase, ["prevent"]),
                    class: "px-6 py-4 space-y-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).transaction_date = $event,
                          type: "date",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).transaction_date]
                        ]),
                        unref(purchaseForm).errors.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nominal *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).amount = $event,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                          placeholder: "0"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).amount]
                        ]),
                        unref(purchaseForm).errors.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.amount), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nama Aset *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).asset_name = $event,
                          type: "text",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                          placeholder: "Contoh: Laptop Admin"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).asset_name]
                        ]),
                        unref(purchaseForm).errors.asset_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.asset_name), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).category = $event,
                          type: "text",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                          placeholder: "Opsional"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).category]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deskripsi"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(purchaseForm).description = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Keterangan tambahan"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(purchaseForm).description]
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sumber Dana *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).source_type = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "bank" }, "Transfer Bank"),
                          createVNode("option", { value: "petty_cash" }, "Petty Cash"),
                          createVNode("option", { value: "other" }, "Lainnya")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(purchaseForm).source_type]
                        ]),
                        unref(purchaseForm).errors.source_type ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.source_type), 1)) : createCommentVNode("", true)
                      ]),
                      unref(purchaseForm).source_type === "bank" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Akun Bank *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).bank_account_id = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "Pilih Akun"),
                          (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                            return openBlock(), createBlock("option", {
                              key: bank.id,
                              value: bank.id
                            }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(purchaseForm).bank_account_id]
                        ]),
                        unref(purchaseForm).errors.bank_account_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.bank_account_id), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(purchaseForm).source_type === "petty_cash" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori Petty Cash *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).petty_cash_category_id = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "Pilih Kategori"),
                          (openBlock(true), createBlock(Fragment, null, renderList(pettyCashCategories.value, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(purchaseForm).petty_cash_category_id]
                        ]),
                        unref(purchaseForm).errors.petty_cash_category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.petty_cash_category_id), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Umur Ekonomis (bulan)"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).useful_life_months = $event,
                          type: "number",
                          min: "1",
                          max: "240",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                          placeholder: "Contoh: 36"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).useful_life_months]
                        ]),
                        unref(purchaseForm).errors.useful_life_months ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(purchaseForm).errors.useful_life_months), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Mulai Penyusutan"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(purchaseForm).depreciation_start_date = $event,
                          type: "date",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(purchaseForm).depreciation_start_date]
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(purchaseForm).notes = $event,
                        rows: "3",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(purchaseForm).notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: closePurchaseModal,
                        class: "px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                      }, "Batal"),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(purchaseForm).processing,
                        class: "px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                      }, toDisplayString(unref(purchaseForm).processing ? "Menyimpan..." : "Simpan"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showDepreciationModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl w-full max-w-lg mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Catat Penyusutan Equipment"),
                    createVNode("button", {
                      onClick: closeDepreciationModal,
                      class: "text-gray-400 hover:text-gray-600"
                    }, "×")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitDepreciation, ["prevent"]),
                    class: "px-6 py-4 space-y-4"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(depreciationForm).transaction_date = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(depreciationForm).transaction_date]
                      ]),
                      unref(depreciationForm).errors.transaction_date ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(depreciationForm).errors.transaction_date), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nama Aset *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(depreciationForm).asset_name = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Contoh: Laptop Admin"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(depreciationForm).asset_name]
                      ]),
                      unref(depreciationForm).errors.asset_name ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(depreciationForm).errors.asset_name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nominal *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(depreciationForm).amount = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "0"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(depreciationForm).amount]
                      ]),
                      unref(depreciationForm).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(depreciationForm).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deskripsi"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(depreciationForm).description = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Contoh: Depresiasi April"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(depreciationForm).description]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(depreciationForm).notes = $event,
                        rows: "3",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(depreciationForm).notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: closeDepreciationModal,
                        class: "px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                      }, "Batal"),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(depreciationForm).processing,
                        class: "px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                      }, toDisplayString(unref(depreciationForm).processing ? "Menyimpan..." : "Simpan"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Equipment/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
