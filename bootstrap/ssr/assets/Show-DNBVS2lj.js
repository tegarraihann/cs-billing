import { ref, reactive, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DXgDL1QY.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-COHQr_F5.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AutoLogoutTimer-hMhdGsqb.js";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    receivable: Object
  },
  setup(__props) {
    const props = __props;
    const showPaymentModal = ref(false);
    const processing = ref(false);
    const paymentForm = reactive({
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      notes: ""
    });
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (datetime) => {
      return new Date(datetime).toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusClass = (status) => {
      const classes = {
        outstanding: "bg-yellow-100 text-yellow-800",
        partial: "bg-blue-100 text-blue-800",
        overdue: "bg-red-100 text-red-800",
        paid: "bg-green-100 text-green-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        outstanding: "Outstanding",
        partial: "Partial Payment",
        overdue: "Overdue",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const getInvoiceStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const goBack = () => {
      router.visit(route("admin-keuangan.account-receivables.index"));
    };
    const openPaymentModal = () => {
      paymentForm.amount = "";
      paymentForm.notes = "";
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
    };
    const recordPayment = () => {
      processing.value = true;
      router.post(
        route("admin-keuangan.account-receivables.record-payment", props.receivable.id),
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
    const generateSOA = () => {
      if (!props.receivable.customer) {
        alert("Customer information not available");
        return;
      }
      window.open(
        route("admin-keuangan.account-receivables.generate-soa", props.receivable.customer.id),
        "_blank"
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, mergeProps({ title: "Detail Piutang" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="max-w-4xl mx-auto"${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><button class="text-gray-400 hover:text-gray-600"${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg></button><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Piutang</h1></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([getStatusClass(__props.receivable.status), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.receivable.status))} `);
            if (__props.receivable.days_overdue > 0) {
              _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(__props.receivable.days_overdue)} hari overdue) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (__props.receivable.status !== "paid") {
              _push2(`<button class="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"${_scopeId}> Record Payment </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.customer) {
              _push2(`<button class="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"${_scopeId}> Generate SOA </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Informasi Invoice</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Invoice Number</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.invoice_number)}</p></div><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Invoice Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.invoice_date))}</p></div>`);
            if (__props.receivable.due_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Due Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.due_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.payment_terms_days) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Terms</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.payment_terms_days)} hari</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>SO Number</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.receivable.sales_order) == null ? void 0 : _a.order_number) || "-")}</p></div>`);
            if (__props.receivable.last_payment_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Last Payment</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.receivable.last_payment_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.creator) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Created By</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.creator.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Informasi Customer</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Company Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_b = __props.receivable.customer) == null ? void 0 : _b.company_name) || __props.receivable.customer_name)}</p></div>`);
            if ((_c = __props.receivable.customer) == null ? void 0 : _c.address) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Address</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.address)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}>`);
            if ((_d = __props.receivable.customer) == null ? void 0 : _d.pic_name) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_e = __props.receivable.customer) == null ? void 0 : _e.pic_phone) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Phone</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_phone)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_f = __props.receivable.customer) == null ? void 0 : _f.pic_email) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Email</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_email)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ringkasan Keuangan</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-blue-50 p-4 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600 mb-1"${_scopeId}>Invoice Amount</div><div class="text-xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.invoice_amount))}</div></div><div class="bg-green-50 p-4 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600 mb-1"${_scopeId}>Paid Amount</div><div class="text-xl font-bold text-green-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.paid_amount))}</div></div><div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200"${_scopeId}><div class="text-sm font-medium text-yellow-600 mb-1"${_scopeId}>Outstanding Amount</div><div class="text-xl font-bold text-yellow-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.outstanding_amount))}</div></div></div></div>`);
            if (__props.receivable.notes) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Notes</h2><div class="bg-gray-50 p-4 rounded-md"${_scopeId}><p class="text-sm text-gray-700 whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.receivable.notes)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.invoice) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Related Invoice</h2><div class="border border-gray-200 rounded-lg p-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.invoice.invoice_number)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.invoice.invoice_date))}</p></div><div class="text-right"${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.receivable.invoice.total))}</p><span class="${ssrRenderClass([getInvoiceStatusClass(__props.receivable.invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.receivable.invoice.status)}</span></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Record Payment</h3><div class="mb-4 bg-gray-50 p-3 rounded-md"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Invoice: ${ssrInterpolate(__props.receivable.invoice_number)}</p><p class="text-sm text-gray-600"${_scopeId}>Outstanding: Rp ${ssrInterpolate(formatNumber(__props.receivable.outstanding_amount))}</p></div><form${_scopeId}><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", paymentForm.amount)} type="number" step="0.01"${ssrRenderAttr("max", __props.receivable.outstanding_amount)} required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter payment amount"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Date *</label><input${ssrRenderAttr("value", paymentForm.payment_date)} type="date" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Payment notes (optional)"${_scopeId}>${ssrInterpolate(paymentForm.notes)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Recording..." : "Record Payment")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "max-w-4xl mx-auto" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("button", {
                        onClick: goBack,
                        class: "text-gray-400 hover:text-gray-600"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                          })
                        ]))
                      ]),
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Piutang")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("span", {
                        class: [getStatusClass(__props.receivable.status), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"]
                      }, [
                        createTextVNode(toDisplayString(getStatusText(__props.receivable.status)) + " ", 1),
                        __props.receivable.days_overdue > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1"
                        }, " (" + toDisplayString(__props.receivable.days_overdue) + " hari overdue) ", 1)) : createCommentVNode("", true)
                      ], 2),
                      __props.receivable.status !== "paid" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: openPaymentModal,
                        class: "bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                      }, " Record Payment ")) : createCommentVNode("", true),
                      __props.receivable.customer ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: generateSOA,
                        class: "bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
                      }, " Generate SOA ")) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Informasi Invoice"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Invoice Number"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.invoice_number), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Invoice Date"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(__props.receivable.invoice_date)), 1)
                        ]),
                        __props.receivable.due_date ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Due Date"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(__props.receivable.due_date)), 1)
                        ])) : createCommentVNode("", true),
                        __props.receivable.payment_terms_days ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Terms"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.payment_terms_days) + " hari", 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "SO Number"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(((_g = __props.receivable.sales_order) == null ? void 0 : _g.order_number) || "-"), 1)
                        ]),
                        __props.receivable.last_payment_date ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Last Payment"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.receivable.last_payment_date)), 1)
                        ])) : createCommentVNode("", true),
                        __props.receivable.creator ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Created By"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.creator.name), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Informasi Customer"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Company Name"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(((_h = __props.receivable.customer) == null ? void 0 : _h.company_name) || __props.receivable.customer_name), 1)
                        ]),
                        ((_i = __props.receivable.customer) == null ? void 0 : _i.address) ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Address"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.address), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "space-y-3" }, [
                        ((_j = __props.receivable.customer) == null ? void 0 : _j.pic_name) ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Name"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_name), 1)
                        ])) : createCommentVNode("", true),
                        ((_k = __props.receivable.customer) == null ? void 0 : _k.pic_phone) ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Phone"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_phone), 1)
                        ])) : createCommentVNode("", true),
                        ((_l = __props.receivable.customer) == null ? void 0 : _l.pic_email) ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Email"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_email), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ringkasan Keuangan"),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "bg-blue-50 p-4 rounded-lg border border-blue-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-blue-600 mb-1" }, "Invoice Amount"),
                      createVNode("div", { class: "text-xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.invoice_amount)), 1)
                    ]),
                    createVNode("div", { class: "bg-green-50 p-4 rounded-lg border border-green-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-green-600 mb-1" }, "Paid Amount"),
                      createVNode("div", { class: "text-xl font-bold text-green-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.paid_amount)), 1)
                    ]),
                    createVNode("div", { class: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-yellow-600 mb-1" }, "Outstanding Amount"),
                      createVNode("div", { class: "text-xl font-bold text-yellow-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.outstanding_amount)), 1)
                    ])
                  ])
                ]),
                __props.receivable.notes ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Notes"),
                  createVNode("div", { class: "bg-gray-50 p-4 rounded-md" }, [
                    createVNode("p", { class: "text-sm text-gray-700 whitespace-pre-line" }, toDisplayString(__props.receivable.notes), 1)
                  ])
                ])) : createCommentVNode("", true),
                __props.receivable.invoice ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-white rounded-lg shadow-sm p-6"
                }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Related Invoice"),
                  createVNode("div", { class: "border border-gray-200 rounded-lg p-4" }, [
                    createVNode("div", { class: "flex justify-between items-center" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(__props.receivable.invoice.invoice_number), 1),
                        createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(__props.receivable.invoice.invoice_date)), 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "font-medium text-gray-900" }, "Rp " + toDisplayString(formatNumber(__props.receivable.invoice.total)), 1),
                        createVNode("span", {
                          class: [getInvoiceStatusClass(__props.receivable.invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                        }, toDisplayString(__props.receivable.invoice.status), 3)
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              showPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
              }, [
                createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                  createVNode("div", { class: "mt-3" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Record Payment"),
                    createVNode("div", { class: "mb-4 bg-gray-50 p-3 rounded-md" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, "Invoice: " + toDisplayString(__props.receivable.invoice_number), 1),
                      createVNode("p", { class: "text-sm text-gray-600" }, "Outstanding: Rp " + toDisplayString(formatNumber(__props.receivable.outstanding_amount)), 1)
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(recordPayment, ["prevent"])
                    }, [
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => paymentForm.amount = $event,
                          type: "number",
                          step: "0.01",
                          max: __props.receivable.outstanding_amount,
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                          placeholder: "Enter payment amount"
                        }, null, 8, ["onUpdate:modelValue", "max"]), [
                          [vModelText, paymentForm.amount]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Date *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => paymentForm.payment_date = $event,
                          type: "date",
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.payment_date]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => paymentForm.notes = $event,
                          rows: "3",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                          placeholder: "Payment notes (optional)"
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
                        }, toDisplayString(processing.value ? "Recording..." : "Record Payment"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountReceivables/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
