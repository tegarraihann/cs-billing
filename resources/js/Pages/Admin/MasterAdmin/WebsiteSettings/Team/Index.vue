<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav
      class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50"
    >
      <div class="px-4 sm:px-6 lg:ml-64 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileSidebar"
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800">
              Kelola Tim
            </h1>
          </div>

          <!-- User Profile Dropdown -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Dropdown align="right" width="48">
              <template #trigger>
                <button
                  class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors"
                >
                  <div
                    class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-semibold text-xs sm:text-sm">
                      {{ getInitials($page.props.auth.user?.name) }}
                    </span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <p class="text-sm font-medium text-sage-700">
                      {{ $page.props.auth.user?.name }}
                    </p>
                    <p class="text-xs text-sage-500">Master Administrator</p>
                  </div>
                  <svg
                    class="w-4 h-4 text-sage-600 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </template>

              <template #content>
                <div class="py-1">
                  <DropdownLink
                    :href="route('profile.edit')"
                    class="flex items-center space-x-2 px-4 py-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </DropdownLink>

                  <div class="border-t border-gray-100 my-1"></div>

                  <DropdownLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Log Out</span>
                  </DropdownLink>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="{
        'translate-x-0': isMobileSidebarOpen,
        '-translate-x-full': !isMobileSidebarOpen,
      }"
    >
      <!-- Sidebar Header -->
      <div class="px-6 py-6 border-b border-sage-200">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-sage-700">Master Admin</h2>
            <p class="text-xs text-sage-500">Full System Control</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
        <!-- Dashboard -->
        <a
          :href="dashboardRoute"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="font-medium">Dashboard</span>
        </a>

        <!-- User Management -->
        <a
          :href="usersRoute"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
          <span class="font-medium">User Management</span>
        </a>

        <!-- Website Settings -->
        <div class="space-y-1">
          <div
            class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800"
          >
            <div class="flex items-center space-x-3">
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="font-medium">Website Settings</span>
            </div>
          </div>

          <!-- Sub Navigation -->
          <div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4">
            <a
              :href="pengaturanUmumRoute"
              class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
              <span>Pengaturan Umum</span>
            </a>

            <a
              :href="serviceRoute"
              class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                />
              </svg>
              <span>Service</span>
            </a>

            <a
              :href="teamRoute"
              class="flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>Team</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 pt-16 min-h-screen">
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Flash Messages -->
        <div
          v-if="$page.props.flash?.success"
          class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ $page.props.flash.success }}</span>
        </div>

        <div
          v-if="$page.props.flash?.error"
          class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ $page.props.flash.error }}</span>
        </div>

        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  :href="dashboardRoute"
                  class="text-sage-600 hover:text-sage-800"
                  >Dashboard</a
                >
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-sage-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sage-500 md:ml-2">Kelola Tim</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Header Section -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-2xl font-bold text-sage-800 mb-2">Kelola Tim</h2>
              <p class="text-sage-600">
                Tambah, edit, dan kelola anggota tim yang ditampilkan di website
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <a
                :href="createTeamRoute"
                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Tambah Anggota Tim
              </a>
            </div>
          </div>
        </div>

        <!-- Team Members Grid -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">
              Daftar Anggota Tim
            </h3>
            <p class="text-sm text-sage-600 mt-1">
              Total: {{ teamMembers?.length || 0 }} anggota tim
            </p>
          </div>

          <div
            v-if="!teamMembers || teamMembers.length === 0"
            class="p-8 text-center"
          >
            <svg
              class="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">
              Belum ada anggota tim
            </h3>
            <p class="text-gray-500 mb-4">
              Mulai dengan menambahkan anggota tim pertama Anda.
            </p>
            <a
              :href="createTeamRoute"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Anggota Tim
            </a>
          </div>

          <div v-else class="p-6">
            <div
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <div
                v-for="member in teamMembers"
                :key="member.id"
                class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <!-- Member Photo -->
                <div
                  class="mx-auto w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4"
                >
                  <img
                    v-if="member.photo_path"
                    :src="`/storage/${member.photo_path}`"
                    :alt="member.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    v-else
                    class="w-full h-full flex items-center justify-center text-gray-400"
                  >
                    <svg
                      class="w-10 h-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  </div>
                </div>

                <!-- Member Info -->
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ member.name }}
                </h3>
                <p class="text-sm text-gray-600 mb-2">{{ member.position }}</p>

                <!-- Phone Number -->
                <div
                  v-if="member.phone_number"
                  class="text-xs text-blue-600 mb-3 flex items-center justify-center space-x-1"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    />
                  </svg>
                  <span>{{ member.phone_number }}</span>
                </div>

                <!-- Status and Order -->
                <div class="flex items-center justify-center space-x-2 mb-4">
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded-full',
                      member.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ member.is_active ? "Aktif" : "Tidak Aktif" }}
                  </span>
                  <span class="text-xs text-gray-500"
                    >Urutan: {{ member.order_index }}</span
                  >
                </div>

                <!-- Actions -->
                <div class="flex justify-center space-x-2">
                  <a
                    :href="getEditRoute(member.id)"
                    class="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors"
                    title="Edit"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </a>

                  <button
                    @click="toggleMemberStatus(member)"
                    class="p-2 rounded transition-colors"
                    :class="
                      member.is_active
                        ? 'text-orange-600 hover:text-orange-800'
                        : 'text-green-600 hover:text-green-800'
                    "
                    :title="member.is_active ? 'Nonaktifkan' : 'Aktifkan'"
                  >
                    <svg
                      v-if="member.is_active"
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                      />
                    </svg>
                    <svg
                      v-else
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  <button
                    @click="confirmDelete(member)"
                    class="text-red-600 hover:text-red-800 p-2 rounded transition-colors"
                    title="Hapus"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Konfirmasi Hapus
        </h3>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus anggota tim "{{
            memberToDelete?.name
          }}"? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            @click="deleteMember"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { router } from "@inertiajs/vue3";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

// Props
const props = defineProps({
  teamMembers: Array,
});

// Routes
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/service";
const teamRoute = "/master-admin/website-settings/team";
const createTeamRoute = "/master-admin/website-settings/team/create";

// Reactive state
const isMobileSidebarOpen = ref(false);
const showDeleteModal = ref(false);
const memberToDelete = ref(null);

// Methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const getEditRoute = (memberId) => {
  return `/master-admin/website-settings/team/${memberId}/edit`;
};

const toggleMemberStatus = (member) => {
  const formData = new FormData();
  formData.append("_method", "PUT");
  formData.append("is_active", !member.is_active);
  formData.append(
    "_token",
    document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
  );

  router.post(`/master-admin/website-settings/team/${member.id}`, formData, {
    preserveState: false,
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
        preserveState: false,
      }
    );
    memberToDelete.value = null;
    showDeleteModal.value = false;
  }
};

// Auto-close mobile sidebar on screen resize
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileSidebarOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", handleResize);
  console.log("Team members data:", props.teamMembers);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
  color: #8db580;
}
.text-sage-600 {
  color: #8db580;
}
.text-sage-700 {
  color: #7ba169;
}
.text-sage-800 {
  color: #6b8f5e;
}
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-100 {
  background-color: #e8ece5;
}
.bg-sage-200 {
  background-color: #d4ddd0;
}
.bg-sage-600 {
  background-color: #8db580;
}
.bg-sage-700 {
  background-color: #7ba169;
}
.border-sage-200 {
  border-color: #d4ddd0;
}
.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
.hover\:text-sage-700:hover {
  color: #7ba169;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
}
</style>
