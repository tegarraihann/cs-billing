import { reactive, ref, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DXgDL1QY.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-COHQr_F5.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AutoLogoutTimer-hMhdGsqb.js";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    payables: Object,
    summary: Object,
    vendorSummary: Array,
    vendors: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const searchForm = reactive({
      search: props.filters.search || "",
      status: props.filters.status || "",
      vendor_id: props.filters.vendor_id || "",
      date_from: props.filters.date_from || "",
      date_to: props.filters.date_to || ""
    });
    const showPaymentModal = ref(false);
    const selectedPayable = ref(null);
    const processing = ref(false);
    const paymentForm = reactive({
      amount: "",
      payment_method: "",
      notes: ""
    });
    let debounceTimer = null;
    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyFilters();
      }, 500);
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.account-payables.index"), searchForm, {
        preserveState: true,
        replace: true
      });
    };
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const classes = {
        unpaid: "bg-red-100 text-red-800",
        partial: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        unpaid: "Unpaid",
        partial: "Partial",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const showPayable = (payable) => {
      router.visit(route("admin-keuangan.account-payables.show", payable.id));
    };
    const openPaymentModal = (payable) => {
      selectedPayable.value = payable;
      paymentForm.amount = "";
      paymentForm.payment_method = "";
      paymentForm.notes = "";
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      selectedPayable.value = null;
    };
    const markPayment = () => {
      processing.value = true;
      router.post(
        route("admin-keuangan.account-payables.mark-as-paid", selectedPayable.value.id),
        paymentForm,
        {
          onSuccess: () => {
            closePaymentModal();
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        }
      );
    };
    const visitPage = (url) => {
      router.visit(url, {
        preserveState: true,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, mergeProps({ title: "Manajemen Hutang" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto"${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Manajemen Hutang</h1></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"${_scopeId}><div class="bg-red-50 p-4 rounded-lg border border-red-200"${_scopeId}><div class="text-sm font-medium text-red-600"${_scopeId}>Total Outstanding</div><div class="text-2xl font-bold text-red-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_outstanding))}</div></div><div class="bg-orange-50 p-4 rounded-lg border border-orange-200"${_scopeId}><div class="text-sm font-medium text-orange-600"${_scopeId}>Total Overdue</div><div class="text-2xl font-bold text-orange-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_overdue))}</div></div><div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200"${_scopeId}><div class="text-sm font-medium text-yellow-600"${_scopeId}>Jumlah Overdue</div><div class="text-2xl font-bold text-yellow-900"${_scopeId}>${ssrInterpolate(__props.summary.count_overdue)} vendor </div></div><div class="bg-blue-50 p-4 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600"${_scopeId}>Unpaid Active</div><div class="text-2xl font-bold text-blue-900"${_scopeId}>${ssrInterpolate(__props.summary.count_unpaid)} vendor </div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Search</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Cari vendor atau service..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="unpaid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "unpaid") : ssrLooseEqual(searchForm.status, "unpaid")) ? " selected" : ""}${_scopeId}>Unpaid</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "partial") : ssrLooseEqual(searchForm.status, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "paid") : ssrLooseEqual(searchForm.status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Vendor</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, "") : ssrLooseEqual(searchForm.vendor_id, "")) ? " selected" : ""}${_scopeId}>Semua Vendor</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendor) => {
              _push2(`<option${ssrRenderAttr("value", vendor.id)}${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, vendor.id) : ssrLooseEqual(searchForm.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div></div></div>`);
            if (__props.vendorSummary && __props.vendorSummary.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ringkasan per Vendor</h2><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Vendor </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Jumlah Invoice </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Overdue </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.vendorSummary, (vendor) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(vendor.vendor_name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_paid))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><span class="${ssrRenderClass(vendor.total_outstanding > 0 ? "text-red-600" : "text-green-600")}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_outstanding))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"${_scopeId}>${ssrInterpolate(vendor.count_invoices)}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm"${_scopeId}>`);
                if (vendor.count_overdue > 0) {
                  _push2(`<span class="text-red-600 font-medium"${_scopeId}>${ssrInterpolate(vendor.count_overdue)}</span>`);
                } else {
                  _push2(`<span class="text-gray-400"${_scopeId}>0</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Service </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Invoice/SO </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.payables.data, (payable) => {
              var _a2;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = payable.vendor) == null ? void 0 : _a2.nama_vendor) || payable.vendor_name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payable.vendor_invoice_date ? formatDate(payable.vendor_invoice_date) : "-")}</div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(payable.service_description)}</div>`);
              if (payable.service_remarks) {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payable.service_remarks.substring(0, 50))}${ssrInterpolate(payable.service_remarks.length > 50 ? "..." : "")}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>`);
              if (payable.vendor_invoice_number) {
                _push2(`<div${_scopeId}> Invoice: ${ssrInterpolate(payable.vendor_invoice_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payable.sales_order) {
                _push2(`<div${_scopeId}> SO: ${ssrInterpolate(payable.sales_order.order_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.paid_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.outstanding_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId}><span class="${ssrRenderClass([getStatusClass(payable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(payable.status))} `);
              if (payable.days_overdue > 0) {
                _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(payable.days_overdue)} hari) </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"${_scopeId}><div class="flex items-center justify-center space-x-2"${_scopeId}><button class="text-blue-600 hover:text-blue-900" title="Lihat Detail"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></button>`);
              if (payable.status !== "paid") {
                _push2(`<button class="text-green-600 hover:text-green-900" title="Mark Payment"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.payables.from || 0)} to ${ssrInterpolate(__props.payables.to || 0)} of ${ssrInterpolate(__props.payables.total || 0)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.payables.links, (link) => {
              _push2(`<!--[-->`);
              if (link.url) {
                _push2(`<button class="${ssrRenderClass([
                  "px-3 py-2 text-sm rounded-md",
                  link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                ])}"${_scopeId}>${link.label ?? ""}</button>`);
              } else {
                _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Mark Payment</h3><div class="mb-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Vendor: ${ssrInterpolate(((_b = (_a = selectedPayable.value) == null ? void 0 : _a.vendor) == null ? void 0 : _b.nama_vendor) || ((_c = selectedPayable.value) == null ? void 0 : _c.vendor_name))}</p><p class="text-sm text-gray-600"${_scopeId}>Outstanding: Rp ${ssrInterpolate(formatNumber((_d = selectedPayable.value) == null ? void 0 : _d.outstanding_amount))}</p></div><form${_scopeId}><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount</label><input${ssrRenderAttr("value", paymentForm.amount)} type="number" step="0.01"${ssrRenderAttr("max", (_e = selectedPayable.value) == null ? void 0 : _e.outstanding_amount)} required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Method</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(paymentForm.payment_method) ? ssrLooseContain(paymentForm.payment_method, "") : ssrLooseEqual(paymentForm.payment_method, "")) ? " selected" : ""}${_scopeId}>Select Payment Method</option><option value="Transfer Bank"${ssrIncludeBooleanAttr(Array.isArray(paymentForm.payment_method) ? ssrLooseContain(paymentForm.payment_method, "Transfer Bank") : ssrLooseEqual(paymentForm.payment_method, "Transfer Bank")) ? " selected" : ""}${_scopeId}>Transfer Bank</option><option value="Cash"${ssrIncludeBooleanAttr(Array.isArray(paymentForm.payment_method) ? ssrLooseContain(paymentForm.payment_method, "Cash") : ssrLooseEqual(paymentForm.payment_method, "Cash")) ? " selected" : ""}${_scopeId}>Cash</option><option value="Check"${ssrIncludeBooleanAttr(Array.isArray(paymentForm.payment_method) ? ssrLooseContain(paymentForm.payment_method, "Check") : ssrLooseEqual(paymentForm.payment_method, "Check")) ? " selected" : ""}${_scopeId}>Check</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(paymentForm.payment_method) ? ssrLooseContain(paymentForm.payment_method, "Other") : ssrLooseEqual(paymentForm.payment_method, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>${ssrInterpolate(paymentForm.notes)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Processing..." : "Mark Payment")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Hutang")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-red-50 p-4 rounded-lg border border-red-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-red-600" }, "Total Outstanding"),
                      createVNode("div", { class: "text-2xl font-bold text-red-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_outstanding)), 1)
                    ]),
                    createVNode("div", { class: "bg-orange-50 p-4 rounded-lg border border-orange-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-orange-600" }, "Total Overdue"),
                      createVNode("div", { class: "text-2xl font-bold text-orange-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_overdue)), 1)
                    ]),
                    createVNode("div", { class: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-yellow-600" }, "Jumlah Overdue"),
                      createVNode("div", { class: "text-2xl font-bold text-yellow-900" }, toDisplayString(__props.summary.count_overdue) + " vendor ", 1)
                    ]),
                    createVNode("div", { class: "bg-blue-50 p-4 rounded-lg border border-blue-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-blue-600" }, "Unpaid Active"),
                      createVNode("div", { class: "text-2xl font-bold text-blue-900" }, toDisplayString(__props.summary.count_unpaid) + " vendor ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Search"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.search = $event,
                        type: "text",
                        placeholder: "Cari vendor atau service...",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onInput: debounceSearch
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => searchForm.status = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "unpaid" }, "Unpaid"),
                        createVNode("option", { value: "partial" }, "Partial"),
                        createVNode("option", { value: "paid" }, "Paid")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, searchForm.status]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => searchForm.vendor_id = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Semua Vendor"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendor) => {
                          return openBlock(), createBlock("option", {
                            key: vendor.id,
                            value: vendor.id
                          }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, searchForm.vendor_id]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dari Tanggal"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.date_from = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.date_from]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sampai Tanggal"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.date_to = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.date_to]
                      ])
                    ])
                  ])
                ]),
                __props.vendorSummary && __props.vendorSummary.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ringkasan per Vendor"),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Total Amount "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Total Paid "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Total Outstanding "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Jumlah Invoice "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Overdue ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.vendorSummary, (vendor) => {
                          return openBlock(), createBlock("tr", {
                            key: vendor.vendor_id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(vendor.vendor_name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(vendor.total_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-green-600" }, " Rp " + toDisplayString(formatNumber(vendor.total_paid)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                              createVNode("span", {
                                class: vendor.total_outstanding > 0 ? "text-red-600" : "text-green-600"
                              }, " Rp " + toDisplayString(formatNumber(vendor.total_outstanding)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900" }, toDisplayString(vendor.count_invoices), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                              vendor.count_overdue > 0 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-red-600 font-medium"
                              }, toDisplayString(vendor.count_overdue), 1)) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-gray-400"
                              }, "0"))
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Service "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Invoice/SO "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.payables.data, (payable) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: payable.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a2 = payable.vendor) == null ? void 0 : _a2.nama_vendor) || payable.vendor_name), 1),
                              createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(payable.vendor_invoice_date ? formatDate(payable.vendor_invoice_date) : "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(payable.service_description), 1),
                              payable.service_remarks ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-sm text-gray-500"
                              }, toDisplayString(payable.service_remarks.substring(0, 50)) + toDisplayString(payable.service_remarks.length > 50 ? "..." : ""), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, [
                                payable.vendor_invoice_number ? (openBlock(), createBlock("div", { key: 0 }, " Invoice: " + toDisplayString(payable.vendor_invoice_number), 1)) : createCommentVNode("", true),
                                payable.sales_order ? (openBlock(), createBlock("div", { key: 1 }, " SO: " + toDisplayString(payable.sales_order.order_number), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.paid_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.outstanding_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                              createVNode("span", {
                                class: [getStatusClass(payable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                              }, [
                                createTextVNode(toDisplayString(getStatusText(payable.status)) + " ", 1),
                                payable.days_overdue > 0 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "ml-1"
                                }, " (" + toDisplayString(payable.days_overdue) + " hari) ", 1)) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => showPayable(payable),
                                  class: "text-blue-600 hover:text-blue-900",
                                  title: "Lihat Detail"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ]))
                                ], 8, ["onClick"]),
                                payable.status !== "paid" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => openPaymentModal(payable),
                                  class: "text-green-600 hover:text-green-900",
                                  title: "Mark Payment"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    })
                                  ]))
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.payables.from || 0) + " to " + toDisplayString(__props.payables.to || 0) + " of " + toDisplayString(__props.payables.total || 0) + " results ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.payables.links, (link) => {
                          return openBlock(), createBlock(Fragment, {
                            key: link.label
                          }, [
                            link.url ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => visitPage(link.url),
                              class: [
                                "px-3 py-2 text-sm rounded-md",
                                link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                              ],
                              innerHTML: link.label
                            }, null, 10, ["onClick", "innerHTML"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "px-3 py-2 text-sm text-gray-400",
                              innerHTML: link.label
                            }, null, 8, ["innerHTML"]))
                          ], 64);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]),
              showPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
              }, [
                createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                  createVNode("div", { class: "mt-3" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Mark Payment"),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, "Vendor: " + toDisplayString(((_g = (_f = selectedPayable.value) == null ? void 0 : _f.vendor) == null ? void 0 : _g.nama_vendor) || ((_h = selectedPayable.value) == null ? void 0 : _h.vendor_name)), 1),
                      createVNode("p", { class: "text-sm text-gray-600" }, "Outstanding: Rp " + toDisplayString(formatNumber((_i = selectedPayable.value) == null ? void 0 : _i.outstanding_amount)), 1)
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(markPayment, ["prevent"])
                    }, [
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => paymentForm.amount = $event,
                          type: "number",
                          step: "0.01",
                          max: (_j = selectedPayable.value) == null ? void 0 : _j.outstanding_amount,
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue", "max"]), [
                          [vModelText, paymentForm.amount]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Method"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => paymentForm.payment_method = $event,
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, [
                          createVNode("option", { value: "" }, "Select Payment Method"),
                          createVNode("option", { value: "Transfer Bank" }, "Transfer Bank"),
                          createVNode("option", { value: "Cash" }, "Cash"),
                          createVNode("option", { value: "Check" }, "Check"),
                          createVNode("option", { value: "Other" }, "Other")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, paymentForm.payment_method]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => paymentForm.notes = $event,
                          rows: "3",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.notes]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closePaymentModal,
                          class: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        }, " Cancel "),
                        createVNode("button", {
                          type: "submit",
                          disabled: processing.value,
                          class: "px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                        }, toDisplayString(processing.value ? "Processing..." : "Mark Payment"), 9, ["disabled"])
                      ])
                    ], 32)
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountPayables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
