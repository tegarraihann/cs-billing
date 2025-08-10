<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50">
      <div class="px-4 sm:px-6 lg:ml-64 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button @click="toggleMobileSidebar" class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800">Tambah Anggota Tim</h1>
          </div>

          <!-- User Profile Dropdown -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Dropdown align="right" width="48">
              <template #trigger>
                <button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors">
                  <div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-xs sm:text-sm">
                      {{ getInitials($page.props.auth.user?.name) }}
                    </span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <p class="text-sm font-medium text-sage-700">{{ $page.props.auth.user?.name }}</p>
                    <p class="text-xs text-sage-500">Master Administrator</p>
                  </div>
                  <svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
              </template>

              <template #content>
                <div class="py-1">
                  <DropdownLink :href="route('profile.edit')" class="flex items-center space-x-2 px-4 py-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>Profile</span>
                  </DropdownLink>

                  <div class="border-t border-gray-100 my-1"></div>

                  <DropdownLink :href="route('logout')" method="post" as="button" class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
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

    <!-- Sidebar (sama seperti yang lain) -->
    <aside class="fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0" :class="{ 'translate-x-0': isMobileSidebarOpen, '-translate-x-full': !isMobileSidebarOpen }">
      <!-- Sidebar content sama seperti create -->
      <div class="px-6 py-6 border-b border-sage-200">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-sage-700">Master Admin</h2>
            <p class="text-xs text-sage-500">Full System Control</p>
          </div>
        </div>
      </div>

      <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
        <a :href="dashboardRoute" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span class="font-medium">Dashboard</span>
        </a>

        <a :href="usersRoute" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
          <span class="font-medium">User Management</span>
        </a>

        <div class="space-y-1">
          <div class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800">
            <div class="flex items-center space-x-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span class="font-medium">Website Settings</span>
            </div>
          </div>

          <div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4">
            <a :href="pengaturanUmumRoute" class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
              <span>Pengaturan Umum</span>
            </a>

            <a :href="serviceRoute" class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"/>
              </svg>
              <span>Service</span>
            </a>

            <a :href="teamRoute" class="flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
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
        <div v-if="$page.props.flash?.success" class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ $page.props.flash.success }}</span>
        </div>

        <div v-if="$page.props.flash?.error" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ $page.props.flash.error }}</span>
        </div>

        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a :href="dashboardRoute" class="text-sage-600 hover:text-sage-800">Dashboard</a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <a :href="teamRoute" class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2">Kelola Tim</a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="ml-1 text-sage-500 md:ml-2">Tambah Anggota Tim</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Header Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 class="text-2xl font-bold text-sage-800 mb-2">Tambah Anggota Tim Baru</h2>
              <p class="text-sage-600">Buat profil anggota tim baru untuk ditampilkan di website</p>
            </div>
            <div class="mt-4 sm:mt-0">
              <a :href="teamRoute" class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Kembali ke Daftar
              </a>
            </div>
          </div>
        </div>

        <!-- Create Form -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Informasi Anggota Tim</h3>
            <p class="text-sm text-sage-600 mt-1">Lengkapi detail anggota tim baru</p>
          </div>

          <form @submit.prevent="submitForm" class="p-6">
            <div class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-sage-700 mb-2">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.name }"
                />
                <div v-if="errors.name" class="mt-1 text-sm text-red-600">
                  {{ errors.name[0] }}
                </div>
              </div>

              <!-- Position -->
              <div>
                <label for="position" class="block text-sm font-medium text-sage-700 mb-2">
                  Jabatan <span class="text-red-500">*</span>
                </label>
                <input
                  id="position"
                  v-model="form.position"
                  type="text"
                  required
                  placeholder="Contoh: CEO, Manager, Supervisor"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.position }"
                />
                <div v-if="errors.position" class="mt-1 text-sm text-red-600">
                  {{ errors.position[0] }}
                </div>
              </div>

              <!-- Phone Number -->
              <div>
                <label for="phone_number" class="block text-sm font-medium text-sage-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  id="phone_number"
                  v-model="form.phone_number"
                  type="text"
                  placeholder="08123456789 atau +6281234567890"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.phone_number }"
                />
                <p class="text-xs text-gray-500 mt-1">Format: 08xxxxxxxxx atau +628xxxxxxxxx</p>
                <div v-if="errors.phone_number" class="mt-1 text-sm text-red-600">
                  {{ errors.phone_number[0] }}
                </div>
              </div>

              <!-- Photo Upload -->
              <div>
                <label for="photo_path" class="block text-sm font-medium text-sage-700 mb-2">
                  Foto Profil
                </label>
                <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label for="photo_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500">
                        <span>Upload foto</span>
                        <input
                          id="photo_path"
                          type="file"
                          class="sr-only"
                          accept="image/*"
                          @change="handleFileUpload($event)"
                        />
                      </label>
                      <p class="pl-1">atau drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF hingga 2MB</p>
                  </div>
                </div>
                <div v-if="photoPreview" class="mt-4 text-center">
                  <img :src="photoPreview" alt="Preview" class="w-32 h-32 object-cover rounded-full border mx-auto"/>
                </div>
                <div v-if="errors.photo_path" class="mt-1 text-sm text-red-600">
                  {{ errors.photo_path[0] }}
                </div>
              </div>

              <!-- Order Index and Status -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="order_index" class="block text-sm font-medium text-sage-700 mb-2">
                    Urutan Tampil
                  </label>
                  <input
                    id="order_index"
                    v-model.number="form.order_index"
                    type="number"
                    min="0"
                    placeholder="0"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-300': errors.order_index }"
                  />
                  <p class="text-xs text-gray-500 mt-1">Semakin kecil nomor, semakin awal ditampilkan</p>
                  <div v-if="errors.order_index" class="mt-1 text-sm text-red-600">
                    {{ errors.order_index[0] }}
                  </div>
                </div>

                <div>
                  <label for="is_active" class="block text-sm font-medium text-sage-700 mb-2">
                    Status
                  </label>
                  <select
                    id="is_active"
                    v-model="form.is_active"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  >
                    <option :value="true">Aktif</option>
                    <option :value="false">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3">
              <a
                :href="teamRoute"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </a>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Menyimpan...</span>
                <span v-else>Simpan Anggota Tim</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { router } from "@inertiajs/vue3";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

// Props
const props = defineProps({
  errors: Object,
});

// Routes
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/service";
const teamRoute = "/master-admin/website-settings/team";

// Reactive state
const isMobileSidebarOpen = ref(false);
const isSubmitting = ref(false);
const photoPreview = ref(null);
const errors = ref(props.errors || {});

// Form data
const form = reactive({
  name: "",
  position: "",
  phone_number: "",
  photo_path: null,
  order_index: 0,
  is_active: true,
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

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  form.photo_path = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    photoPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errors.value = {};

  try {
    const formData = new FormData();

    // Add CSRF token
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (csrfToken) {
      formData.append("_token", csrfToken);
    }

    // Add form fields
    formData.append("name", form.name);
    formData.append("position", form.position);
    formData.append("phone_number", form.phone_number || "");
    formData.append("order_index", form.order_index);
    formData.append("is_active", form.is_active ? 1 : 0);

    // Add photo if selected
    if (form.photo_path) {
      formData.append("photo_path", form.photo_path);
    }

    // Submit form using router
    router.post(route("masteradmin.website-settings.team.store"), formData, {
      onSuccess: () => {
        // Redirect handled by backend
      },
      onError: (formErrors) => {
        errors.value = formErrors;
        console.error('Form errors:', formErrors);
      },
      onFinish: () => {
        isSubmitting.value = false;
      },
      preserveState: false,
    });
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Terjadi kesalahan saat mengirim data: " + error.message);
    isSubmitting.value = false;
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
  console.log("Errors:", props.errors);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Custom Sage Colors */
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
.hover\:bg-sage-50:hover { background-color: #f4f6f3; }
.hover\:bg-sage-100:hover { background-color: #e8ece5; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.hover\:text-sage-500:hover { color: #9bc088; }
.hover\:text-sage-700:hover { color: #7ba169; }
.hover\:text-sage-800:hover { color: #6b8f5e; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
.focus\:border-sage-500:focus { border-color: #8db580; }
.focus-within\:ring-sage-500:focus-within { --tw-ring-color: #8db580; }
</style>
