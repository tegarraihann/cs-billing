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
              Edit Service
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
    <SidebarNavigation
      :is-mobile-sidebar-open="isMobileSidebarOpen"
      @close-mobile-sidebar="closeMobileSidebar"
    />

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
                <Link
                  :href="dashboardRoute"
                  class="text-sage-600 hover:text-sage-800"
                  >Dashboard</Link
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
                  <Link
                    :href="servicesRoute"
                    class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2"
                    >Kelola Service</Link
                  >
                </div>
              </li>
              <li aria-current="page">
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
                  <span class="ml-1 text-sage-500 md:ml-2">Edit Service</span>
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
              <h2 class="text-2xl font-bold text-sage-800 mb-2">
                Edit Service
              </h2>
              <p class="text-sage-600">
                Perbarui informasi service "{{ service?.title }}"
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <!-- FIXED: Using Link instead of <a> tag -->
              <Link
                :href="servicesRoute"
                class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke Daftar
              </Link>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">
              Informasi Service
            </h3>
            <p class="text-sm text-sage-600 mt-1">Perbarui detail service</p>
          </div>

          <form @submit.prevent="submitForm" class="p-6">
            <div class="space-y-6">
              <!-- Title -->
              <div>
                <label
                  for="title"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Judul Service <span class="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  required
                  placeholder="Masukkan judul service"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.title }"
                />
                <div v-if="errors.title" class="mt-1 text-sm text-red-600">
                  {{ errors.title[0] }}
                </div>
              </div>

              <!-- Description -->
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Deskripsi <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  required
                  placeholder="Masukkan deskripsi service"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.description }"
                ></textarea>
                <div
                  v-if="errors.description"
                  class="mt-1 text-sm text-red-600"
                >
                  {{ errors.description[0] }}
                </div>
              </div>

              <!-- Current Image -->
              <div v-if="service?.image_path">
                <label class="block text-sm font-medium text-sage-700 mb-2"
                  >Gambar Saat Ini</label
                >
                <div class="mb-4">
                  <img
                    :src="`/storage/${service.image_path}`"
                    :alt="service.title"
                    class="w-32 h-32 object-cover rounded border"
                  />
                </div>
              </div>

              <!-- Service Image Upload -->
              <div>
                <label
                  for="image_path"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  {{
                    service?.image_path
                      ? "Ganti Gambar Service"
                      : "Gambar Service"
                  }}
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="image_path"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500"
                      >
                        <span>Upload gambar baru</span>
                        <input
                          id="image_path"
                          type="file"
                          class="sr-only"
                          accept="image/*"
                          @change="handleFileUpload($event, 'image_path')"
                        />
                      </label>
                      <p class="pl-1">atau drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF hingga 2MB
                    </p>
                  </div>
                </div>
                <div v-if="imagePreview" class="mt-4">
                  <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="w-32 h-32 object-cover rounded border"
                  />
                </div>
                <div v-if="errors.image_path" class="mt-1 text-sm text-red-600">
                  {{ errors.image_path[0] }}
                </div>
              </div>

              <!-- Current Icon -->
              <div v-if="service?.icon_path">
                <label class="block text-sm font-medium text-sage-700 mb-2"
                  >Icon Saat Ini</label
                >
                <div class="mb-4">
                  <img
                    :src="`/storage/${service.icon_path}`"
                    :alt="service.title"
                    class="w-16 h-16 object-cover rounded border"
                  />
                </div>
              </div>

              <!-- Icon Upload -->
              <div>
                <label
                  for="icon_path"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  {{
                    service?.icon_path ? "Ganti Icon Service" : "Icon Service"
                  }}
                </label>
                <div
                  class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21a4 4 0 01-4-4V5a4 4 0 014-4h2M7 21h10a4 4 0 004-4V5a4 4 0 00-4-4H9M7 21V8a3 3 0 013-3h4a3 3 0 013 3v13"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="icon_path"
                        class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500"
                      >
                        <span>Upload icon baru</span>
                        <input
                          id="icon_path"
                          type="file"
                          class="sr-only"
                          accept="image/*"
                          @change="handleFileUpload($event, 'icon_path')"
                        />
                      </label>
                      <p class="pl-1">atau drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, SVG hingga 2MB
                    </p>
                  </div>
                </div>
                <div v-if="iconPreview" class="mt-4">
                  <p class="text-sm text-gray-600 mb-2">Preview icon baru:</p>
                  <img
                    :src="iconPreview"
                    alt="Icon Preview"
                    class="w-16 h-16 object-cover rounded border"
                  />
                </div>
                <div v-if="errors.icon_path" class="mt-1 text-sm text-red-600">
                  {{ errors.icon_path[0] }}
                </div>
              </div>

              <!-- Order Index and Status -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="order_index"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
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
                  <p class="text-xs text-gray-500 mt-1">
                    Semakin kecil nomor, semakin awal ditampilkan
                  </p>
                  <div
                    v-if="errors.order_index"
                    class="mt-1 text-sm text-red-600"
                  >
                    {{ errors.order_index[0] }}
                  </div>
                </div>

                <div>
                  <label
                    for="is_active"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
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
            <div
              class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3"
            >
              <!-- FIXED: Using Link instead of <a> tag -->
              <Link
                :href="servicesRoute"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="form.processing">Menyimpan...</span>
                <span v-else>Update Service</span>
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
import { router, useForm } from "@inertiajs/vue3";
import { Link } from "@inertiajs/vue3";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue";

// Props
const props = defineProps({
  service: Object,
  errors: Object,
});

// FIXED: Using proper route helpers like other files
const dashboardRoute = route("masteradmin.dashboard");
const usersRoute = route("masteradmin.users.index");
const pengaturanUmumRoute = route(
  "masteradmin.website-settings.pengaturan-umum.index"
);
const servicesRoute = route("masteradmin.website-settings.services.index");
const supportServicesRoute = route(
  "masteradmin.website-settings.support-services.index"
);
const teamRoute = route("masteradmin.website-settings.team.index");
const homeRoute = route("home");

// Reactive state
const isMobileSidebarOpen = ref(false);
const imagePreview = ref(null);
const iconPreview = ref(null);
const errors = ref(props.errors || {});

// FIXED: Using useForm from Inertia.js like other files
const form = useForm({
  title: props.service?.title || "",
  description: props.service?.description || "",
  features: props.service?.features || [],
  category: props.service?.category || "",
  image_path: null,
  icon_path: null,
  order_index: props.service?.order_index || 0,
  is_active: props.service?.is_active ?? true,
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

const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === "image_path") {
    form.image_path = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else if (type === "icon_path") {
    form.icon_path = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      iconPreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// FIXED: Using useForm.post() method with _method override for PUT
const submitForm = () => {
  errors.value = {};

  // Use POST with _method override for file uploads
  form.post(
    route("masteradmin.website-settings.services.update", props.service.id),
    {
      _method: "PUT",
      onSuccess: () => {
        // Success will be handled by redirect or flash message
      },
      onError: (formErrors) => {
        errors.value = formErrors;
      },
    }
  );
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
  console.log("Service data:", props.service);
  console.log("Form data:", form);
  console.log("Errors:", props.errors);
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
.border-sage-300 {
  border-color: #c0cdb8;
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
.hover\:text-sage-500:hover {
  color: #9bc088;
}
.hover\:text-sage-700:hover {
  color: #7ba169;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}
.focus-within\:ring-sage-500:focus-within {
  --tw-ring-color: #8db580;
}
</style>
