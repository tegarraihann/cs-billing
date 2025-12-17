import { computed, reactive, watch, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BDTNgS_F.js";
import { useForm, Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Edit, CheckCircle, Clock, Calendar, Tag, FileText, DollarSign, MessageSquare, Paperclip, XCircle, Trash2 } from "lucide-vue-next";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    otherIncome: Object,
    bankAccounts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const paymentForm = useForm({
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_method: "bank",
      bank_account_id: "",
      amount: "",
      adjustment_amount: "",
      adjustment_type: "",
      notes: ""
    });
    const bankOptions = computed(() => props.bankAccounts ?? []);
    const outstandingAmount = computed(() => Number(props.otherIncome.outstanding_amount || 0));
    const canRecordPayment = computed(() => outstandingAmount.value > 0);
    const isPaymentDisabled = computed(() => {
      if (paymentForm.processing) return true;
      if (!paymentForm.payment_date || !paymentForm.payment_method || !paymentForm.amount) return true;
      if (paymentForm.payment_method === "bank" && !paymentForm.bank_account_id) return true;
      if (parseFloat(paymentForm.amount) <= 0) return true;
      return false;
    });
    const alertDialog = reactive({
      show: false,
      type: "confirm",
      title: "",
      message: "",
      onConfirm: null
    });
    const openConfirm = (message, onConfirm, title = "Konfirmasi") => {
      alertDialog.show = true;
      alertDialog.type = "confirm";
      alertDialog.title = title;
      alertDialog.message = message;
      alertDialog.onConfirm = onConfirm;
    };
    const closeAlert = () => {
      alertDialog.show = false;
      alertDialog.onConfirm = null;
    };
    const handleAlertConfirm = () => {
      if (alertDialog.onConfirm) {
        alertDialog.onConfirm();
      }
      closeAlert();
    };
    watch(
      () => paymentForm.payment_method,
      (method) => {
        if (method !== "bank") {
          paymentForm.bank_account_id = "";
        }
      }
    );
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(amount || 0);
    };
    const formatStatus = (status) => {
      if (!status) return "-";
      return status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
    };
    const receivableStatusBadge = (status) => {
      switch (status) {
        case "paid":
          return "bg-green-100 text-green-800";
        case "partial":
          return "bg-blue-100 text-blue-800";
        default:
          return "bg-yellow-100 text-yellow-800";
      }
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateTime) => {
      if (!dateTime) return "-";
      return new Date(dateTime).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getCategoryBadge = (category) => {
      const badges = {
        "Bunga Bank Mandiri": "bg-blue-100 text-blue-800",
        "Bunga Bank BCA": "bg-purple-100 text-purple-800",
        "Lainnya": "bg-gray-100 text-gray-800"
      };
      return badges[category] || "bg-gray-100 text-gray-800";
    };
    const recordPayment = () => {
      const amount = parseFloat(paymentForm.amount || 0);
      const adj = parseFloat(paymentForm.adjustment_amount || 0);
      if (amount + adj - 0.01 > outstandingAmount.value) {
        openConfirm(
          "Total pembayaran + adjustment melebihi outstanding. Periksa kembali nominalnya.",
          () => closeAlert(),
          "Validasi Pembayaran"
        );
        return;
      }
      paymentForm.post(route("admin-keuangan.other-incomes.record-payment", props.otherIncome.id), {
        preserveScroll: true,
        onSuccess: () => {
          paymentForm.reset({
            payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
            payment_method: "bank",
            bank_account_id: "",
            amount: "",
            adjustment_amount: "",
            adjustment_type: "",
            notes: ""
          });
        }
      });
    };
    const postToProfitLoss = () => {
      openConfirm(
        "Posting pendapatan ini ke Laba Rugi?",
        () => router.post(route("admin-keuangan.other-incomes.post-to-profit-loss", props.otherIncome.id))
      );
    };
    const unpostFromProfitLoss = () => {
      openConfirm(
        "Unpost pendapatan ini dari Laba Rugi?",
        () => router.post(route("admin-keuangan.other-incomes.unpost-from-profit-loss", props.otherIncome.id))
      );
    };
    const deleteIncome = () => {
      openConfirm(
        "Apakah Anda yakin ingin menghapus pendapatan ini?",
        () => router.delete(route("admin-keuangan.other-incomes.destroy", props.otherIncome.id)),
        "Hapus Pendapatan"
      );
    };
    const paymentMethodLabel = (method) => {
      return method === "petty_cash" ? "Petty Cash" : "Transfer Bank";
    };
    const adjustmentLabel = (type) => {
      if (type === "tax_expense") return "Beban Pajak";
      if (type === "other_expense") return "Beban Lain-lain";
      return "-";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Pendapatan Lain-lain" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AlertDialog, {
              show: alertDialog.show,
              type: alertDialog.type,
              title: alertDialog.title,
              message: alertDialog.message,
              "confirm-text": "Ya, lanjutkan",
              "cancel-text": "Batal",
              onConfirm: handleAlertConfirm,
              onClose: closeAlert
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}>`);
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
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Pendapatan Lain-lain</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Informasi lengkap pendapatan</p></div></div><div class="flex space-x-2"${_scopeId}>`);
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.other-incomes.edit", __props.otherIncome.id),
                class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit `);
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="mb-6"${_scopeId}><span class="${ssrRenderClass([__props.otherIncome.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"])}"${_scopeId}>`);
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Clock), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(__props.otherIncome.posted_to_profit_loss ? "Posted ke Laba Rugi" : "Pending")}</span></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"${_scopeId}><div class="bg-white border border-sage-200 rounded-lg p-4"${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wider"${_scopeId}>Outstanding</p><p class="text-xl font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.otherIncome.outstanding_amount))}</p></div><div class="bg-white border border-sage-200 rounded-lg p-4"${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wider"${_scopeId}>Status Piutang</p><span class="${ssrRenderClass(["inline-flex px-2 py-1 text-xs font-semibold rounded-full", receivableStatusBadge(__props.otherIncome.status)])}"${_scopeId}>${ssrInterpolate(formatStatus(__props.otherIncome.status))}</span></div><div class="bg-white border border-sage-200 rounded-lg p-4"${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wider"${_scopeId}>Jatuh Tempo</p><p class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.otherIncome.due_date ? formatDate(__props.otherIncome.due_date) : "-")}</p></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:px-6 bg-sage-50"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Pendapatan</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Tanggal </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium"${_scopeId}>${ssrInterpolate(formatDate(__props.otherIncome.transaction_date))}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Nomor Referensi</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.reference_number || "-")}</dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Customer</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.customer_name || ((_a = __props.otherIncome.customer) == null ? void 0 : _a.company_name) || "-")}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Kategori </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}><span class="${ssrRenderClass([getCategoryBadge(__props.otherIncome.category), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.otherIncome.category)}</span></dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Outstanding Sekarang</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium"${_scopeId}>${ssrInterpolate(formatCurrency(__props.otherIncome.outstanding_amount))}</dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Deskripsi </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.description)}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Jumlah </dt><dd class="mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency(__props.otherIncome.amount))}</dd></div>`);
            if (__props.otherIncome.notes) {
              _push2(`<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
              _push2(` Catatan </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.notes)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.otherIncome.receipt_file) {
              _push2(`<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Paperclip), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
              _push2(` Bukti Pendapatan </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.otherIncome.receipt_file}`)} target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Lihat File </a></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:px-6 bg-gray-50"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Audit</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Dibuat Oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_b = __props.otherIncome.creator) == null ? void 0 : _b.name) || "-")} <span class="text-gray-500 ml-2"${_scopeId}>${ssrInterpolate(formatDateTime(__props.otherIncome.created_at))}</span></dd></div>`);
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(`<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Di-post ke Laba Rugi Oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_c = __props.otherIncome.approver) == null ? void 0 : _c.name) || "-")} <span class="text-gray-500 ml-2"${_scopeId}>${ssrInterpolate(formatDateTime(__props.otherIncome.posted_at))}</span></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:px-6 flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Pembayaran Piutang</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Catat penerimaan kas untuk pendapatan ini.</p></div>`);
            if (!canRecordPayment.value) {
              _push2(`<span class="text-xs text-gray-500"${_scopeId}>Piutang sudah lunas</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="border-t border-gray-200"${_scopeId}><div class="p-4 space-y-6"${_scopeId}>`);
            if ((_d = __props.otherIncome.payments) == null ? void 0 : _d.length) {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Tanggal</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Metode</th><th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Jumlah</th><th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Adjustment</th><th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Catatan</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.otherIncome.payments, (payment) => {
                _push2(`<tr${_scopeId}><td class="px-4 py-2 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(payment.payment_date))}</td><td class="px-4 py-2 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(paymentMethodLabel(payment.payment_method))} `);
                if (payment.bank_account) {
                  _push2(`<div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(payment.bank_account.bank_name)} - ${ssrInterpolate(payment.bank_account.account_number)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-4 py-2 text-sm text-gray-900 text-right"${_scopeId}>${ssrInterpolate(formatCurrency(payment.amount))}</td><td class="px-4 py-2 text-sm text-gray-900 text-right"${_scopeId}><div${_scopeId}>${ssrInterpolate(formatCurrency(payment.adjustment_amount))}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(adjustmentLabel(payment.adjustment_type))}</div></td><td class="px-4 py-2 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(payment.notes || "-")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500"${_scopeId}>Belum ada pembayaran yang tercatat.</div>`);
            }
            if (canRecordPayment.value) {
              _push2(`<form class="space-y-4 border-t border-gray-200 pt-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Tanggal Pembayaran</label><input${ssrRenderAttr("value", unref(paymentForm).payment_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Metode Pembayaran</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "bank") : ssrLooseEqual(unref(paymentForm).payment_method, "bank")) ? " selected" : ""}${_scopeId}>Transfer Bank</option><option value="petty_cash"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "petty_cash") : ssrLooseEqual(unref(paymentForm).payment_method, "petty_cash")) ? " selected" : ""}${_scopeId}>Petty Cash</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Jumlah Pembayaran</label><input${ssrRenderAttr("value", unref(paymentForm).amount)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}></div></div>`);
              if (unref(paymentForm).payment_method === "bank") {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Akun Bank</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).bank_account_id) ? ssrLooseContain(unref(paymentForm).bank_account_id, "") : ssrLooseEqual(unref(paymentForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Pilih Akun Bank</option><!--[-->`);
                ssrRenderList(bankOptions.value, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).bank_account_id) ? ssrLooseContain(unref(paymentForm).bank_account_id, bank.id) : ssrLooseEqual(unref(paymentForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
                });
                _push2(`<!--]--></select></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Adjustment</label><div class="flex space-x-2"${_scopeId}><input${ssrRenderAttr("value", unref(paymentForm).adjustment_amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"${_scopeId}><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).adjustment_type) ? ssrLooseContain(unref(paymentForm).adjustment_type, "") : ssrLooseEqual(unref(paymentForm).adjustment_type, "")) ? " selected" : ""}${_scopeId}>-</option><option value="tax_expense"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).adjustment_type) ? ssrLooseContain(unref(paymentForm).adjustment_type, "tax_expense") : ssrLooseEqual(unref(paymentForm).adjustment_type, "tax_expense")) ? " selected" : ""}${_scopeId}>Beban Pajak</option><option value="other_expense"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).adjustment_type) ? ssrLooseContain(unref(paymentForm).adjustment_type, "other_expense") : ssrLooseEqual(unref(paymentForm).adjustment_type, "other_expense")) ? " selected" : ""}${_scopeId}>Beban Lain-lain</option></select></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Catatan</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"${_scopeId}>${ssrInterpolate(unref(paymentForm).notes)}</textarea></div></div><div class="flex justify-end"${_scopeId}><button type="submit" class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(isPaymentDisabled.value) ? " disabled" : ""}${_scopeId}> Catat Pembayaran </button></div></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Aksi</h3><div class="flex flex-wrap gap-3"${_scopeId}>`);
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Post ke Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(XCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Unpost dari Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Hapus Pendapatan </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Pendapatan Lain-lain" }),
              createVNode(AlertDialog, {
                show: alertDialog.show,
                type: alertDialog.type,
                title: alertDialog.title,
                message: alertDialog.message,
                "confirm-text": "Ya, lanjutkan",
                "cancel-text": "Batal",
                onConfirm: handleAlertConfirm,
                onClose: closeAlert
              }, null, 8, ["show", "type", "title", "message"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.other-incomes.index"),
                          class: "text-sage-600 hover:text-sage-800 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Pendapatan Lain-lain"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Informasi lengkap pendapatan")
                        ])
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("admin-keuangan.other-incomes.edit", __props.otherIncome.id),
                          class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("span", {
                      class: [__props.otherIncome.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"]
                    }, [
                      __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock(unref(CheckCircle), {
                        key: 0,
                        class: "w-4 h-4 mr-2"
                      })) : (openBlock(), createBlock(unref(Clock), {
                        key: 1,
                        class: "w-4 h-4 mr-2"
                      })),
                      createTextVNode(" " + toDisplayString(__props.otherIncome.posted_to_profit_loss ? "Posted ke Laba Rugi" : "Pending"), 1)
                    ], 2)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg p-4" }, [
                      createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wider" }, "Outstanding"),
                      createVNode("p", { class: "text-xl font-semibold text-gray-900" }, toDisplayString(formatCurrency(__props.otherIncome.outstanding_amount)), 1)
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg p-4" }, [
                      createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wider" }, "Status Piutang"),
                      createVNode("span", {
                        class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", receivableStatusBadge(__props.otherIncome.status)]
                      }, toDisplayString(formatStatus(__props.otherIncome.status)), 3)
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg p-4" }, [
                      createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wider" }, "Jatuh Tempo"),
                      createVNode("p", { class: "text-sm font-medium text-gray-900" }, toDisplayString(__props.otherIncome.due_date ? formatDate(__props.otherIncome.due_date) : "-"), 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Pendapatan")
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("dl", null, [
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Tanggal ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium" }, toDisplayString(formatDate(__props.otherIncome.transaction_date)), 1)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Nomor Referensi"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.reference_number || "-"), 1)
                        ]),
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Customer"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.customer_name || ((_e = __props.otherIncome.customer) == null ? void 0 : _e.company_name) || "-"), 1)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Tag), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Kategori ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createVNode("span", {
                              class: ["inline-flex px-3 py-1 text-sm font-semibold rounded-full", getCategoryBadge(__props.otherIncome.category)]
                            }, toDisplayString(__props.otherIncome.category), 3)
                          ])
                        ]),
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Outstanding Sekarang"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium" }, toDisplayString(formatCurrency(__props.otherIncome.outstanding_amount)), 1)
                        ]),
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(FileText), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Deskripsi ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.description), 1)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(DollarSign), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Jumlah ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency(__props.otherIncome.amount)), 1)
                        ]),
                        __props.otherIncome.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(MessageSquare), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Catatan ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.notes), 1)
                        ])) : createCommentVNode("", true),
                        __props.otherIncome.receipt_file ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Paperclip), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Bukti Pendapatan ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createVNode("a", {
                              href: `/storage/${__props.otherIncome.receipt_file}`,
                              target: "_blank",
                              class: "inline-flex items-center text-sage-600 hover:text-sage-800"
                            }, [
                              createVNode(unref(FileText), { class: "w-4 h-4 mr-1" }),
                              createTextVNode(" Lihat File ")
                            ], 8, ["href"])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 bg-gray-50" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Audit")
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("dl", null, [
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Dibuat Oleh"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createTextVNode(toDisplayString(((_f = __props.otherIncome.creator) == null ? void 0 : _f.name) || "-") + " ", 1),
                            createVNode("span", { class: "text-gray-500 ml-2" }, toDisplayString(formatDateTime(__props.otherIncome.created_at)), 1)
                          ])
                        ]),
                        __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Di-post ke Laba Rugi Oleh"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createTextVNode(toDisplayString(((_g = __props.otherIncome.approver) == null ? void 0 : _g.name) || "-") + " ", 1),
                            createVNode("span", { class: "text-gray-500 ml-2" }, toDisplayString(formatDateTime(__props.otherIncome.posted_at)), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Pembayaran Piutang"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Catat penerimaan kas untuk pendapatan ini.")
                      ]),
                      !canRecordPayment.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-xs text-gray-500"
                      }, "Piutang sudah lunas")) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("div", { class: "p-4 space-y-6" }, [
                        ((_h = __props.otherIncome.payments) == null ? void 0 : _h.length) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "overflow-x-auto"
                        }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tanggal"),
                                createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Metode"),
                                createVNode("th", { class: "px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Jumlah"),
                                createVNode("th", { class: "px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Adjustment"),
                                createVNode("th", { class: "px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Catatan")
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.otherIncome.payments, (payment) => {
                                return openBlock(), createBlock("tr", {
                                  key: payment.id
                                }, [
                                  createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, toDisplayString(formatDate(payment.payment_date)), 1),
                                  createVNode("td", { class: "px-4 py-2 text-sm text-gray-900" }, [
                                    createTextVNode(toDisplayString(paymentMethodLabel(payment.payment_method)) + " ", 1),
                                    payment.bank_account ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-gray-500"
                                    }, toDisplayString(payment.bank_account.bank_name) + " - " + toDisplayString(payment.bank_account.account_number), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("td", { class: "px-4 py-2 text-sm text-gray-900 text-right" }, toDisplayString(formatCurrency(payment.amount)), 1),
                                  createVNode("td", { class: "px-4 py-2 text-sm text-gray-900 text-right" }, [
                                    createVNode("div", null, toDisplayString(formatCurrency(payment.adjustment_amount)), 1),
                                    createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(adjustmentLabel(payment.adjustment_type)), 1)
                                  ]),
                                  createVNode("td", { class: "px-4 py-2 text-sm text-gray-600" }, toDisplayString(payment.notes || "-"), 1)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-sm text-gray-500"
                        }, "Belum ada pembayaran yang tercatat.")),
                        canRecordPayment.value ? (openBlock(), createBlock("form", {
                          key: 2,
                          onSubmit: withModifiers(recordPayment, ["prevent"]),
                          class: "space-y-4 border-t border-gray-200 pt-4"
                        }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal Pembayaran"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(paymentForm).payment_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(paymentForm).payment_date]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Metode Pembayaran"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(paymentForm).payment_method = $event,
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm",
                                required: ""
                              }, [
                                createVNode("option", { value: "bank" }, "Transfer Bank"),
                                createVNode("option", { value: "petty_cash" }, "Petty Cash")
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(paymentForm).payment_method]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Jumlah Pembayaran"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(paymentForm).amount = $event,
                                type: "number",
                                step: "0.01",
                                min: "0.01",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(paymentForm).amount]
                              ])
                            ])
                          ]),
                          unref(paymentForm).payment_method === "bank" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-1 md:grid-cols-2 gap-4"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Akun Bank"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(paymentForm).bank_account_id = $event,
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm",
                                required: ""
                              }, [
                                createVNode("option", { value: "" }, "Pilih Akun Bank"),
                                (openBlock(true), createBlock(Fragment, null, renderList(bankOptions.value, (bank) => {
                                  return openBlock(), createBlock("option", {
                                    key: bank.id,
                                    value: bank.id
                                  }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                                }), 128))
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(paymentForm).bank_account_id]
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Adjustment"),
                              createVNode("div", { class: "flex space-x-2" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(paymentForm).adjustment_amount = $event,
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(paymentForm).adjustment_amount]
                                ]),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => unref(paymentForm).adjustment_type = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                }, [
                                  createVNode("option", { value: "" }, "-"),
                                  createVNode("option", { value: "tax_expense" }, "Beban Pajak"),
                                  createVNode("option", { value: "other_expense" }, "Beban Lain-lain")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, unref(paymentForm).adjustment_type]
                                ])
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(paymentForm).notes = $event,
                                rows: "2",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(paymentForm).notes]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end" }, [
                            createVNode("button", {
                              type: "submit",
                              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed",
                              disabled: isPaymentDisabled.value
                            }, " Catat Pembayaran ", 8, ["disabled"])
                          ])
                        ], 32)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Aksi"),
                      createVNode("div", { class: "flex flex-wrap gap-3" }, [
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: postToProfitLoss,
                          class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"
                        }, [
                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Post ke Laba Rugi ")
                        ])) : createCommentVNode("", true),
                        __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: unpostFromProfitLoss,
                          class: "inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"
                        }, [
                          createVNode(unref(XCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Unpost dari Laba Rugi ")
                        ])) : createCommentVNode("", true),
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: deleteIncome,
                          class: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                        }, [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Hapus Pendapatan ")
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OtherIncomes/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
