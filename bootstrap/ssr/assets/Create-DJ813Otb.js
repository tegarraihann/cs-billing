import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, Fragment, renderList, toDisplayString, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
    errors: Object,
    preselectedSalesOrder: [String, Number],
    preselectedInvoiceType: String
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
    const mainItems = ref([]);
    const reimbursementItems = ref([]);
    const form = useForm({
      sales_order_id: props.preselectedSalesOrder || "",
      invoice_type: "combined",
      // Always combined since we show both sections
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
      items: []
    });
    const loadSalesOrderData = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder) {
        form.consignee = selectedOrder.customer || selectedOrder.customer_name || "";
        form.shipper = selectedOrder.shipper || "";
        form.vessel = selectedOrder.vessel || "";
        form.awb_bl_no = selectedOrder.bl_awb || selectedOrder.awb_bl_number || "";
        form.pol_pod = selectedOrder.pol && selectedOrder.pod ? `${selectedOrder.pol}/${selectedOrder.pod}` : selectedOrder.pol_pod || "";
        form.origin = selectedOrder.pol || "";
        form.destination = selectedOrder.pod || "";
        if (selectedOrder.eta) {
          form.eta = selectedOrder.eta;
        }
        if (selectedOrder.etd) {
          form.etd = selectedOrder.etd;
        }
        form.gross_weight = selectedOrder.net_weight || "";
        form.volume = selectedOrder.measurement || "";
        form.no_of_packages = selectedOrder.qty || "";
        form.container_size = selectedOrder.shipment_type || "";
        if (selectedOrder.container_no) {
          form.container_no = Array.isArray(selectedOrder.container_no) ? selectedOrder.container_no.join(", ") : selectedOrder.container_no;
        }
        form.remarks = selectedOrder.remarks || selectedOrder.note || "";
      }
    };
    const addItem = () => {
      mainItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: "main",
        type: "main"
      });
    };
    const removeMainItem = (index) => {
      mainItems.value.splice(index, 1);
    };
    const calculateMainAmount = (index) => {
      const item = mainItems.value[index];
      item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    };
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: "reimbursement",
        type: "reimbursement"
      });
    };
    const removeReimbursementItem = (index) => {
      reimbursementItems.value.splice(index, 1);
    };
    const calculateReimbursementAmount = (index) => {
      const item = reimbursementItems.value[index];
      item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    };
    const calculateTotal = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      return mainTotal + reimbursementTotal;
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const submit = () => {
      const allItems = [
        ...mainItems.value.map((item) => ({
          ...item,
          type: "main",
          item_ref: item.item_ref || "main"
        })),
        ...reimbursementItems.value.map((item) => ({
          ...item,
          type: "reimbursement",
          item_ref: item.item_ref || "reimbursement"
        }))
      ];
      form.items = allItems;
      if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
        form.invoice_type = "combined";
      } else if (reimbursementItems.value.length > 0) {
        form.invoice_type = "reimbursement";
      } else {
        form.invoice_type = "main";
      }
      form.post(route("admin-keuangan.invoices.store"));
    };
    if (props.preselectedSalesOrder) {
      loadSalesOrderData();
      if (props.preselectedInvoiceType === "reimbursement") {
        addReimbursementItem();
      } else {
        addItem();
      }
    } else {
      addItem();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-2467b388${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2467b388${_scopeId}><div class="flex items-center justify-between" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-2467b388${_scopeId}>Buat Invoice Baru</h2><p class="text-sage-600" data-v-2467b388${_scopeId}>Buat invoice dari sales order yang telah disetujui</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-2467b388${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div><form class="space-y-6" data-v-2467b388${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2467b388${_scopeId}>Pilih Sales Order &amp; Type Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}><option value="" data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, "") : ssrLooseEqual(unref(form).sales_order_id, "")) ? " selected" : ""}${_scopeId}>Pilih Sales Order</option><!--[-->`);
            ssrRenderList(__props.salesOrders, (order) => {
              var _a;
              _push2(`<option${ssrRenderAttr("value", order.id)} data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, order.id) : ssrLooseEqual(unref(form).sales_order_id, order.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(order.order_number)} - ${ssrInterpolate(order.customer || order.customer_name || "No Customer")} (${ssrInterpolate(((_a = order.status) == null ? void 0 : _a.toUpperCase()) || "APPROVED")}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.sales_order_id) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2467b388${_scopeId}>${ssrInterpolate(__props.errors.sales_order_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Tipe Invoice</label><div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" data-v-2467b388${_scopeId}> Combined Invoice (Main + Reimbursement) </div><input type="hidden"${ssrRenderAttr("value", unref(form).invoice_type)} data-v-2467b388${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2467b388${_scopeId}>Detail Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Tanggal Invoice</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2467b388${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Term (Hari)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}>`);
            if (__props.errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-2467b388${_scopeId}>${ssrInterpolate(__props.errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-2467b388${_scopeId}>Detail Pengiriman</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>AWB/BL No.</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>MAWB/OBL No.</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>POL/POD</label><input type="text"${ssrRenderAttr("value", unref(form).pol_pod)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Origin</label><input type="text"${ssrRenderAttr("value", unref(form).origin)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Destination</label><input type="text"${ssrRenderAttr("value", unref(form).destination)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>ETD</label><input type="date"${ssrRenderAttr("value", unref(form).etd)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>ETA</label><input type="date"${ssrRenderAttr("value", unref(form).eta)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Gross Weight (KG)</label><input type="number"${ssrRenderAttr("value", unref(form).gross_weight)} step="0.0001"${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Volume</label><input type="text"${ssrRenderAttr("value", unref(form).volume)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., 10.5 M³" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>No of Packages</label><input type="number"${ssrRenderAttr("value", unref(form).no_of_packages)} min="0"${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>20&#39;/40&#39;/45&#39;</label><input type="text"${ssrRenderAttr("value", unref(form).container_size)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., 20GP, 40GP, 45GP" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Container No.</label><input type="text"${ssrRenderAttr("value", unref(form).container_no)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., MSKU2934199" data-v-2467b388${_scopeId}></div><div class="md:col-span-2" data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Remarks</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2467b388${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div></div></div><div class="space-y-6" data-v-2467b388${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><div class="flex items-center justify-between mb-4" data-v-2467b388${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2467b388${_scopeId}>Item Invoice Utama</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-2467b388${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2467b388${_scopeId}></path></svg> Tambah Item </button></div>`);
            if (mainItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-2467b388${_scopeId}><div class="flex flex-col items-center" data-v-2467b388${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-2467b388${_scopeId}></path></svg><p data-v-2467b388${_scopeId}>Belum ada item invoice utama</p><p class="text-sm" data-v-2467b388${_scopeId}>Klik tombol &quot;Tambah Item&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-2467b388${_scopeId}><!--[-->`);
            ssrRenderList(mainItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-2467b388${_scopeId}><div class="flex items-center justify-between mb-4" data-v-2467b388${_scopeId}><h4 class="font-medium text-gray-900" data-v-2467b388${_scopeId}>Item ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-2467b388${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2467b388${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-2467b388${_scopeId}><div class="md:col-span-2" data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", item.description)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", item.unit)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Rate</label><input type="number"${ssrRenderAttr("value", item.rate)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-2467b388${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-2467b388${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><div class="flex items-center justify-between mb-4" data-v-2467b388${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2467b388${_scopeId}>Item Reimbursement</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-2467b388${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2467b388${_scopeId}></path></svg> Tambah Item Reimbursement </button></div>`);
            if (reimbursementItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-2467b388${_scopeId}><div class="flex flex-col items-center" data-v-2467b388${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-2467b388${_scopeId}></path></svg><p data-v-2467b388${_scopeId}>Belum ada item reimbursement</p><p class="text-sm" data-v-2467b388${_scopeId}>Klik tombol &quot;Tambah Item Reimbursement&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-2467b388${_scopeId}><!--[-->`);
            ssrRenderList(reimbursementItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-2467b388${_scopeId}><div class="flex justify-between items-center mb-3" data-v-2467b388${_scopeId}><h4 class="font-medium text-gray-700" data-v-2467b388${_scopeId}>Reimbursement Item #${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-2467b388${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2467b388${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2467b388${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Item Number/Ref</label><input${ssrRenderAttr("value", item.item_ref)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REIMB-001" data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Currency</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2467b388${_scopeId}><option value="IDR" data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "IDR") : ssrLooseEqual(item.currency, "IDR")) ? " selected" : ""}${_scopeId}>IDR</option><option value="USD" data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "USD") : ssrLooseEqual(item.currency, "USD")) ? " selected" : ""}${_scopeId}>USD</option><option value="EUR" data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "EUR") : ssrLooseEqual(item.currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR</option><option value="SGD" data-v-2467b388${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "SGD") : ssrLooseEqual(item.currency, "SGD")) ? " selected" : ""}${_scopeId}>SGD</option></select></div></div><div class="mt-3" data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Biaya trucking dari gudang ke pelabuhan" required data-v-2467b388${_scopeId}>${ssrInterpolate(item.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" data-v-2467b388${_scopeId}><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Quantity</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Unit Rate</label><input${ssrRenderAttr("value", item.rate)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="500000" required data-v-2467b388${_scopeId}></div><div data-v-2467b388${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2467b388${_scopeId}>Total Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0, item.currency || "IDR"))} class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600" readonly data-v-2467b388${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-2467b388${_scopeId}><div class="flex items-center justify-between" data-v-2467b388${_scopeId}><div class="text-lg font-semibold text-sage-800" data-v-2467b388${_scopeId}> Total: ${ssrInterpolate(formatCurrency(calculateTotal()))}</div><div class="flex space-x-4" data-v-2467b388${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-2467b388${_scopeId}>${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Invoice")}</button></div></div></div></form></div>`);
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Pilih Sales Order & Type Invoice"),
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
                            var _a;
                            return openBlock(), createBlock("option", {
                              key: order.id,
                              value: order.id
                            }, toDisplayString(order.order_number) + " - " + toDisplayString(order.customer || order.customer_name || "No Customer") + " (" + toDisplayString(((_a = order.status) == null ? void 0 : _a.toUpperCase()) || "APPROVED") + ") ", 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).sales_order_id]
                        ]),
                        __props.errors.sales_order_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.sales_order_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tipe Invoice"),
                        createVNode("div", { class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" }, " Combined Invoice (Main + Reimbursement) "),
                        withDirectives(createVNode("input", {
                          type: "hidden",
                          "onUpdate:modelValue": ($event) => unref(form).invoice_type = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).invoice_type]
                        ])
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
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).shipper]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Consignee"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).consignee = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).consignee]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "AWB/BL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).awb_bl_no = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
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
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
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
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "POL/POD"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).pol_pod = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).pol_pod]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Origin"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).origin = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).origin]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Destination"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).destination = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).destination]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETD"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).etd]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETA"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).eta]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Gross Weight (KG)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                          step: "0.0001",
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).gross_weight]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Volume"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).volume = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., 10.5 M³"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).volume]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "No of Packages"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).no_of_packages = $event,
                          min: "0",
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).no_of_packages]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "20'/40'/45'"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_size = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., 20GP, 40GP, 45GP"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).container_size]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Container No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., MSKU2934199"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).container_no]
                        ])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Remarks"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).remarks]
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Invoice Utama"),
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
                      mainItems.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-300 mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ])),
                          createVNode("p", null, "Belum ada item invoice utama"),
                          createVNode("p", { class: "text-sm" }, 'Klik tombol "Tambah Item" untuk menambah item')
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(mainItems.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: "main-" + index,
                            class: "border border-gray-200 rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("h4", { class: "font-medium text-gray-900" }, "Item " + toDisplayString(index + 1), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeMainItem(index),
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
                              ], 8, ["onClick"])
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
                                  onInput: ($event) => calculateMainAmount(index),
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
                                  onInput: ($event) => calculateMainAmount(index),
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
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Reimbursement"),
                        createVNode("button", {
                          type: "button",
                          onClick: addReimbursementItem,
                          class: "inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                          createTextVNode(" Tambah Item Reimbursement ")
                        ])
                      ]),
                      reimbursementItems.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-300 mb-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                          ])),
                          createVNode("p", null, "Belum ada item reimbursement"),
                          createVNode("p", { class: "text-sm" }, 'Klik tombol "Tambah Item Reimbursement" untuk menambah item')
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(reimbursementItems.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: "reimb-" + index,
                            class: "border border-gray-200 rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "flex justify-between items-center mb-3" }, [
                              createVNode("h4", { class: "font-medium text-gray-700" }, "Reimbursement Item #" + toDisplayString(index + 1), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeReimbursementItem(index),
                                class: "text-red-600 hover:text-red-800"
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
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ]))
                              ], 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Item Number/Ref"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.item_ref = $event,
                                  type: "text",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "e.g., REIMB-001"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.item_ref]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Currency"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => item.currency = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, [
                                  createVNode("option", { value: "IDR" }, "IDR"),
                                  createVNode("option", { value: "USD" }, "USD"),
                                  createVNode("option", { value: "EUR" }, "EUR"),
                                  createVNode("option", { value: "SGD" }, "SGD")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, item.currency]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => item.description = $event,
                                rows: "2",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                                placeholder: "e.g., Biaya trucking dari gudang ke pelabuhan",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.description]
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Quantity"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                  onInput: ($event) => calculateReimbursementAmount(index),
                                  type: "number",
                                  step: "0.01",
                                  min: "0.01",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "1",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.quantity]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Unit Rate"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.rate = $event,
                                  onInput: ($event) => calculateReimbursementAmount(index),
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "500000",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.rate]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Total Amount"),
                                createVNode("input", {
                                  type: "text",
                                  value: formatCurrency(item.amount || 0, item.currency || "IDR"),
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600",
                                  readonly: ""
                                }, null, 8, ["value"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
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
                          disabled: unref(form).processing,
                          class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Invoice"), 9, ["disabled"])
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
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2467b388"]]);
export {
  Create as default
};
