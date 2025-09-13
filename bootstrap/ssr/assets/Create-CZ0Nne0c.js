import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, Fragment, renderList, toDisplayString, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-yyCbRIkG.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-egdkIpsX.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    salesOrders: Array,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.store": "/admin-keuangan/invoices"
      };
      return routes[name] || "#";
    };
    const form = useForm({
      sales_order_id: "",
      invoice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      term_days: 30,
      shipper: "",
      consignee: "",
      awb_bl_no: "",
      mawb_obl_no: "",
      gross_weight: "",
      volume: "",
      no_of_packages: "",
      vessel: "",
      flight_voy: "",
      pol_pod: "",
      origin: "",
      destination: "",
      etd: "",
      eta: "",
      container_no: "",
      container_size: "",
      remarks: "",
      items: [
        {
          description: "",
          quantity: 1,
          unit: "SET",
          rate: 0,
          currency: "IDR",
          amount: 0
        }
      ]
    });
    const loadSalesOrderData = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder) {
        form.consignee = selectedOrder.customer || selectedOrder.customer_name || "";
        form.shipper = selectedOrder.shipper || "";
        form.vessel = selectedOrder.vessel || "";
        form.awb_bl_no = selectedOrder.bl_awb || selectedOrder.awb_bl_number || "";
        form.pol_pod = selectedOrder.pol_pod || "";
        form.origin = selectedOrder.pol || "";
        form.destination = selectedOrder.pod || "";
        if (selectedOrder.eta) {
          form.eta = selectedOrder.eta;
        }
      }
    };
    const addItem = () => {
      form.items.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0
      });
    };
    const removeItem = (index) => {
      form.items.splice(index, 1);
    };
    const calculateAmount = (index) => {
      const item = form.items[index];
      item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    };
    const calculateTotal = () => {
      return form.items.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const submit = () => {
      form.post(route("admin-keuangan.invoices.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-2e1b7ac8${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><div class="flex items-center justify-between" data-v-2e1b7ac8${_scopeId}><div data-v-2e1b7ac8${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-2e1b7ac8${_scopeId}>Buat Invoice Baru</h2><p class="text-sage-600" data-v-2e1b7ac8${_scopeId}>Buat invoice dari sales order yang telah disetujui</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2e1b7ac8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-2e1b7ac8${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
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
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><form class="space-y-6" data-v-2e1b7ac8${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2e1b7ac8${_scopeId}>Pilih Sales Order</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2e1b7ac8${_scopeId}><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}><option value="" data-v-2e1b7ac8${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, "") : ssrLooseEqual(unref(form).sales_order_id, "")) ? " selected" : ""}${_scopeId}>Pilih Sales Order</option><!--[-->`);
            ssrRenderList(__props.salesOrders, (order) => {
              _push2(`<option${ssrRenderAttr("value", order.id)} data-v-2e1b7ac8${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, order.id) : ssrLooseEqual(unref(form).sales_order_id, order.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(order.order_number)} - ${ssrInterpolate(order.customer || order.customer_name || "No Customer")}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.sales_order_id) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2e1b7ac8${_scopeId}>${ssrInterpolate(__props.errors.sales_order_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2e1b7ac8${_scopeId}>Detail Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2e1b7ac8${_scopeId}><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Tanggal Invoice</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2e1b7ac8${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Term (Hari)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}>`);
            if (__props.errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2e1b7ac8${_scopeId}>${ssrInterpolate(__props.errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2e1b7ac8${_scopeId}>Detail Pengiriman</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2e1b7ac8${_scopeId}><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>AWB/BL No.</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>MAWB/OBL No.</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2e1b7ac8${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><div class="flex items-center justify-between mb-4" data-v-2e1b7ac8${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2e1b7ac8${_scopeId}>Item Invoice</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-2e1b7ac8${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2e1b7ac8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2e1b7ac8${_scopeId}></path></svg> Tambah Item </button></div><div class="space-y-4" data-v-2e1b7ac8${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).items, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-2e1b7ac8${_scopeId}><div class="flex items-center justify-between mb-4" data-v-2e1b7ac8${_scopeId}><h4 class="font-medium text-gray-900" data-v-2e1b7ac8${_scopeId}>Item ${ssrInterpolate(index + 1)}</h4>`);
              if (unref(form).items.length > 1) {
                _push2(`<button type="button" class="text-red-600 hover:text-red-800" data-v-2e1b7ac8${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2e1b7ac8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2e1b7ac8${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-2e1b7ac8${_scopeId}><div class="md:col-span-2" data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", item.description)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", item.unit)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Rate</label><input type="number"${ssrRenderAttr("value", item.rate)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2e1b7ac8${_scopeId}></div><div data-v-2e1b7ac8${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2e1b7ac8${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-2e1b7ac8${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2e1b7ac8${_scopeId}><div class="flex items-center justify-between" data-v-2e1b7ac8${_scopeId}><div class="text-lg font-semibold text-sage-800" data-v-2e1b7ac8${_scopeId}> Total: ${ssrInterpolate(formatCurrency(calculateTotal()))}</div><div class="flex space-x-4" data-v-2e1b7ac8${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(_ctx.processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-2e1b7ac8${_scopeId}>${ssrInterpolate(_ctx.processing ? "Menyimpan..." : "Simpan Invoice")}</button></div></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Buat Invoice Baru"),
                      createVNode("p", { class: "text-sage-600" }, "Buat invoice dari sales order yang telah disetujui")
                    ]),
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.invoices.index"),
                      class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2",
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
                        ])),
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Pilih Sales Order"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sales Order"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).sales_order_id = $event,
                          onChange: loadSalesOrderData,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Pilih Sales Order"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders, (order) => {
                            return openBlock(), createBlock("option", {
                              key: order.id,
                              value: order.id
                            }, toDisplayString(order.order_number) + " - " + toDisplayString(order.customer || order.customer_name || "No Customer"), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).sales_order_id]
                        ]),
                        __props.errors.sales_order_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.sales_order_id), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Invoice"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Invoice"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).invoice_date = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).invoice_date]
                        ]),
                        __props.errors.invoice_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Term (Hari)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).term_days = $event,
                          min: "1",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).term_days]
                        ]),
                        __props.errors.term_days ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.term_days), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Pengiriman"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Shipper"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).shipper]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Consignee"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).consignee = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).consignee]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "AWB/BL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).awb_bl_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).awb_bl_no]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "MAWB/OBL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).mawb_obl_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).mawb_obl_no]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vessel"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).vessel]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Flight/VOY"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).flight_voy = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).flight_voy]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Invoice"),
                      createVNode("button", {
                        type: "button",
                        onClick: addItem,
                        class: "inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ])),
                        createTextVNode(" Tambah Item ")
                      ])
                    ]),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "border border-gray-200 rounded-lg p-4"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                            createVNode("h4", { class: "font-medium text-gray-900" }, "Item " + toDisplayString(index + 1), 1),
                            unref(form).items.length > 1 ? (openBlock(), createBlock("button", {
                              key: 0,
                              type: "button",
                              onClick: ($event) => removeItem(index),
                              class: "text-red-600 hover:text-red-800"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ]))
                            ], 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Deskripsi"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => item.description = $event,
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.description]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Qty"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => item.quantity = $event,
                                onInput: ($event) => calculateAmount(index),
                                step: "0.01",
                                min: "0.01",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                [vModelText, item.quantity]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Unit"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => item.unit = $event,
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.unit]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Rate"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => item.rate = $event,
                                onInput: ($event) => calculateAmount(index),
                                step: "0.01",
                                min: "0",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                [vModelText, item.rate]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Amount"),
                              createVNode("input", {
                                type: "text",
                                value: formatCurrency(item.amount || 0),
                                class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100",
                                readonly: ""
                              }, null, 8, ["value"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-lg font-semibold text-sage-800" }, " Total: " + toDisplayString(formatCurrency(calculateTotal())), 1),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("admin-keuangan.invoices.index"),
                          class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: _ctx.processing,
                          class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                        }, toDisplayString(_ctx.processing ? "Menyimpan..." : "Simpan Invoice"), 9, ["disabled"])
                      ])
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2e1b7ac8"]]);
export {
  Create as default
};
