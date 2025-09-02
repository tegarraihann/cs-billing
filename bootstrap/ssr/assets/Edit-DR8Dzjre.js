import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, Fragment, renderList, vModelSelect, createCommentVNode, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-VdCtsuep.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DeTpBoIP.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    invoice: Object,
    salesOrders: Array
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.update": (id) => `/admin-keuangan/invoices/${id}`
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    const form = useForm({
      invoice_number: props.invoice.invoice_number,
      sales_order_id: props.invoice.sales_order_id,
      invoice_date: props.invoice.invoice_date,
      term_days: props.invoice.term_days,
      shipper: props.invoice.shipper || "",
      consignee: props.invoice.consignee || "",
      awb_bl_no: props.invoice.awb_bl_no || "",
      mawb_obl_no: props.invoice.mawb_obl_no || "",
      gross_weight: props.invoice.gross_weight || "",
      volume: props.invoice.volume || "",
      no_of_packages: props.invoice.no_of_packages || "",
      vessel: props.invoice.vessel || "",
      flight_voy: props.invoice.flight_voy || "",
      pol_pod: props.invoice.pol_pod || "",
      origin: props.invoice.origin || "",
      destination: props.invoice.destination || "",
      etd: props.invoice.etd || "",
      eta: props.invoice.eta || "",
      container_no: props.invoice.container_no || "",
      container_size: props.invoice.container_size || "",
      remarks: props.invoice.remarks || "",
      items: props.invoice.items || [{
        description: "",
        quantity: 1,
        unit: "pcs",
        rate: 0,
        currency: "IDR",
        amount: 0
      }]
    });
    const subtotal = computed(() => {
      return form.items.reduce((sum, item) => sum + (item.amount || 0), 0);
    });
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount);
    };
    const calculateAmount = (index) => {
      const item = form.items[index];
      item.amount = (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0);
    };
    const addItem = () => {
      form.items.push({
        description: "",
        quantity: 1,
        unit: "pcs",
        rate: 0,
        currency: "IDR",
        amount: 0
      });
    };
    const removeItem = (index) => {
      form.items.splice(index, 1);
    };
    const updateInvoice = () => {
      form.put(route("admin-keuangan.invoices.update", props.invoice.id), {
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-739fb122${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-739fb122${_scopeId}><div class="flex items-center justify-between" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-739fb122${_scopeId}>Edit Invoice</h2><p class="text-sage-600" data-v-739fb122${_scopeId}>${ssrInterpolate(unref(form).invoice_number || "New Invoice")}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-739fb122${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-739fb122${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div><form data-v-739fb122${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-739fb122${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-739fb122${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-739fb122${_scopeId}>Informasi Dasar</h3><div class="space-y-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" disabled data-v-739fb122${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders, (salesOrder) => {
              _push2(`<option${ssrRenderAttr("value", salesOrder.id)} data-v-739fb122${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, salesOrder.id) : ssrLooseEqual(unref(form).sales_order_id, salesOrder.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(salesOrder.order_number)} - ${ssrInterpolate(salesOrder.customer || salesOrder.customer_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Tanggal Invoice</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="${ssrRenderClass([{ "border-red-500": unref(form).errors.invoice_date }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" required data-v-739fb122${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-739fb122${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Term (Hari)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.term_days }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" required data-v-739fb122${_scopeId}>`);
            if (unref(form).errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-739fb122${_scopeId}>${ssrInterpolate(unref(form).errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-739fb122${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-739fb122${_scopeId}>Detail Pengiriman</h3><div class="space-y-4" data-v-739fb122${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>AWB/BL No</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>MAWB/OBL No</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-739fb122${_scopeId}><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Origin</label><input type="text"${ssrRenderAttr("value", unref(form).origin)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div><div data-v-739fb122${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-739fb122${_scopeId}>Destination</label><input type="text"${ssrRenderAttr("value", unref(form).destination)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-739fb122${_scopeId}></div></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-739fb122${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-739fb122${_scopeId}><div class="flex items-center justify-between" data-v-739fb122${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-739fb122${_scopeId}>Item Invoice</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-739fb122${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-739fb122${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-739fb122${_scopeId}></path></svg> Tambah Item </button></div></div><div class="overflow-x-auto" data-v-739fb122${_scopeId}><table class="w-full" data-v-739fb122${_scopeId}><thead class="bg-sage-50" data-v-739fb122${_scopeId}><tr data-v-739fb122${_scopeId}><th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Deskripsi</th><th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Qty</th><th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Unit</th><th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Rate</th><th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Currency</th><th class="px-4 py-3 text-right text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Amount</th><th class="px-4 py-3 text-center text-xs font-medium text-sage-500 uppercase" data-v-739fb122${_scopeId}>Aksi</th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-739fb122${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).items, (item, index) => {
              _push2(`<tr data-v-739fb122${_scopeId}><td class="px-4 py-4" data-v-739fb122${_scopeId}><input type="text"${ssrRenderAttr("value", item.description)} class="${ssrRenderClass([{ "border-red-500": unref(form).errors[`items.${index}.description`] }, "w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" required data-v-739fb122${_scopeId}></td><td class="px-4 py-4" data-v-739fb122${_scopeId}><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-739fb122${_scopeId}></td><td class="px-4 py-4" data-v-739fb122${_scopeId}><input type="text"${ssrRenderAttr("value", item.unit)} class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-739fb122${_scopeId}></td><td class="px-4 py-4" data-v-739fb122${_scopeId}><input type="number"${ssrRenderAttr("value", item.rate)} step="0.01" min="0" class="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-739fb122${_scopeId}></td><td class="px-4 py-4" data-v-739fb122${_scopeId}><select class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-739fb122${_scopeId}><option value="IDR" data-v-739fb122${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "IDR") : ssrLooseEqual(item.currency, "IDR")) ? " selected" : ""}${_scopeId}>IDR</option><option value="USD" data-v-739fb122${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "USD") : ssrLooseEqual(item.currency, "USD")) ? " selected" : ""}${_scopeId}>USD</option><option value="EUR" data-v-739fb122${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "EUR") : ssrLooseEqual(item.currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR</option></select></td><td class="px-4 py-4 text-right" data-v-739fb122${_scopeId}><span class="font-medium" data-v-739fb122${_scopeId}>${ssrInterpolate(formatCurrency(item.amount || 0, item.currency))}</span></td><td class="px-4 py-4 text-center" data-v-739fb122${_scopeId}>`);
              if (unref(form).items.length > 1) {
                _push2(`<button type="button" class="text-red-600 hover:text-red-900" data-v-739fb122${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-739fb122${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-739fb122${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-gray-50 border-t border-sage-200" data-v-739fb122${_scopeId}><div class="flex justify-end" data-v-739fb122${_scopeId}><div class="w-64 space-y-2" data-v-739fb122${_scopeId}><div class="flex justify-between" data-v-739fb122${_scopeId}><span class="text-sm text-gray-600" data-v-739fb122${_scopeId}>Subtotal:</span><span class="text-sm font-medium" data-v-739fb122${_scopeId}>${ssrInterpolate(formatCurrency(subtotal.value))}</span></div><div class="flex justify-between text-lg font-semibold" data-v-739fb122${_scopeId}><span data-v-739fb122${_scopeId}>Total:</span><span data-v-739fb122${_scopeId}>${ssrInterpolate(formatCurrency(subtotal.value))}</span></div></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 mb-6" data-v-739fb122${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-739fb122${_scopeId}>Catatan</h3><textarea rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Catatan tambahan untuk invoice..." data-v-739fb122${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div><div class="flex justify-end space-x-4" data-v-739fb122${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-739fb122${_scopeId}>${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Edit Invoice"),
                      createVNode("p", { class: "text-sage-600" }, toDisplayString(unref(form).invoice_number || "New Invoice"), 1)
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
                  onSubmit: withModifiers(updateInvoice, ["prevent"])
                }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Dasar"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sales Order"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).sales_order_id = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            disabled: ""
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders, (salesOrder) => {
                              return openBlock(), createBlock("option", {
                                key: salesOrder.id,
                                value: salesOrder.id
                              }, toDisplayString(salesOrder.order_number) + " - " + toDisplayString(salesOrder.customer || salesOrder.customer_name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).sales_order_id]
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Invoice"),
                            withDirectives(createVNode("input", {
                              type: "date",
                              "onUpdate:modelValue": ($event) => unref(form).invoice_date = $event,
                              class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.invoice_date }],
                              required: ""
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).invoice_date]
                            ]),
                            unref(form).errors.invoice_date ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-red-500 text-sm mt-1"
                            }, toDisplayString(unref(form).errors.invoice_date), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Term (Hari)"),
                            withDirectives(createVNode("input", {
                              type: "number",
                              "onUpdate:modelValue": ($event) => unref(form).term_days = $event,
                              min: "1",
                              class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.term_days }],
                              required: ""
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).term_days]
                            ]),
                            unref(form).errors.term_days ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-red-500 text-sm mt-1"
                            }, toDisplayString(unref(form).errors.term_days), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Pengiriman"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "AWB/BL No"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).awb_bl_no = $event,
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).awb_bl_no]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "MAWB/OBL No"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).mawb_obl_no = $event,
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).mawb_obl_no]
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Origin"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).origin = $event,
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).origin]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Destination"),
                            withDirectives(createVNode("input", {
                              type: "text",
                              "onUpdate:modelValue": ($event) => unref(form).destination = $event,
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).destination]
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
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
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-sage-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" }, "Deskripsi"),
                            createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" }, "Qty"),
                            createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" }, "Unit"),
                            createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" }, "Rate"),
                            createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase" }, "Currency"),
                            createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-sage-500 uppercase" }, "Amount"),
                            createVNode("th", { class: "px-4 py-3 text-center text-xs font-medium text-sage-500 uppercase" }, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, index) => {
                            return openBlock(), createBlock("tr", { key: index }, [
                              createVNode("td", { class: "px-4 py-4" }, [
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  class: ["w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors[`items.${index}.description`] }],
                                  required: ""
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, item.description]
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4" }, [
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                  onInput: ($event) => calculateAmount(index),
                                  step: "0.01",
                                  min: "0.01",
                                  class: "w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.quantity]
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4" }, [
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => item.unit = $event,
                                  class: "w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.unit]
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4" }, [
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => item.rate = $event,
                                  onInput: ($event) => calculateAmount(index),
                                  step: "0.01",
                                  min: "0",
                                  class: "w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.rate]
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4" }, [
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => item.currency = $event,
                                  class: "w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, [
                                  createVNode("option", { value: "IDR" }, "IDR"),
                                  createVNode("option", { value: "USD" }, "USD"),
                                  createVNode("option", { value: "EUR" }, "EUR")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, item.currency]
                                ])
                              ]),
                              createVNode("td", { class: "px-4 py-4 text-right" }, [
                                createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(item.amount || 0, item.currency)), 1)
                              ]),
                              createVNode("td", { class: "px-4 py-4 text-center" }, [
                                unref(form).items.length > 1 ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  type: "button",
                                  onClick: ($event) => removeItem(index),
                                  class: "text-red-600 hover:text-red-900"
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
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "px-6 py-4 bg-gray-50 border-t border-sage-200" }, [
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("div", { class: "w-64 space-y-2" }, [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("span", { class: "text-sm text-gray-600" }, "Subtotal:"),
                            createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(subtotal.value)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between text-lg font-semibold" }, [
                            createVNode("span", null, "Total:"),
                            createVNode("span", null, toDisplayString(formatCurrency(subtotal.value)), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 mb-6" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Catatan"),
                    withDirectives(createVNode("textarea", {
                      "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                      rows: "4",
                      class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                      placeholder: "Catatan tambahan untuk invoice..."
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, unref(form).remarks]
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-4" }, [
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
                      disabled: unref(form).processing,
                      class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                    }, toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Perubahan"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-739fb122"]]);
export {
  Edit as default
};
