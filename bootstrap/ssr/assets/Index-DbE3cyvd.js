import { ref, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const dashboardRoute = "/master-admin/dashboard";
const createTeamRoute = "/master-admin/website-settings/team/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    teamMembers: Array
  },
  setup(__props) {
    const showDeleteModal = ref(false);
    const memberToDelete = ref(null);
    const getEditRoute = (memberId) => {
      return `/master-admin/website-settings/team/${memberId}/edit`;
    };
    const toggleMemberStatus = (member) => {
      var _a;
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append(
        "_token",
        (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")
      );
      router.post(`/master-admin/website-settings/team/${member.id}/toggle-status`, formData, {
        preserveState: false
      });
    };
    const confirmDelete = (member) => {
      memberToDelete.value = member;
      showDeleteModal.value = true;
    };
    const cancelDelete = () => {
      memberToDelete.value = null;
      showDeleteModal.value = false;
    };
    const deleteMember = () => {
      if (memberToDelete.value) {
        router.delete(
          `/master-admin/website-settings/team/${memberToDelete.value.id}`,
          {
            preserveState: false
          }
        );
        memberToDelete.value = null;
        showDeleteModal.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Team Members" }, null, _parent2, _scopeId));
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-17dbd5cb${_scopeId}>`);
            if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-17dbd5cb${_scopeId}><span class="block sm:inline" data-v-17dbd5cb${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-17dbd5cb${_scopeId}><span class="block sm:inline" data-v-17dbd5cb${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-6" data-v-17dbd5cb${_scopeId}><nav class="flex" aria-label="Breadcrumb" data-v-17dbd5cb${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-17dbd5cb${_scopeId}><li class="inline-flex items-center" data-v-17dbd5cb${_scopeId}><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-17dbd5cb${_scopeId}>Dashboard</a></li><li data-v-17dbd5cb${_scopeId}><div class="flex items-center" data-v-17dbd5cb${_scopeId}><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-17dbd5cb${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-17dbd5cb${_scopeId}></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-17dbd5cb${_scopeId}>Kelola Tim</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-17dbd5cb${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-17dbd5cb${_scopeId}><div data-v-17dbd5cb${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-17dbd5cb${_scopeId}>Kelola Tim</h2><p class="text-sage-600" data-v-17dbd5cb${_scopeId}> Tambah, edit, dan kelola anggota tim yang ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-17dbd5cb${_scopeId}><a${ssrRenderAttr("href", createTeamRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-17dbd5cb${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-17dbd5cb${_scopeId}></path></svg> Tambah Anggota Tim </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-17dbd5cb${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-17dbd5cb${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-17dbd5cb${_scopeId}> Daftar Anggota Tim </h3><p class="text-sm text-sage-600 mt-1" data-v-17dbd5cb${_scopeId}> Total: ${ssrInterpolate(((_c = __props.teamMembers) == null ? void 0 : _c.length) || 0)} anggota tim </p></div>`);
            if (!__props.teamMembers || __props.teamMembers.length === 0) {
              _push2(`<div class="p-8 text-center" data-v-17dbd5cb${_scopeId}><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-17dbd5cb${_scopeId}></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-17dbd5cb${_scopeId}> Belum ada anggota tim </h3><p class="text-gray-500 mb-4" data-v-17dbd5cb${_scopeId}> Mulai dengan menambahkan anggota tim pertama Anda. </p><a${ssrRenderAttr("href", createTeamRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-17dbd5cb${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-17dbd5cb${_scopeId}></path></svg> Tambah Anggota Tim </a></div>`);
            } else {
              _push2(`<div class="p-6" data-v-17dbd5cb${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-17dbd5cb${_scopeId}><!--[-->`);
              ssrRenderList(__props.teamMembers, (member) => {
                _push2(`<div class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors border border-gray-200" data-v-17dbd5cb${_scopeId}><div class="mx-auto w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4" data-v-17dbd5cb${_scopeId}>`);
                if (member.photo_path) {
                  _push2(`<img${ssrRenderAttr("src", `/storage/${member.photo_path}`)}${ssrRenderAttr("alt", member.name)} class="w-full h-full object-cover" data-v-17dbd5cb${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center text-gray-400" data-v-17dbd5cb${_scopeId}><svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" data-v-17dbd5cb${_scopeId}></path></svg></div>`);
                }
                _push2(`</div><h3 class="font-semibold text-gray-900 mb-1" data-v-17dbd5cb${_scopeId}>${ssrInterpolate(member.name)}</h3><p class="text-sm text-gray-600 mb-2" data-v-17dbd5cb${_scopeId}>${ssrInterpolate(member.position)}</p>`);
                if (member.phone_number) {
                  _push2(`<div class="text-xs text-blue-600 mb-3 flex items-center justify-center space-x-1" data-v-17dbd5cb${_scopeId}><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" data-v-17dbd5cb${_scopeId}></path></svg><span data-v-17dbd5cb${_scopeId}>${ssrInterpolate(member.phone_number)}</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center justify-center space-x-2 mb-4" data-v-17dbd5cb${_scopeId}><span class="${ssrRenderClass([
                  "px-2 py-1 text-xs rounded-full",
                  member.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                ])}" data-v-17dbd5cb${_scopeId}>${ssrInterpolate(member.is_active ? "Aktif" : "Tidak Aktif")}</span><span class="text-xs text-gray-500" data-v-17dbd5cb${_scopeId}>Urutan: ${ssrInterpolate(member.order_index)}</span></div><div class="flex justify-center space-x-2" data-v-17dbd5cb${_scopeId}><a${ssrRenderAttr("href", getEditRoute(member.id))} class="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors" title="Edit" data-v-17dbd5cb${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-17dbd5cb${_scopeId}></path></svg></a><button class="${ssrRenderClass([
                  member.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
                  "p-2 rounded transition-colors"
                ])}"${ssrRenderAttr("title", member.is_active ? "Nonaktifkan" : "Aktifkan")} data-v-17dbd5cb${_scopeId}>`);
                if (member.is_active) {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-17dbd5cb${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-17dbd5cb${_scopeId}></path></svg>`);
                }
                _push2(`</button><button class="text-red-600 hover:text-red-800 p-2 rounded transition-colors" title="Hapus" data-v-17dbd5cb${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17dbd5cb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-17dbd5cb${_scopeId}></path></svg></button></div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-17dbd5cb${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-17dbd5cb${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-17dbd5cb${_scopeId}> Konfirmasi Hapus </h3><p class="text-gray-600 mb-6" data-v-17dbd5cb${_scopeId}> Apakah Anda yakin ingin menghapus anggota tim &quot;${ssrInterpolate((_d = memberToDelete.value) == null ? void 0 : _d.name)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-17dbd5cb${_scopeId}><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-17dbd5cb${_scopeId}> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-17dbd5cb${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Team Members" }),
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                ((_e = _ctx.$page.props.flash) == null ? void 0 : _e.success) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.success), 1)
                ])) : createCommentVNode("", true),
                ((_f = _ctx.$page.props.flash) == null ? void 0 : _f.error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.error), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("nav", {
                    class: "flex",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode("a", {
                          href: dashboardRoute,
                          class: "text-sage-600 hover:text-sage-800"
                        }, "Dashboard")
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 text-sage-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("span", { class: "ml-1 text-sage-500 md:ml-2" }, "Kelola Tim")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, "Kelola Tim"),
                      createVNode("p", { class: "text-sage-600" }, " Tambah, edit, dan kelola anggota tim yang ditampilkan di website ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode("a", {
                        href: createTeamRoute,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, [
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
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ])),
                        createTextVNode(" Tambah Anggota Tim ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Daftar Anggota Tim "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_g = __props.teamMembers) == null ? void 0 : _g.length) || 0) + " anggota tim ", 1)
                  ]),
                  !__props.teamMembers || __props.teamMembers.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-8 text-center"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-16 h-16 mx-auto text-gray-400 mb-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      })
                    ])),
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, " Belum ada anggota tim "),
                    createVNode("p", { class: "text-gray-500 mb-4" }, " Mulai dengan menambahkan anggota tim pertama Anda. "),
                    createVNode("a", {
                      href: createTeamRoute,
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                    }, [
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
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createTextVNode(" Tambah Anggota Tim ")
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "p-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.teamMembers, (member) => {
                        return openBlock(), createBlock("div", {
                          key: member.id,
                          class: "bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors border border-gray-200"
                        }, [
                          createVNode("div", { class: "mx-auto w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4" }, [
                            member.photo_path ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: `/storage/${member.photo_path}`,
                              alt: member.name,
                              class: "w-full h-full object-cover"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "w-full h-full flex items-center justify-center text-gray-400"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-10 h-10",
                                fill: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", { d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
                              ]))
                            ]))
                          ]),
                          createVNode("h3", { class: "font-semibold text-gray-900 mb-1" }, toDisplayString(member.name), 1),
                          createVNode("p", { class: "text-sm text-gray-600 mb-2" }, toDisplayString(member.position), 1),
                          member.phone_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-blue-600 mb-3 flex items-center justify-center space-x-1"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-3 h-3",
                              fill: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", { d: "M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" })
                            ])),
                            createVNode("span", null, toDisplayString(member.phone_number), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center justify-center space-x-2 mb-4" }, [
                            createVNode("span", {
                              class: [
                                "px-2 py-1 text-xs rounded-full",
                                member.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              ]
                            }, toDisplayString(member.is_active ? "Aktif" : "Tidak Aktif"), 3),
                            createVNode("span", { class: "text-xs text-gray-500" }, "Urutan: " + toDisplayString(member.order_index), 1)
                          ]),
                          createVNode("div", { class: "flex justify-center space-x-2" }, [
                            createVNode("a", {
                              href: getEditRoute(member.id),
                              class: "text-blue-600 hover:text-blue-800 p-2 rounded transition-colors",
                              title: "Edit"
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
                                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                })
                              ]))
                            ], 8, ["href"]),
                            createVNode("button", {
                              onClick: ($event) => toggleMemberStatus(member),
                              class: [
                                "p-2 rounded transition-colors",
                                member.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"
                              ],
                              title: member.is_active ? "Nonaktifkan" : "Aktifkan"
                            }, [
                              member.is_active ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                })
                              ])) : (openBlock(), createBlock("svg", {
                                key: 1,
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                              ]))
                            ], 10, ["onClick", "title"]),
                            createVNode("button", {
                              onClick: ($event) => confirmDelete(member),
                              class: "text-red-600 hover:text-red-800 p-2 rounded transition-colors",
                              title: "Hapus"
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
                          ])
                        ]);
                      }), 128))
                    ])
                  ]))
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Konfirmasi Hapus "),
                  createVNode("p", { class: "text-gray-600 mb-6" }, ' Apakah Anda yakin ingin menghapus anggota tim "' + toDisplayString((_h = memberToDelete.value) == null ? void 0 : _h.name) + '"? Tindakan ini tidak dapat dibatalkan. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: cancelDelete,
                      class: "px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    }, " Batal "),
                    createVNode("button", {
                      onClick: deleteMember,
                      class: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    }, " Hapus ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Team/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17dbd5cb"]]);
export {
  Index as default
};
