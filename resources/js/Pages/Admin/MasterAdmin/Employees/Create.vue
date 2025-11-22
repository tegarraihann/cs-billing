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
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
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
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate">
              Add New Employee
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

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      @click="closeMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Sidebar -->
    <SidebarNavigation
      :is-mobile-sidebar-open="isMobileSidebarOpen"
      @close-mobile-sidebar="closeMobileSidebar"
    />

    <!-- Main Content Area -->
    <main class="lg:ml-64 pt-16 min-h-screen">
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  href="/master-admin/employees"
                  class="inline-flex items-center text-sm font-medium text-sage-700 hover:text-sage-900"
                >
                  Employee Management
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    Add Employee
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Form Container -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200">
          <div class="px-6 py-4 border-b border-sage-200">
            <h2 class="text-xl font-semibold text-sage-800">Add New Employee</h2>
            <p class="text-sm text-sage-600 mt-1">
              Fill in the employee information below
            </p>
          </div>

          <form @submit.prevent="submitForm" class="p-6">
            <!-- Section 1: Data Pribadi -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200">
                Section 1: Data Pribadi
              </h3>
              
              <div class="grid grid-cols-1 gap-6">
                <!-- Nama -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.nama"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.nama }"
                  />
                  <span v-if="errors.nama" class="text-red-500 text-xs mt-1">{{ errors.nama[0] }}</span>
                </div>

                <!-- Tempat Lahir -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Tempat Lahir <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.tempat_lahir"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.tempat_lahir }"
                  />
                  <span v-if="errors.tempat_lahir" class="text-red-500 text-xs mt-1">{{ errors.tempat_lahir[0] }}</span>
                </div>

                <!-- Tanggal Lahir -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Tanggal Lahir <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.tanggal_lahir"
                    type="date"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.tanggal_lahir }"
                  />
                  <span v-if="errors.tanggal_lahir" class="text-red-500 text-xs mt-1">{{ errors.tanggal_lahir[0] }}</span>
                </div>

                <!-- Jenis Kelamin -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Jenis Kelamin <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.jenis_kelamin"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.jenis_kelamin }"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                  <span v-if="errors.jenis_kelamin" class="text-red-500 text-xs mt-1">{{ errors.jenis_kelamin[0] }}</span>
                </div>

                <!-- Agama -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Agama <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.agama"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.agama }"
                  />
                  <span v-if="errors.agama" class="text-red-500 text-xs mt-1">{{ errors.agama[0] }}</span>
                </div>

                <!-- Suku Bangsa -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Suku Bangsa <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.suku_bangsa"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.suku_bangsa }"
                  />
                  <span v-if="errors.suku_bangsa" class="text-red-500 text-xs mt-1">{{ errors.suku_bangsa[0] }}</span>
                </div>

                <!-- Kewarganegaraan -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Kewarganegaraan <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.kewarganegaraan"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.kewarganegaraan }"
                  />
                  <span v-if="errors.kewarganegaraan" class="text-red-500 text-xs mt-1">{{ errors.kewarganegaraan[0] }}</span>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.email }"
                  />
                  <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</span>
                </div>
              </div>

              <!-- Alamat KTP (Full Width) -->
              <div class="mt-6">
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Alamat Sesuai KTP <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.alamat_ktp"
                  rows="3"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-500': errors.alamat_ktp }"
                ></textarea>
                <span v-if="errors.alamat_ktp" class="text-red-500 text-xs mt-1">{{ errors.alamat_ktp[0] }}</span>
              </div>

              <!-- Address Details -->
              <div class="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">RT <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.rt_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.rt_ktp }"
                  />
                  <span v-if="errors.rt_ktp" class="text-red-500 text-xs mt-1">{{ errors.rt_ktp[0] }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">RW <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.rw_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.rw_ktp }"
                  />
                  <span v-if="errors.rw_ktp" class="text-red-500 text-xs mt-1">{{ errors.rw_ktp[0] }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kelurahan <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.kelurahan_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.kelurahan_ktp }"
                  />
                  <span v-if="errors.kelurahan_ktp" class="text-red-500 text-xs mt-1">{{ errors.kelurahan_ktp[0] }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kecamatan <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.kecamatan_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.kecamatan_ktp }"
                  />
                  <span v-if="errors.kecamatan_ktp" class="text-red-500 text-xs mt-1">{{ errors.kecamatan_ktp[0] }}</span>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kota <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.kota_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.kota_ktp }"
                  />
                  <span v-if="errors.kota_ktp" class="text-red-500 text-xs mt-1">{{ errors.kota_ktp[0] }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Provinsi <span class="text-red-500">*</span></label>
                  <input
                    v-model="form.provinsi_ktp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.provinsi_ktp }"
                  />
                  <span v-if="errors.provinsi_ktp" class="text-red-500 text-xs mt-1">{{ errors.provinsi_ktp[0] }}</span>
                </div>
              </div>

              <!-- Contact Information -->
              <div class="grid grid-cols-1 gap-4 mt-6">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Nomor Telp Rumah</label>
                  <input
                    v-model="form.nomor_telp_rumah"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Nomor HP <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.nomor_hp"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.nomor_hp }"
                  />
                  <span v-if="errors.nomor_hp" class="text-red-500 text-xs mt-1">{{ errors.nomor_hp[0] }}</span>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Instagram</label>
                  <input
                    v-model="form.instagram"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-sage-700 mb-2">LinkedIn</label>
                <input
                  v-model="form.linkedin"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>

              <!-- Emergency Contact -->
              <div class="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 class="text-md font-semibold text-yellow-800 mb-3">Emergency Contact (Kontak Darurat)</h4>
                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">Nama Kontak Darurat</label>
                    <input
                      v-model="form.nama_emergency"
                      type="text"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="Nama lengkap kontak darurat"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">Hubungan</label>
                    <select
                      v-model="form.hubungan_emergency"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Pilih Hubungan</option>
                      <option value="Ayah">Ayah</option>
                      <option value="Ibu">Ibu</option>
                      <option value="Suami">Suami</option>
                      <option value="Istri">Istri</option>
                      <option value="Anak">Anak</option>
                      <option value="Saudara">Saudara</option>
                      <option value="Kerabat">Kerabat</option>
                      <option value="Teman">Teman</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">Nomor Telepon</label>
                    <input
                      v-model="form.nomor_telepon_emergency"
                      type="tel"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="Nomor HP/telepon yang bisa dihubungi"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">Alamat</label>
                    <textarea
                      v-model="form.alamat_emergency"
                      rows="2"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="Alamat lengkap kontak darurat"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 2: Data Orang Tua -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200">
                Section 2: Data Orang Tua
              </h3>

              <!-- Alamat Orang Tua -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-sage-700 mb-2">Alamat Rumah Orang Tua</label>
                <textarea
                  v-model="form.alamat_orang_tua"
                  rows="3"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                ></textarea>
              </div>

              <!-- Address Details Orang Tua -->
              <div class="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">RT</label>
                  <input
                    v-model="form.rt_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">RW</label>
                  <input
                    v-model="form.rw_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kelurahan</label>
                  <input
                    v-model="form.kelurahan_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kecamatan</label>
                  <input
                    v-model="form.kecamatan_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kota</label>
                  <input
                    v-model="form.kota_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Provinsi</label>
                  <input
                    v-model="form.provinsi_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Nomor Telp</label>
                  <input
                    v-model="form.nomor_telp_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Nomor HP</label>
                  <input
                    v-model="form.nomor_hp_orang_tua"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200">
                Additional Information
              </h3>

              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Masuk</label>
                  <input
                    v-model="form.tanggal_masuk"
                    type="date"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Posisi</label>
                  <input
                    v-model="form.posisi"
                    type="text"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': errors.status }"
                  >
                    <option value="">Pilih Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <span v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</span>
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-sage-700 mb-2">Keterangan</label>
                <textarea
                  v-model="form.keterangan"
                  rows="3"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                ></textarea>
              </div>
            </div>

            <!-- Section 4: Data Keluarga -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200">
                Section 4: Data Keluarga (Opsional)
              </h3>
              
              <div class="space-y-6">
                <!-- Ayah -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-700 mb-3">Data Ayah</h4>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Nama Ayah</label>
                      <input
                        v-model="form.family_members.ayah.nama_keluarga"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tempat Lahir</label>
                      <input
                        v-model="form.family_members.ayah.tempat_lahir_keluarga"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Lahir</label>
                      <input
                        v-model="form.family_members.ayah.tanggal_lahir_keluarga"
                        type="date"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Pendidikan Terakhir</label>
                      <input
                        v-model="form.family_members.ayah.pendidikan_terakhir"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-sage-700 mb-2">Pekerjaan</label>
                      <input
                        v-model="form.family_members.ayah.pekerjaan"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                  </div>
                </div>

                <!-- Ibu -->
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-semibold text-gray-700 mb-3">Data Ibu</h4>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Nama Ibu</label>
                      <input
                        v-model="form.family_members.ibu.nama_keluarga"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tempat Lahir</label>
                      <input
                        v-model="form.family_members.ibu.tempat_lahir_keluarga"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Lahir</label>
                      <input
                        v-model="form.family_members.ibu.tanggal_lahir_keluarga"
                        type="date"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Pendidikan Terakhir</label>
                      <input
                        v-model="form.family_members.ibu.pendidikan_terakhir"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div class="md:col-span-2">
                      <label class="block text-sm font-medium text-sage-700 mb-2">Pekerjaan</label>
                      <input
                        v-model="form.family_members.ibu.pekerjaan"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 5: Pengalaman Kerja -->
            <div class="mb-8">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-sage-800 pb-2 border-b border-sage-200 flex-1">
                  Section 5: Pengalaman Kerja (Opsional)
                </h3>
                <button
                  type="button"
                  @click="addWorkExperience"
                  class="ml-4 px-3 py-1 bg-sage-600 text-white text-sm rounded hover:bg-sage-700 transition-colors"
                >
                  + Tambah
                </button>
              </div>
              
              <div class="space-y-4">
                <div v-for="(work, index) in form.work_experiences" :key="index" class="bg-gray-50 p-4 rounded-lg relative">
                  <button
                    type="button"
                    @click="removeWorkExperience(index)"
                    class="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    v-if="form.work_experiences.length > 1"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                  </button>
                  <h4 class="font-semibold text-gray-700 mb-3">Pengalaman Kerja {{ index + 1 }}</h4>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Nama Perusahaan</label>
                      <input
                        v-model="work.nama_perusahaan"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Jabatan</label>
                      <input
                        v-model="work.jabatan"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Mulai</label>
                      <input
                        v-model="work.tanggal_mulai"
                        type="date"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Berakhir</label>
                      <input
                        v-model="work.tanggal_berakhir"
                        type="date"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Gaji Terakhir</label>
                      <input
                        v-model="work.gaji_terakhir"
                        type="number"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-2">Alasan Berhenti</label>
                      <input
                        v-model="work.alasan_berhenti"
                        type="text"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div v-if="form.work_experiences.length === 0" class="text-center text-gray-500 py-4">
                  Belum ada pengalaman kerja. Klik "Tambah" untuk menambahkan.
                </div>
              </div>
            </div>

            <!-- Section 6: Lampiran Dokumen -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200">
                Section 6: Lampiran Dokumen
              </h3>
              <p class="text-sm text-sage-600 mb-3">
                Unggah dokumen (PDF/JPG/PNG, maks 5MB per file).
              </p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">KTP</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('ktp', $event)"
                  />
                  <p v-if="documents.ktp" class="text-xs text-gray-600 mt-1">{{ documents.ktp.name }}</p>
                  <span v-if="errors['documents.ktp']" class="text-red-500 text-xs mt-1">{{ errors['documents.ktp'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Kartu Keluarga</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('kartu_keluarga', $event)"
                  />
                  <p v-if="documents.kartu_keluarga" class="text-xs text-gray-600 mt-1">{{ documents.kartu_keluarga.name }}</p>
                  <span v-if="errors['documents.kartu_keluarga']" class="text-red-500 text-xs mt-1">{{ errors['documents.kartu_keluarga'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">NPWP</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('npwp', $event)"
                  />
                  <p v-if="documents.npwp" class="text-xs text-gray-600 mt-1">{{ documents.npwp.name }}</p>
                  <span v-if="errors['documents.npwp']" class="text-red-500 text-xs mt-1">{{ errors['documents.npwp'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">BPJS Kesehatan</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('bpjs_kesehatan', $event)"
                  />
                  <p v-if="documents.bpjs_kesehatan" class="text-xs text-gray-600 mt-1">{{ documents.bpjs_kesehatan.name }}</p>
                  <span v-if="errors['documents.bpjs_kesehatan']" class="text-red-500 text-xs mt-1">{{ errors['documents.bpjs_kesehatan'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">BPJS Ketenagakerjaan</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('bpjs_ketenagakerjaan', $event)"
                  />
                  <p v-if="documents.bpjs_ketenagakerjaan" class="text-xs text-gray-600 mt-1">{{ documents.bpjs_ketenagakerjaan.name }}</p>
                  <span v-if="errors['documents.bpjs_ketenagakerjaan']" class="text-red-500 text-xs mt-1">{{ errors['documents.bpjs_ketenagakerjaan'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">SKCK</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('skck', $event)"
                  />
                  <p v-if="documents.skck" class="text-xs text-gray-600 mt-1">{{ documents.skck.name }}</p>
                  <span v-if="errors['documents.skck']" class="text-red-500 text-xs mt-1">{{ errors['documents.skck'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">CV</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('cv', $event)"
                  />
                  <p v-if="documents.cv" class="text-xs text-gray-600 mt-1">{{ documents.cv.name }}</p>
                  <span v-if="errors['documents.cv']" class="text-red-500 text-xs mt-1">{{ errors['documents.cv'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Surat Lamaran</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('surat_lamaran', $event)"
                  />
                  <p v-if="documents.surat_lamaran" class="text-xs text-gray-600 mt-1">{{ documents.surat_lamaran.name }}</p>
                  <span v-if="errors['documents.surat_lamaran']" class="text-red-500 text-xs mt-1">{{ errors['documents.surat_lamaran'][0] }}</span>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Surat Pengalaman Kerja / Rekomendasi</label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    class="w-full text-sm text-gray-700"
                    @change="handleFileChange('surat_pengalaman_kerja', $event)"
                  />
                  <p v-if="documents.surat_pengalaman_kerja" class="text-xs text-gray-600 mt-1">{{ documents.surat_pengalaman_kerja.name }}</p>
                  <span v-if="errors['documents.surat_pengalaman_kerja']" class="text-red-500 text-xs mt-1">{{ errors['documents.surat_pengalaman_kerja'][0] }}</span>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 pt-6 border-t border-sage-200">
              <a
                href="/master-admin/employees"
                class="px-4 py-2 text-sage-600 bg-sage-100 rounded-lg hover:bg-sage-200 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                :disabled="processing"
                class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
              >
                {{ processing ? 'Saving...' : 'Save Employee' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>

  <AlertDialog
    :show="showAlert"
    :type="alertType"
    :title="alertTitle"
    :message="alertMessageText"
    confirm-text="OK"
    @confirm="showAlert = false"
    @close="showAlert = false"
    @cancel="showAlert = false"
  />
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

// Reactive state
const isMobileSidebarOpen = ref(false);
const processing = ref(false);
const errors = ref({});
const alertMessages = ref([]);
const showAlert = ref(false);
const alertTitle = ref("Form belum lengkap");
const alertType = ref("error");
const alertMessageText = computed(() =>
  alertMessages.value.length ? alertMessages.value.join("\n") : "Terjadi kesalahan."
);

const form = reactive({
  nama: '',
  tempat_lahir: '',
  tanggal_lahir: '',
  jenis_kelamin: '',
  agama: '',
  suku_bangsa: '',
  kewarganegaraan: 'Indonesia',
  alamat_ktp: '',
  rt_ktp: '',
  rw_ktp: '',
  kelurahan_ktp: '',
  kecamatan_ktp: '',
  kota_ktp: '',
  provinsi_ktp: '',
  nomor_telp_rumah: '',
  nomor_hp: '',
  email: '',
  instagram: '',
  linkedin: '',
  nama_emergency: '',
  hubungan_emergency: '',
  alamat_emergency: '',
  nomor_telepon_emergency: '',
  alamat_orang_tua: '',
  rt_orang_tua: '',
  rw_orang_tua: '',
  kelurahan_orang_tua: '',
  kecamatan_orang_tua: '',
  kota_orang_tua: '',
  provinsi_orang_tua: '',
  nomor_telp_orang_tua: '',
  nomor_hp_orang_tua: '',
  status: 'active',
  tanggal_masuk: '',
  posisi: '',
  keterangan: '',
  
  // Relational data
  family_members: {
    ayah: {
      nama_keluarga: '',
      tempat_lahir_keluarga: '',
      tanggal_lahir_keluarga: '',
      pendidikan_terakhir: '',
      pekerjaan: ''
    },
    ibu: {
      nama_keluarga: '',
      tempat_lahir_keluarga: '',
      tanggal_lahir_keluarga: '',
      pendidikan_terakhir: '',
      pekerjaan: ''
    }
  },
  
  work_experiences: [],
  
  document_status: {
    surat_lamaran: false,
    cv: false,
    akte_kelahiran: false,
    kartu_keluarga: false,
    surat_pengalaman_kerja: false,
    ktp_sim: false,
    skck: false,
    pas_foto: false,
    ijazah: false,
    surat_sehat: false,
    npwp: false,
    bpjs_kesehatan: false,
    bpjs_ketenagakerjaan: false
  }
});

const documents = reactive({
  ktp: null,
  kartu_keluarga: null,
  npwp: null,
  bpjs_kesehatan: null,
  bpjs_ketenagakerjaan: null,
  skck: null,
  cv: null,
  surat_lamaran: null,
  surat_pengalaman_kerja: null,
});

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

// Work Experience Methods
const addWorkExperience = () => {
  form.work_experiences.push({
    nama_perusahaan: '',
    jabatan: '',
    tanggal_mulai: '',
    tanggal_berakhir: '',
    alasan_berhenti: '',
    gaji_terakhir: ''
  });
};

const removeWorkExperience = (index) => {
  form.work_experiences.splice(index, 1);
};

const handleFileChange = (key, event) => {
  const file = event.target.files[0] || null;
  documents[key] = file;

  const statusKeyMap = {
    ktp: 'ktp_sim',
    kartu_keluarga: 'kartu_keluarga',
    npwp: 'npwp',
    bpjs_kesehatan: 'bpjs_kesehatan',
    bpjs_ketenagakerjaan: 'bpjs_ketenagakerjaan',
    skck: 'skck',
    cv: 'cv',
    surat_lamaran: 'surat_lamaran',
    surat_pengalaman_kerja: 'surat_pengalaman_kerja',
  };

  const statusKey = statusKeyMap[key];
  if (statusKey) {
    form.document_status[statusKey] = !!file;
  }
};

const appendFormData = (formData, data, parentKey = '') => {
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    const fieldKey = parentKey ? `${parentKey}[${key}]` : key;

    if (typeof value === 'boolean') {
      formData.append(fieldKey, value ? 1 : 0);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => appendFormData(formData, item, `${fieldKey}[${index}]`));
    } else if (typeof value === 'object' && !(value instanceof File)) {
      appendFormData(formData, value, fieldKey);
    } else {
      formData.append(fieldKey, value);
    }
  });
};

const openAlert = (messages, title = "Form belum lengkap", type = "error") => {
  alertMessages.value = messages && messages.length ? messages : ["Terjadi kesalahan. Periksa kembali isian."];
  alertTitle.value = title;
  alertType.value = type;
  showAlert.value = true;
};

const validateForm = () => {
  const localErrors = {};
  const requiredFields = {
    nama: 'Nama Lengkap',
    tempat_lahir: 'Tempat Lahir',
    tanggal_lahir: 'Tanggal Lahir',
    jenis_kelamin: 'Jenis Kelamin',
    agama: 'Agama',
    suku_bangsa: 'Suku Bangsa',
    kewarganegaraan: 'Kewarganegaraan',
    alamat_ktp: 'Alamat KTP',
    rt_ktp: 'RT KTP',
    rw_ktp: 'RW KTP',
    kelurahan_ktp: 'Kelurahan KTP',
    kecamatan_ktp: 'Kecamatan KTP',
    kota_ktp: 'Kota KTP',
    provinsi_ktp: 'Provinsi KTP',
    nomor_hp: 'Nomor HP',
    email: 'Email',
    status: 'Status',
  };

  Object.entries(requiredFields).forEach(([key, label]) => {
    if (!form[key]) {
      localErrors[key] = [`${label} wajib diisi.`];
    }
  });

  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
    localErrors.email = ['Format email tidak valid.'];
  }

  if (form.nomor_hp && form.nomor_hp.length > 20) {
    localErrors.nomor_hp = ['Nomor HP terlalu panjang (maks 20 karakter).'];
  }

  const fileLimit = 5 * 1024 * 1024; // 5MB
  Object.entries(documents).forEach(([key, file]) => {
    if (file && file.size > fileLimit) {
      localErrors[`documents.${key}`] = ['Ukuran file maksimal 5MB.'];
    }
  });

  errors.value = localErrors;
  const msgs = Object.values(localErrors).flat();
  alertMessages.value = msgs;

  if (msgs.length) {
    openAlert(msgs, "Form belum lengkap", "error");
  }

  return Object.keys(localErrors).length === 0;
};

const submitForm = async () => {
  processing.value = true;
  errors.value = {};
  alertMessages.value = [];

  const isValid = validateForm();
  if (!isValid) {
    processing.value = false;
    return;
  }

  try {
    const payload = new FormData();
    appendFormData(payload, form);

    Object.entries(documents).forEach(([key, file]) => {
      if (file) {
        payload.append(`documents[${key}]`, file);
      }
    });

    const response = await fetch('/master-admin/employees', {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: payload
    });

    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await response.json() : {};

    if (response.ok) {
      window.location.href = '/master-admin/employees?success=' + encodeURIComponent(data.message || 'Karyawan berhasil ditambahkan.');
    } else {
      const parsedErrors = data.errors || {};
      errors.value = parsedErrors;
      const msgs = Object.values(parsedErrors).flat();
      alertMessages.value = msgs;

      if (Object.keys(parsedErrors).length === 0) {
        const text = contentType.includes('text') ? await response.text() : 'Gagal menyimpan data.';
        console.error('Response detail:', text);
        errors.value = { general: ['Gagal menyimpan data. Periksa kembali isian.'] };
        alertMessages.value = ['Gagal menyimpan data. Periksa kembali isian.'];
      } else {
        console.warn('Validation errors:', parsedErrors);
      }
      openAlert(alertMessages.value, "Validasi gagal", "error");
    }
  } catch (error) {
    console.error('Error:', error);
    openAlert(['Terjadi kesalahan saat mengirim data. Coba lagi.'], "Error", "error");
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped>
/* Custom Sage Colors - Same as Index */
.text-sage-500 { color: #8db580; }
.text-sage-600 { color: #8db580; }
.text-sage-700 { color: #7ba169; }
.text-sage-800 { color: #6b8f5e; }
.bg-sage-50 { background-color: #f4f6f3; }
.bg-sage-100 { background-color: #e8ece5; }
.bg-sage-200 { background-color: #d4ddd0; }
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.border-sage-200 { border-color: #d4ddd0; }
.border-sage-300 { border-color: #c0cdb8; }
.hover\:bg-sage-100:hover { background-color: #e8ece5; }
.hover\:bg-sage-200:hover { background-color: #d4ddd0; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
.focus\:border-sage-500:focus { border-color: #8db580; }
</style>
