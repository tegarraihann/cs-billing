import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    const getVendorInfo = (vendors) => {
      if (!vendors) return null;
      if (Array.isArray(vendors) && vendors.length > 0) {
        return vendors[0];
      }
      if (typeof vendors === "object" && !Array.isArray(vendors)) {
        return vendors;
      }
      return null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-85960cc3${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-85960cc3${_scopeId}><div class="flex items-center" data-v-85960cc3${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-85960cc3${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-85960cc3${_scopeId}></path></svg></div><div data-v-85960cc3${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.customer_code || __props.customer.no)}</h2><p class="text-sage-600" data-v-85960cc3${_scopeId}> Detail informasi pelanggan dan data pengiriman </p></div></div><div class="flex space-x-2 mt-4 sm:mt-0" data-v-85960cc3${_scopeId}><a${ssrRenderAttr("href", `/admin-cs/customers/${__props.customer.id}/print`)} class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" target="_blank" data-v-85960cc3${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-85960cc3${_scopeId}></path></svg> Cetak PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-85960cc3${_scopeId2}></path></svg> Edit `);
                } else {
                  return [
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-85960cc3${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="mb-6" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> 🏢 Informasi Perusahaan/Perorangan </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-85960cc3${_scopeId}><div class="lg:col-span-2" data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nama PT/Perorangan </label><p class="text-gray-900 font-semibold" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.company_name || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Jenis Usaha </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>`);
            if (__props.customer.company_type) {
              _push2(`<span class="inline-flex px-2 py-1 bg-sage-100 text-sage-800 text-sm rounded-full" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.company_type)}</span>`);
            } else {
              _push2(`<span data-v-85960cc3${_scopeId}>-</span>`);
            }
            _push2(`</p></div><div class="lg:col-span-2" data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Alamat PT/Domisili </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.company_address || "-")}</p></div><div class="lg:col-span-2" data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Alamat Kirim Invoice </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.invoice_address || "-")}</p></div></div></div></div></div><div class="mb-6" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> 📄 Data Legalitas </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-85960cc3${_scopeId}><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> NIB (Nomor Induk Berusaha) </label><p class="text-gray-900 font-mono" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.nib || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> NPWP </label><p class="text-gray-900 font-mono" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.npwp || "-")}</p></div>`);
            if (__props.customer.company_type === "Perorangan" || __props.customer.ktp_number) {
              _push2(`<div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nomor KTP </label><p class="text-gray-900 font-mono" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.ktp_number || "-")}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="mb-6" data-v-85960cc3${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> 👤 Data PIC (Person In Charge) </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="space-y-4" data-v-85960cc3${_scopeId}><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nama PIC </label><p class="text-gray-900 font-semibold" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.pic_name || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Kontak/Telepon Aktif PIC </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>`);
            if (__props.customer.pic_phone) {
              _push2(`<a${ssrRenderAttr("href", `tel:${__props.customer.pic_phone}`)} class="text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.pic_phone)}</a>`);
            } else {
              _push2(`<span data-v-85960cc3${_scopeId}>-</span>`);
            }
            _push2(`</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Email Aktif PIC </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>`);
            if (__props.customer.pic_email) {
              _push2(`<a${ssrRenderAttr("href", `mailto:${__props.customer.pic_email}`)} class="text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.pic_email)}</a>`);
            } else {
              _push2(`<span data-v-85960cc3${_scopeId}>-</span>`);
            }
            _push2(`</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> 📈 Data Marketing </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="space-y-4" data-v-85960cc3${_scopeId}><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nama Marketing </label><p class="text-gray-900 font-semibold" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.marketing_name || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nomor Telepon Marketing </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>`);
            if (__props.customer.marketing_phone) {
              _push2(`<a${ssrRenderAttr("href", `tel:${__props.customer.marketing_phone}`)} class="text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.marketing_phone)}</a>`);
            } else {
              _push2(`<span data-v-85960cc3${_scopeId}>-</span>`);
            }
            _push2(`</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Email Marketing </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>`);
            if (__props.customer.marketing_email) {
              _push2(`<a${ssrRenderAttr("href", `mailto:${__props.customer.marketing_email}`)} class="text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.marketing_email)}</a>`);
            } else {
              _push2(`<span data-v-85960cc3${_scopeId}>-</span>`);
            }
            _push2(`</p></div></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-85960cc3${_scopeId}><div class="lg:col-span-2" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> 🚚 Informasi Pengiriman </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-85960cc3${_scopeId}><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> No </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.no || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> SO Number </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.so_number || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Customer Code </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.customer_code || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Consignee/Shipper </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.consignee_shipper || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> AWB/BL Number </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.awb_bl_number || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Cust Doc Name </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.cust_doc_name || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Type Qty </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.type_qty || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> No Kont/Pallet </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.no_kont_pallet || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> POL/POD </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.pol_pod || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> ETA </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.eta ? formatDate(__props.customer.eta) : "-")}</p></div></div></div></div></div><div data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> Informasi Sistem </h3></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="space-y-4" data-v-85960cc3${_scopeId}><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Ditangani Oleh </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(((_a = __props.customer.handler) == null ? void 0 : _a.name) || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Dibuat </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.created_at))}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Terakhir Diperbarui </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.updated_at))}</p></div>`);
            if (__props.customer.last_contact_at) {
              _push2(`<div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Kontak Terakhir </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.last_contact_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
            if (__props.customer.photo_path || __props.customer.legal_document_path) {
              _push2(`<div class="mt-6" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> Dokumen &amp; Foto </h3><p class="text-sm text-sage-600 mt-1" data-v-85960cc3${_scopeId}> File yang telah diunggah untuk pelanggan ini </p></div><div class="p-6" data-v-85960cc3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-85960cc3${_scopeId}>`);
              if (__props.customer.photo_path) {
                _push2(`<div data-v-85960cc3${_scopeId}><h4 class="text-md font-medium text-sage-700 mb-3" data-v-85960cc3${_scopeId}>Foto Pelanggan</h4><div class="border border-gray-200 rounded-lg p-4" data-v-85960cc3${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.customer.photo_path}`)}${ssrRenderAttr("alt", `Foto ${__props.customer.customer_code}`)} class="w-full max-w-sm h-auto rounded-lg shadow-sm" data-v-85960cc3${_scopeId}><div class="mt-2" data-v-85960cc3${_scopeId}><p class="text-sm text-gray-600" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.photo_path.split("/").pop())}</p><a${ssrRenderAttr("href", `/storage/${__props.customer.photo_path}`)} target="_blank" class="text-xs text-sage-600 hover:text-sage-800 mt-1 inline-block" data-v-85960cc3${_scopeId}> Buka gambar penuh </a></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.legal_document_path) {
                _push2(`<div data-v-85960cc3${_scopeId}><h4 class="text-md font-medium text-sage-700 mb-3" data-v-85960cc3${_scopeId}>Dokumen Legal</h4><div class="border border-gray-200 rounded-lg p-4" data-v-85960cc3${_scopeId}><div class="flex items-center space-x-3" data-v-85960cc3${_scopeId}><svg class="w-12 h-12 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-85960cc3${_scopeId}></path></svg><div class="flex-1" data-v-85960cc3${_scopeId}><p class="font-medium text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(__props.customer.legal_document_path.split("/").pop())}</p><p class="text-sm text-gray-500" data-v-85960cc3${_scopeId}>Dokumen PDF</p><div class="mt-2 space-x-4" data-v-85960cc3${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.customer.legal_document_path}`)} target="_blank" class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-85960cc3${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-85960cc3${_scopeId}></path></svg> Lihat </a><a${ssrRenderAttr("href", `/storage/${__props.customer.legal_document_path}`)} download class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800" data-v-85960cc3${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-85960cc3${_scopeId}></path></svg> Unduh </a></div></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mt-6" data-v-85960cc3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85960cc3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-85960cc3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85960cc3${_scopeId}> Buying to Vendor </h3><p class="text-sm text-sage-600 mt-1" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors) ? "1 vendor terdaftar" : "0 vendor terdaftar")}</p></div><div class="p-6" data-v-85960cc3${_scopeId}>`);
            if (getVendorInfo(__props.customer.vendors)) {
              _push2(`<div class="space-y-6" data-v-85960cc3${_scopeId}><div class="border border-sage-200 rounded-lg p-4 bg-sage-50" data-v-85960cc3${_scopeId}><div class="flex items-center justify-between mb-4" data-v-85960cc3${_scopeId}><h4 class="font-medium text-sage-800" data-v-85960cc3${_scopeId}>Informasi Vendor</h4>`);
              if (getVendorInfo(__props.customer.vendors).nominal) {
                _push2(`<span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full" data-v-85960cc3${_scopeId}>${ssrInterpolate(formatCurrency(getVendorInfo(__props.customer.vendors).nominal))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-85960cc3${_scopeId}><div class="md:col-span-2 lg:col-span-3" data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Deskripsi </label><p class="text-gray-900 bg-white p-3 rounded border border-sage-200" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).deskripsi || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nominal </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).nominal ? formatCurrency(getVendorInfo(__props.customer.vendors).nominal) : "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> No Rekening </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).no_rekening || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Company Name </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).company_name || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> Nama Rekening </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).nama_rekening || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> NIB </label><p class="text-gray-900 font-mono" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).nib || "-")}</p></div><div data-v-85960cc3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-85960cc3${_scopeId}> RCVD INV </label><p class="text-gray-900" data-v-85960cc3${_scopeId}>${ssrInterpolate(getVendorInfo(__props.customer.vendors).rcvd_inv || "-")}</p></div></div></div></div>`);
            } else {
              _push2(`<div class="text-center py-8" data-v-85960cc3${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-85960cc3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-85960cc3${_scopeId}></path></svg><p class="text-lg font-medium text-gray-900 mb-2" data-v-85960cc3${_scopeId}>Tidak ada data vendor</p><p class="text-sm text-gray-400" data-v-85960cc3${_scopeId}> Belum ada vendor yang terdaftar untuk data ini </p></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
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
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.customer.customer_code || __props.customer.no), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi pelanggan dan data pengiriman ")
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-2 mt-4 sm:mt-0" }, [
                      createVNode("a", {
                        href: `/admin-cs/customers/${__props.customer.id}/print`,
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                        target: "_blank"
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
                            d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          })
                        ])),
                        createTextVNode(" Cetak PDF ")
                      ], 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, {
                        default: withCtx(() => [
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
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
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " 🏢 Informasi Perusahaan/Perorangan ")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                        createVNode("div", { class: "lg:col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama PT/Perorangan "),
                          createVNode("p", { class: "text-gray-900 font-semibold" }, toDisplayString(__props.customer.company_name || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Jenis Usaha "),
                          createVNode("p", { class: "text-gray-900" }, [
                            __props.customer.company_type ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "inline-flex px-2 py-1 bg-sage-100 text-sage-800 text-sm rounded-full"
                            }, toDisplayString(__props.customer.company_type), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                          ])
                        ]),
                        createVNode("div", { class: "lg:col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Alamat PT/Domisili "),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.company_address || "-"), 1)
                        ]),
                        createVNode("div", { class: "lg:col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Alamat Kirim Invoice "),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.invoice_address || "-"), 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " 📄 Data Legalitas ")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " NIB (Nomor Induk Berusaha) "),
                          createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.customer.nib || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " NPWP "),
                          createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.customer.npwp || "-"), 1)
                        ]),
                        __props.customer.company_type === "Perorangan" || __props.customer.ktp_number ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nomor KTP "),
                          createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.customer.ktp_number || "-"), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " 👤 Data PIC (Person In Charge) ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama PIC "),
                            createVNode("p", { class: "text-gray-900 font-semibold" }, toDisplayString(__props.customer.pic_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Kontak/Telepon Aktif PIC "),
                            createVNode("p", { class: "text-gray-900" }, [
                              __props.customer.pic_phone ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: `tel:${__props.customer.pic_phone}`,
                                class: "text-sage-600 hover:text-sage-800"
                              }, toDisplayString(__props.customer.pic_phone), 9, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Email Aktif PIC "),
                            createVNode("p", { class: "text-gray-900" }, [
                              __props.customer.pic_email ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: `mailto:${__props.customer.pic_email}`,
                                class: "text-sage-600 hover:text-sage-800"
                              }, toDisplayString(__props.customer.pic_email), 9, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " 📈 Data Marketing ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Marketing "),
                            createVNode("p", { class: "text-gray-900 font-semibold" }, toDisplayString(__props.customer.marketing_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nomor Telepon Marketing "),
                            createVNode("p", { class: "text-gray-900" }, [
                              __props.customer.marketing_phone ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: `tel:${__props.customer.marketing_phone}`,
                                class: "text-sage-600 hover:text-sage-800"
                              }, toDisplayString(__props.customer.marketing_phone), 9, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Email Marketing "),
                            createVNode("p", { class: "text-gray-900" }, [
                              __props.customer.marketing_email ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: `mailto:${__props.customer.marketing_email}`,
                                class: "text-sage-600 hover:text-sage-800"
                              }, toDisplayString(__props.customer.marketing_email), 9, ["href"])) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " 🚚 Informasi Pengiriman ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.no || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " SO Number "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.so_number || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Customer Code "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.customer_code || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Consignee/Shipper "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.consignee_shipper || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " AWB/BL Number "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.awb_bl_number || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Cust Doc Name "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.cust_doc_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Type Qty "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.type_qty || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No Kont/Pallet "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.no_kont_pallet || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " POL/POD "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.pol_pod || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " ETA "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.eta ? formatDate(__props.customer.eta) : "-"), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Informasi Sistem ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Ditangani Oleh "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(((_b = __props.customer.handler) == null ? void 0 : _b.name) || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Dibuat "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Terakhir Diperbarui "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.updated_at)), 1)
                          ]),
                          __props.customer.last_contact_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Kontak Terakhir "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.last_contact_at)), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ])
                ]),
                __props.customer.photo_path || __props.customer.legal_document_path ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Dokumen & Foto "),
                      createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " File yang telah diunggah untuk pelanggan ini ")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        __props.customer.photo_path ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("h4", { class: "text-md font-medium text-sage-700 mb-3" }, "Foto Pelanggan"),
                          createVNode("div", { class: "border border-gray-200 rounded-lg p-4" }, [
                            createVNode("img", {
                              src: `/storage/${__props.customer.photo_path}`,
                              alt: `Foto ${__props.customer.customer_code}`,
                              class: "w-full max-w-sm h-auto rounded-lg shadow-sm"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "mt-2" }, [
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(__props.customer.photo_path.split("/").pop()), 1),
                              createVNode("a", {
                                href: `/storage/${__props.customer.photo_path}`,
                                target: "_blank",
                                class: "text-xs text-sage-600 hover:text-sage-800 mt-1 inline-block"
                              }, " Buka gambar penuh ", 8, ["href"])
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        __props.customer.legal_document_path ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("h4", { class: "text-md font-medium text-sage-700 mb-3" }, "Dokumen Legal"),
                          createVNode("div", { class: "border border-gray-200 rounded-lg p-4" }, [
                            createVNode("div", { class: "flex items-center space-x-3" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-12 h-12 text-red-600 flex-shrink-0",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                })
                              ])),
                              createVNode("div", { class: "flex-1" }, [
                                createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(__props.customer.legal_document_path.split("/").pop()), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, "Dokumen PDF"),
                                createVNode("div", { class: "mt-2 space-x-4" }, [
                                  createVNode("a", {
                                    href: `/storage/${__props.customer.legal_document_path}`,
                                    target: "_blank",
                                    class: "inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 mr-1",
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
                                    ])),
                                    createTextVNode(" Lihat ")
                                  ], 8, ["href"]),
                                  createVNode("a", {
                                    href: `/storage/${__props.customer.legal_document_path}`,
                                    download: "",
                                    class: "inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 mr-1",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      })
                                    ])),
                                    createTextVNode(" Unduh ")
                                  ], 8, ["href"])
                                ])
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Buying to Vendor "),
                      createVNode("p", { class: "text-sm text-sage-600 mt-1" }, toDisplayString(getVendorInfo(__props.customer.vendors) ? "1 vendor terdaftar" : "0 vendor terdaftar"), 1)
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      getVendorInfo(__props.customer.vendors) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "border border-sage-200 rounded-lg p-4 bg-sage-50" }, [
                          createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                            createVNode("h4", { class: "font-medium text-sage-800" }, "Informasi Vendor"),
                            getVendorInfo(__props.customer.vendors).nominal ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                            }, toDisplayString(formatCurrency(getVendorInfo(__props.customer.vendors).nominal)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                            createVNode("div", { class: "md:col-span-2 lg:col-span-3" }, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Deskripsi "),
                              createVNode("p", { class: "text-gray-900 bg-white p-3 rounded border border-sage-200" }, toDisplayString(getVendorInfo(__props.customer.vendors).deskripsi || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nominal "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(getVendorInfo(__props.customer.vendors).nominal ? formatCurrency(getVendorInfo(__props.customer.vendors).nominal) : "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No Rekening "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(getVendorInfo(__props.customer.vendors).no_rekening || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Company Name "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(getVendorInfo(__props.customer.vendors).company_name || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Rekening "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(getVendorInfo(__props.customer.vendors).nama_rekening || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " NIB "),
                              createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(getVendorInfo(__props.customer.vendors).nib || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " RCVD INV "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(getVendorInfo(__props.customer.vendors).rcvd_inv || "-"), 1)
                            ])
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-8"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-12 h-12 text-gray-300 mb-4 mx-auto",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ])),
                        createVNode("p", { class: "text-lg font-medium text-gray-900 mb-2" }, "Tidak ada data vendor"),
                        createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada vendor yang terdaftar untuk data ini ")
                      ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85960cc3"]]);
export {
  Show as default
};
