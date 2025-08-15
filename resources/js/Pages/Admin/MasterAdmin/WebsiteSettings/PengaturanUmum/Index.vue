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
              Pengaturan Umum
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

    <!-- Sidebar (sama seperti dashboard) -->
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
                  <span class="ml-1 text-sage-500 md:ml-2"
                    >Pengaturan Umum</span
                  >
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
                Pengaturan Umum Website
              </h2>
              <p class="text-sage-600">
                Kelola pengaturan dasar dan konten utama website
              </p>
            </div>
          </div>
        </div>

        <!-- Settings Form -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Pengaturan Umum</h3>
            <p class="text-sm text-sage-600 mt-1">
              Ubah pengaturan dasar website Anda
            </p>
          </div>

          <form @submit.prevent="updateSettings" class="p-6 space-y-6">
            <!-- Hero Background Image -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Background Hero</label
              >
              <div class="flex items-center space-x-4">
                <div v-if="settings?.hero_background_image" class="relative">
                  <img
                    :src="`/storage/${settings.hero_background_image}`"
                    alt="Hero Background"
                    class="w-32 h-20 object-cover rounded border"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    @change="handleFileUpload($event, 'hero_background_image')"
                    accept="image/*"
                    class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700 hover:file:bg-sage-100"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Maksimal 5MB (JPEG, PNG, JPG, GIF)
                  </p>
                </div>
              </div>
            </div>

            <!-- Company Name -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Nama Perusahaan <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.company_name"
                type="text"
                required
                placeholder="PT ESHAKA WIJAYA LOGISTICS"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Nama perusahaan yang akan ditampilkan di hero section
              </p>
            </div>

            <!-- Company Description -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Deskripsi Perusahaan</label
              >
              <textarea
                v-model="form.company_description"
                rows="4"
                placeholder="Trusted solutions for your international export-import and logistics needs with professional and experienced services."
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              ></textarea>
              <p class="text-xs text-gray-500 mt-1">
                Deskripsi singkat perusahaan yang akan ditampilkan di bawah nama
                perusahaan
              </p>
            </div>

            <!-- Trust Badge Text -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Badge Kepercayaan</label
              >
              <input
                v-model="form.trust_badge_text"
                type="text"
                placeholder="Trusted for over 20 Years"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
              <p class="text-xs text-gray-500 mt-1">
                Teks badge kepercayaan yang akan ditampilkan di hero section
              </p>
            </div>

            <!-- Contact Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2"
                  >Nomor Telepon</label
                >
                <input
                  v-model="form.contact_phone"
                  type="text"
                  placeholder="+62 21 1234567"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2"
                  >Email</label
                >
                <input
                  v-model="form.contact_email"
                  type="email"
                  placeholder="info@example.com"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2"
                  >WhatsApp (format: 628xxxxxxxxx)</label
                >
                <input
                  v-model="form.whatsapp_number"
                  type="text"
                  placeholder="628123456789"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
            </div>

            <!-- SEO Settings -->
            <div class="pt-6 border-t border-sage-200">
              <h4 class="text-lg font-medium text-sage-800 mb-4">
                SEO Settings
              </h4>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2"
                    >Meta Description</label
                  >
                  <textarea
                    v-model="form.meta_description"
                    rows="3"
                    placeholder="Deskripsi website untuk SEO"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                  ></textarea>
                  <p class="text-xs text-gray-500 mt-1">
                    Maksimal 160 karakter untuk hasil pencarian yang optimal
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2"
                    >Meta Keywords</label
                  >
                  <input
                    v-model="form.meta_keywords"
                    type="text"
                    placeholder="logistics, export, import, shipping"
                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Pisahkan dengan koma untuk kata kunci yang berbeda
                  </p>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-6 border-t border-sage-200">
              <button
                type="submit"
                :disabled="loading"
                class="bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 disabled:opacity-50 transition-colors"
              >
                <span v-if="loading">Menyimpan...</span>
                <span v-else>Simpan Pengaturan</span>
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
  settings: Object,
});

// Routes
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/services";
const supportServiceRoute = "/master-admin/website-settings/support-services";
const teamRoute = "/master-admin/website-settings/team";
import SidebarNavigation from "@/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue";

// Reactive state
const isMobileSidebarOpen = ref(false);
const loading = ref(false);

// Form data
const form = reactive({
  company_name: props.settings?.company_name || "",
  company_description: props.settings?.company_description || "",
  trust_badge_text:
    props.settings?.trust_badge_text || "Trusted for over 20 Years",
  contact_phone: props.settings?.contact_phone || "",
  contact_email: props.settings?.contact_email || "",
  whatsapp_number: props.settings?.whatsapp_number || "",
  meta_description: props.settings?.meta_description || "",
  meta_keywords: props.settings?.meta_keywords || "",
  hero_background_image: null,
  company_logo: null,
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

  if (type === "hero_background_image") {
    form.hero_background_image = file;
  } else if (type === "company_logo") {
    form.company_logo = file;
  }
};

const updateSettings = () => {
  loading.value = true;

  const formData = new FormData();

  // Add text fields
  const textFields = [
    "company_name",
    "company_description",
    "trust_badge_text",
    "contact_phone",
    "contact_email",
    "whatsapp_number",
    "meta_description",
    "meta_keywords",
  ];

  textFields.forEach((field) => {
    const value = form[field];
    if (value !== null && value !== "" && value !== undefined) {
      formData.append(field, value);
    }
  });

  // Handle file uploads
  if (
    form.hero_background_image &&
    form.hero_background_image instanceof File
  ) {
    formData.append("hero_background_image", form.hero_background_image);
  }

  if (form.company_logo && form.company_logo instanceof File) {
    formData.append("company_logo", form.company_logo);
  }

  formData.append("_method", "PUT");

  router.post(
    route("masteradmin.website-settings.pengaturan-umum.update"),
    formData,
    {
      onSuccess: () => {
        form.hero_background_image = null;
        form.company_logo = null;
      },
      onError: (errors) => {
        console.error("Errors:", errors);
        alert("Error: " + JSON.stringify(errors));
      },
      onFinish: () => {
        loading.value = false;
      },
      preserveState: false,
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
  console.log("Settings data:", props.settings);
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

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
