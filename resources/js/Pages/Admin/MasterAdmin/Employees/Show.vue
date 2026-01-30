<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav
      class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50 lg:left-64"
    >
      <div class="px-4 sm:px-6 lg:px-8">
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
              Employee Details
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
                    {{ employee?.nama }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Header with Actions -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center">
              <div
                class="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mr-4"
              >
                <span class="text-white font-semibold text-lg">{{
                  getInitials(employee?.nama)
                }}</span>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-sage-800">{{ employee?.nama }}</h2>
                <p class="text-sage-600">ID: {{ employee?.employee_id }}</p>
                <div class="flex items-center mt-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="
                      employee?.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ employee?.status === "active" ? "Active" : "Inactive" }}
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <a
                :href="`/master-admin/employees/${employee?.id}/edit`"
                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              >
                <svg
                  class="w-4 h-4 mr-2"
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
                Edit Employee
              </a>
            </div>
          </div>
        </div>

        <!-- Employee Details -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Section 1: Data Pribadi -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">Data Pribadi</h3>
            </div>
            <div class="p-6 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Tempat Lahir</label>
                  <p class="text-gray-900">{{ employee?.tempat_lahir || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Tanggal Lahir</label>
                  <p class="text-gray-900">{{ formatDate(employee?.tanggal_lahir) }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                  <p class="text-gray-900">{{ employee?.jenis_kelamin || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Agama</label>
                  <p class="text-gray-900">{{ employee?.agama || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Suku Bangsa</label>
                  <p class="text-gray-900">{{ employee?.suku_bangsa || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Kewarganegaraan</label>
                  <p class="text-gray-900">{{ employee?.kewarganegaraan || '-' }}</p>
                </div>
              </div>

              <div>
                <label class="text-sm font-medium text-gray-500">Alamat Sesuai KTP</label>
                <p class="text-gray-900 mt-1">{{ employee?.alamat_ktp || '-' }}</p>
                <p v-if="employee?.rt_ktp || employee?.rw_ktp || employee?.kelurahan_ktp || employee?.kecamatan_ktp || employee?.kota_ktp || employee?.provinsi_ktp" class="text-gray-600 text-sm mt-1">
                  <span v-if="employee?.rt_ktp || employee?.rw_ktp">RT {{ employee?.rt_ktp || '-' }}/RW {{ employee?.rw_ktp || '-' }}</span><span v-if="(employee?.rt_ktp || employee?.rw_ktp) && (employee?.kelurahan_ktp || employee?.kecamatan_ktp || employee?.kota_ktp || employee?.provinsi_ktp)">, </span>
                  <span v-if="employee?.kelurahan_ktp">{{ employee.kelurahan_ktp }}</span><span v-if="employee?.kelurahan_ktp && (employee?.kecamatan_ktp || employee?.kota_ktp || employee?.provinsi_ktp)">, </span>
                  <span v-if="employee?.kecamatan_ktp">{{ employee.kecamatan_ktp }}</span><span v-if="employee?.kecamatan_ktp && (employee?.kota_ktp || employee?.provinsi_ktp)">, </span>
                  <span v-if="employee?.kota_ktp">{{ employee.kota_ktp }}</span><span v-if="employee?.kota_ktp && employee?.provinsi_ktp">, </span>
                  <span v-if="employee?.provinsi_ktp">{{ employee.provinsi_ktp }}</span>
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Email</label>
                  <p class="text-gray-900">{{ employee?.email || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor HP</label>
                  <p class="text-gray-900">{{ employee?.nomor_hp || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor Telp Rumah</label>
                  <p class="text-gray-900">{{ employee?.nomor_telp_rumah || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Instagram</label>
                  <p class="text-gray-900">{{ employee?.instagram || '-' }}</p>
                </div>
              </div>

              <div>
                <label class="text-sm font-medium text-gray-500">LinkedIn</label>
                <p class="text-gray-900">{{ employee?.linkedin || '-' }}</p>
              </div>
            </div>

            <!-- Emergency Contact Section -->
            <div v-if="employee?.nama_emergency || employee?.hubungan_emergency || employee?.nomor_telepon_emergency || employee?.alamat_emergency" class="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 class="text-md font-semibold text-yellow-800 mb-3">Emergency Contact (Kontak Darurat)</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-if="employee?.nama_emergency">
                  <label class="text-sm font-medium text-gray-500">Nama Kontak Darurat</label>
                  <p class="text-gray-900 font-semibold">{{ employee.nama_emergency }}</p>
                </div>
                <div v-if="employee?.hubungan_emergency">
                  <label class="text-sm font-medium text-gray-500">Hubungan</label>
                  <p class="text-gray-900">{{ employee.hubungan_emergency }}</p>
                </div>
                <div v-if="employee?.nomor_telepon_emergency">
                  <label class="text-sm font-medium text-gray-500">Nomor Telepon</label>
                  <p class="text-gray-900">{{ employee.nomor_telepon_emergency }}</p>
                </div>
                <div v-if="employee?.alamat_emergency" class="sm:col-span-2">
                  <label class="text-sm font-medium text-gray-500">Alamat</label>
                  <p class="text-gray-900">{{ employee.alamat_emergency }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Section 2: Data Orang Tua -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">Data Orang Tua</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Alamat Rumah Orang Tua</label>
                <p class="text-gray-900 mt-1">{{ employee?.alamat_orang_tua || '-' }}</p>
                <p v-if="employee?.rt_orang_tua || employee?.rw_orang_tua" class="text-gray-600 text-sm mt-1">
                  RT {{ employee?.rt_orang_tua || '-' }}/RW {{ employee?.rw_orang_tua || '-' }}, 
                  {{ employee?.kelurahan_orang_tua || '-' }}, {{ employee?.kecamatan_orang_tua || '-' }}, 
                  {{ employee?.kota_orang_tua || '-' }}, {{ employee?.provinsi_orang_tua || '-' }}
                </p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor Telp</label>
                  <p class="text-gray-900">{{ employee?.nomor_telp_orang_tua || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor HP</label>
                  <p class="text-gray-900">{{ employee?.nomor_hp_orang_tua || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Additional Information</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Tanggal Masuk</label>
                <p class="text-gray-900">{{ formatDate(employee?.tanggal_masuk) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Posisi</label>
                <p class="text-gray-900">{{ employee?.posisi || '-' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Status</label>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="
                    employee?.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                >
                  {{ employee?.status === "active" ? "Active" : "Inactive" }}
                </span>
              </div>
            </div>

            <div v-if="employee?.keterangan">
              <label class="text-sm font-medium text-gray-500">Keterangan</label>
              <p class="text-gray-900 mt-1">{{ employee?.keterangan }}</p>
            </div>
          </div>
        </div>

        <!-- Family Members Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.family_members?.length > 0">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Data Keluarga</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="family in employee.family_members" :key="family.id" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Hubungan</label>
                    <p class="text-gray-900">{{ family.hubungan_keluarga }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Nama</label>
                    <p class="text-gray-900">{{ family.nama_keluarga }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                    <p class="text-gray-900">{{ family.jenis_kelamin_keluarga === 'L' ? 'Laki-laki' : 'Perempuan' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Tempat, Tanggal Lahir</label>
                    <p class="text-gray-900">
                      <span v-if="family.tempat_lahir_keluarga">{{ family.tempat_lahir_keluarga }}</span><span v-if="family.tempat_lahir_keluarga && family.tanggal_lahir_keluarga">, </span><span v-if="family.tanggal_lahir_keluarga">{{ formatDate(family.tanggal_lahir_keluarga) }}</span>
                      <span v-if="!family.tempat_lahir_keluarga && !family.tanggal_lahir_keluarga">-</span>
                    </p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Pendidikan Terakhir</label>
                    <p class="text-gray-900">{{ family.pendidikan_terakhir || '-' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Pekerjaan</label>
                    <p class="text-gray-900">{{ family.pekerjaan || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Family Members State -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-else>
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Data Keluarga</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-500 text-center py-4">Tidak ada data keluarga yang tercatat.</p>
          </div>
        </div>

        <!-- Work Experience Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.work_experiences?.length > 0">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Pengalaman Kerja</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="work in employee.work_experiences" :key="work.id" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Nama Perusahaan</label>
                    <p class="text-gray-900 font-semibold">{{ work.nama_perusahaan }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Jabatan</label>
                    <p class="text-gray-900">{{ work.jabatan }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Periode</label>
                    <p class="text-gray-900">
                      {{ formatDate(work.tanggal_mulai) }} - {{ work.tanggal_berakhir ? formatDate(work.tanggal_berakhir) : 'Sekarang' }}
                    </p>
                  </div>
                  <div v-if="work.gaji_terakhir">
                    <label class="text-sm font-medium text-gray-500">Gaji Terakhir</label>
                    <p class="text-gray-900">{{ formatCurrency(work.gaji_terakhir) }}</p>
                  </div>
                  <div v-if="work.alasan_berhenti" class="sm:col-span-2">
                    <label class="text-sm font-medium text-gray-500">Alasan Berhenti</label>
                    <p class="text-gray-900">{{ work.alasan_berhenti }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Work Experience State -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-else>
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Pengalaman Kerja</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-500 text-center py-4">Tidak ada pengalaman kerja yang tercatat.</p>
          </div>
        </div>

        <!-- Health Records Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.health_records?.length > 0">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Riwayat Kesehatan</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="health in employee.health_records" :key="health.id" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Jenis Penyakit</label>
                    <p class="text-gray-900">{{ health.jenis_penyakit }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Periode Sakit</label>
                    <p class="text-gray-900">{{ formatDate(health.periode_sakit) }}</p>
                  </div>
                  <div v-if="health.tindakan_medis" class="sm:col-span-2">
                    <label class="text-sm font-medium text-gray-500">Tindakan Medis</label>
                    <p class="text-gray-900">{{ health.tindakan_medis }}</p>
                  </div>
                  <div v-if="health.keterangan" class="sm:col-span-2">
                    <label class="text-sm font-medium text-gray-500">Keterangan</label>
                    <p class="text-gray-900">{{ health.keterangan }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Health Records State -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-else>
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Riwayat Kesehatan</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-500 text-center py-4">Tidak ada riwayat kesehatan yang tercatat.</p>
          </div>
        </div>

        <!-- Company References Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.company_references?.length > 0">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Referensi Perusahaan</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="reference in employee.company_references" :key="reference.id" class="border border-gray-200 rounded-lg p-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="text-sm font-medium text-gray-500">Nama Referensi</label>
                    <p class="text-gray-900 font-semibold">{{ reference.nama_referensi }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-500">Jabatan</label>
                    <p class="text-gray-900">{{ reference.jabatan_referensi }}</p>
                  </div>
                  <div v-if="reference.nomor_telepon_referensi">
                    <label class="text-sm font-medium text-gray-500">Nomor Telepon</label>
                    <p class="text-gray-900">{{ reference.nomor_telepon_referensi }}</p>
                  </div>
                  <div v-if="reference.email_referensi">
                    <label class="text-sm font-medium text-gray-500">Email</label>
                    <p class="text-gray-900">{{ reference.email_referensi }}</p>
                  </div>
                  <div v-if="reference.hubungan" class="sm:col-span-2">
                    <label class="text-sm font-medium text-gray-500">Hubungan</label>
                    <p class="text-gray-900">{{ reference.hubungan }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Company References State -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-else>
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Referensi Perusahaan</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-500 text-center py-4">Tidak ada referensi perusahaan yang tercatat.</p>
          </div>
        </div>

        <!-- Document Status Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.document_statuses?.length > 0">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Status Dokumen</h3>
          </div>
          <div class="p-6 space-y-4">
            <div v-for="docStatus in employee.document_statuses" :key="docStatus.id">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div
                  v-for="field in documentStatusFields"
                  :key="field.key"
                  class="flex items-center justify-between border border-sage-200 rounded px-3 py-2"
                >
                  <span class="text-sm">{{ field.label }}</span>
                  <span
                    class="text-xs font-semibold"
                    :class="docStatus[field.key] ? 'text-green-700' : 'text-red-700'"
                  >
                    {{ docStatus[field.key] ? 'Ada' : 'Belum ada' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty Document Status State -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-else>
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Status Dokumen</h3>
          </div>
          <div class="p-6">
            <p class="text-gray-500 text-center py-4">Tidak ada status dokumen yang tercatat.</p>
          </div>
        </div>

        <!-- Document Attachments -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" v-if="employee?.documents?.length">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Lampiran Dokumen</h3>
          </div>
          <div class="p-6 space-y-3">
            <div
              v-for="doc in employee.documents"
              :key="doc.id"
              class="flex items-start justify-between border border-sage-200 rounded px-3 py-2"
            >
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ formatDocumentLabel(doc.type) }}</p>
                <p class="text-xs text-gray-600">
                  {{ doc.original_name || 'File' }} <span v-if="doc.size">({{ formatFileSize(doc.size) }})</span>
                </p>
              </div>
              <a
                :href="`/storage/${doc.path}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sage-700 text-sm font-semibold hover:text-sage-900"
              >
                Lihat
              </a>
            </div>
          </div>
        </div>

        <!-- Metadata -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Record Information</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500">Created At</label>
                <p class="text-gray-900">{{ formatDateTime(employee?.created_at) }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-500">Last Updated</label>
                <p class="text-gray-900">{{ formatDateTime(employee?.updated_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue";

// Props
const props = defineProps({
  employee: Object,
});

// Reactive state
const isMobileSidebarOpen = ref(false);

// Methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const getInitials = (name) => {
  if (!name) return "E";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatCurrency = (amount) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const documentStatusFields = [
  { key: 'surat_lamaran', label: 'Surat Lamaran' },
  { key: 'cv', label: 'CV' },
  { key: 'akte_kelahiran', label: 'Akte Kelahiran' },
  { key: 'kartu_keluarga', label: 'Kartu Keluarga' },
  { key: 'surat_pengalaman_kerja', label: 'Surat Pengalaman Kerja' },
  { key: 'ktp_sim', label: 'KTP/SIM' },
  { key: 'skck', label: 'SKCK' },
  { key: 'pas_foto', label: 'Pas Foto' },
  { key: 'ijazah', label: 'Ijazah' },
  { key: 'surat_sehat', label: 'Surat Sehat' },
  { key: 'npwp', label: 'NPWP' },
  { key: 'bpjs_kesehatan', label: 'BPJS Kesehatan' },
  { key: 'bpjs_ketenagakerjaan', label: 'BPJS Ketenagakerjaan' },
];

const formatDocumentLabel = (type) => {
  const map = {
    ktp: 'KTP',
    kartu_keluarga: 'Kartu Keluarga',
    npwp: 'NPWP',
    bpjs_kesehatan: 'BPJS Kesehatan',
    bpjs_ketenagakerjaan: 'BPJS Ketenagakerjaan',
    skck: 'SKCK',
    cv: 'CV',
    surat_lamaran: 'Surat Lamaran',
    surat_pengalaman_kerja: 'Surat Pengalaman Kerja',
  };

  return map[type] || 'Dokumen';
};

const formatFileSize = (size) => {
  if (!size) return '-';
  const kb = size / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(0)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
};
</script>

<style scoped>
/* Custom Sage Colors - Same as other components */
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
