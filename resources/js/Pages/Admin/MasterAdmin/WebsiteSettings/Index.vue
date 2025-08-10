<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Pengaturan Website</h1>
            <p class="mt-1 text-sm text-gray-500">
              Kelola konten dinamis website
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-8">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.key
                ? 'border-sage-600 text-sage-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- General Settings Tab -->
      <div
        v-if="activeTab === 'general'"
        class="bg-white shadow rounded-lg p-6"
      >
        <h2 class="text-lg font-semibold mb-6">Pengaturan Umum</h2>

        <form @submit.prevent="updateSettings" class="space-y-6">
          <!-- Hero Background Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Background Hero
            </label>
            <div class="flex items-center space-x-4">
              <div v-if="settings.hero_background_image" class="relative">
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
                  Maksimal 2MB (JPEG, PNG, JPG, GIF)
                </p>
              </div>
            </div>
          </div>

          <!-- Company Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Perusahaan
            </label>
            <input
              v-model="settingsForm.company_name"
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
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Perusahaan
            </label>
            <textarea
              v-model="settingsForm.company_description"
              rows="4"
              placeholder="Trusted solutions for your international export-import and logistics needs with professional and experienced services."
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Deskripsi singkat perusahaan yang akan ditampilkan di bawah nama perusahaan
            </p>
          </div>

          <!-- Trust Badge Text -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Badge Kepercayaan
            </label>
            <input
              v-model="settingsForm.trust_badge_text"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <input
                v-model="settingsForm.contact_phone"
                type="text"
                placeholder="+62 21 1234567"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                v-model="settingsForm.contact_email"
                type="email"
                placeholder="info@example.com"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp (format: 628xxxxxxxxx)
              </label>
              <input
                v-model="settingsForm.whatsapp_number"
                type="text"
                placeholder="628123456789"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="loading"
              class="bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 disabled:opacity-50"
            >
              <span v-if="loading">Menyimpan...</span>
              <span v-else>Simpan Pengaturan</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Services Tab -->
      <div v-if="activeTab === 'services'" class="space-y-6">
        <!-- Add Service Form -->
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold">Kelola Services</h2>
            <button
              @click="showServiceModal = true"
              class="bg-sage-600 text-white px-4 py-2 rounded-md hover:bg-sage-700"
            >
              Tambah Service
            </button>
          </div>

          <!-- Services List -->
          <div class="space-y-4">
            <div
              v-for="service in services"
              :key="service.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="flex justify-between items-start">
                <div class="flex space-x-4">
                  <div v-if="service.image_path" class="flex-shrink-0">
                    <img
                      :src="`/storage/${service.image_path}`"
                      alt="Service Image"
                      class="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div>
                    <h3 class="font-medium text-gray-900">
                      {{ service.title }}
                    </h3>
                    <p class="text-sm text-gray-500 mt-1">
                      {{ service.description }}
                    </p>
                    <div class="flex items-center mt-2 space-x-4">
                      <span
                        :class="[
                          'px-2 py-1 text-xs rounded-full',
                          service.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800',
                        ]"
                      >
                        {{ service.is_active ? "Aktif" : "Tidak Aktif" }}
                      </span>
                      <span class="text-xs text-gray-500"
                        >Urutan: {{ service.order_index }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button
                    @click="editService(service)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteService(service.id)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Members Tab -->
      <div v-if="activeTab === 'team'" class="space-y-6">
        <div class="bg-white shadow rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-lg font-semibold">Kelola Tim</h2>
            <button
              @click="showTeamModal = true"
              class="bg-sage-600 text-white px-4 py-2 rounded-md hover:bg-sage-700"
            >
              Tambah Anggota Tim
            </button>
          </div>

          <!-- Team Members List -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="member in teamMembers"
              :key="member.id"
              class="border border-gray-200 rounded-lg p-4"
            >
              <div class="text-center">
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
                      class="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 class="font-medium text-gray-900">{{ member.name }}</h3>
                <p class="text-sm text-gray-500">{{ member.position }}</p>

                <!-- Display Phone Number instead of Quote -->
                <div
                  v-if="member.phone_number"
                  class="text-xs text-blue-600 mt-2 flex items-center justify-center space-x-1"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <span>{{ member.phone_number }}</span>
                </div>

                <div class="flex justify-center space-x-2 mt-4">
                  <button
                    @click="editTeamMember(member)"
                    class="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteTeamMember(member.id)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <Modal v-if="showServiceModal" @close="showServiceModal = false">
      <div class="p-6">
        <h3 class="text-lg font-medium mb-4">
          {{ editingService ? "Edit Service" : "Tambah Service" }}
        </h3>

        <form @submit.prevent="saveService" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Judul</label
            >
            <input
              v-model="serviceForm.title"
              type="text"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Deskripsi</label
            >
            <textarea
              v-model="serviceForm.description"
              rows="3"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Gambar Service</label
            >
            <input
              type="file"
              @change="handleFileUpload($event, 'service_image')"
              accept="image/*"
              class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Urutan</label
            >
            <input
              v-model.number="serviceForm.order_index"
              type="number"
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showServiceModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-sage-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-sage-700"
            >
              {{ editingService ? "Update" : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </Modal>

    <!-- Team Member Modal -->
    <Modal v-if="showTeamModal" @close="showTeamModal = false">
      <div class="p-6">
        <h3 class="text-lg font-medium mb-4">
          {{ editingTeamMember ? "Edit Anggota Tim" : "Tambah Anggota Tim" }}
        </h3>

        <form @submit.prevent="saveTeamMember" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nama</label
            >
            <input
              v-model="teamForm.name"
              type="text"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Jabatan</label
            >
            <input
              v-model="teamForm.position"
              type="text"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Foto</label
            >
            <input
              type="file"
              @change="handleFileUpload($event, 'team_photo')"
              accept="image/*"
              class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700"
            />
          </div>

          <!-- Changed from Quote to Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nomor Telepon</label
            >
            <input
              v-model="teamForm.phone_number"
              type="text"
              placeholder="08123456789 atau +6281234567890"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
            <p class="text-xs text-gray-500 mt-1">
              Format: 08xxxxxxxxx atau +628xxxxxxxxx
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Urutan</label
            >
            <input
              v-model.number="teamForm.order_index"
              type="number"
              min="0"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showTeamModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-sage-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-sage-700"
            >
              {{ editingTeamMember ? "Update" : "Simpan" }}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { router } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";

// Props
const props = defineProps({
  settings: Object,
  services: Array,
  teamMembers: Array,
});

// Reactive state
const activeTab = ref("general");
const loading = ref(false);
const showServiceModal = ref(false);
const showTeamModal = ref(false);
const editingService = ref(null);
const editingTeamMember = ref(null);

// Tabs configuration
const tabs = [
  { key: "general", name: "Pengaturan Umum" },
  { key: "services", name: "Services" },
  { key: "team", name: "Tim" },
];

// Forms
const settingsForm = reactive({
  company_name: props.settings?.company_name || "",
  company_description: props.settings?.company_description || "",
  trust_badge_text: props.settings?.trust_badge_text || "Trusted for over 20 Years",
  contact_phone: props.settings?.contact_phone || "",
  contact_email: props.settings?.contact_email || "",
  whatsapp_number: props.settings?.whatsapp_number || "",
  hero_background_image: null,
  company_logo: null,
});

const serviceForm = reactive({
  title: "",
  description: "",
  image_path: null,
  order_index: 0,
});

// Updated teamForm with phone_number instead of quote
const teamForm = reactive({
  name: "",
  position: "",
  photo_path: null,
  phone_number: "", // Changed from quote to phone_number
  order_index: 0,
});

// Methods
const handleFileUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  if (type === "hero_background_image") {
    settingsForm.hero_background_image = file;
  } else if (type === "company_logo") {
    settingsForm.company_logo = file;
  } else if (type === "service_image") {
    serviceForm.image_path = file;
  } else if (type === "team_photo") {
    teamForm.photo_path = file;
  }
};

const updateSettings = () => {
  loading.value = true;

  const formData = new FormData();

  // Add text fields
  const textFields = ['company_name', 'company_description', 'trust_badge_text', 'contact_phone', 'contact_email', 'whatsapp_number'];

  textFields.forEach(field => {
    const value = settingsForm[field];
    if (value !== null && value !== '' && value !== undefined) {
      formData.append(field, value);
    }
  });

  // Handle file uploads
  if (settingsForm.hero_background_image && settingsForm.hero_background_image instanceof File) {
    formData.append('hero_background_image', settingsForm.hero_background_image);
  }

  if (settingsForm.company_logo && settingsForm.company_logo instanceof File) {
    formData.append('company_logo', settingsForm.company_logo);
  }

  formData.append("_method", "PUT");

  router.post(route("masteradmin.website-settings.update-settings"), formData, {
    onSuccess: () => {
      settingsForm.hero_background_image = null;
      settingsForm.company_logo = null;
    },
    onError: (errors) => {
      console.error('Errors:', errors);
      alert('Error: ' + JSON.stringify(errors));
    },
    onFinish: () => {
      loading.value = false;
    },
    preserveState: false,
  });
};

const editService = (service) => {
  editingService.value = service;
  serviceForm.title = service.title;
  serviceForm.description = service.description;
  serviceForm.order_index = service.order_index;
  serviceForm.image_path = null;
  showServiceModal.value = true;
};

const saveService = () => {
  const formData = new FormData();
  Object.keys(serviceForm).forEach((key) => {
    if (serviceForm[key] !== null) {
      formData.append(key, serviceForm[key]);
    }
  });

  const url = editingService.value
    ? route(
        "masteradmin.website-settings.services.update",
        editingService.value.id
      )
    : route("masteradmin.website-settings.services.create");

  if (editingService.value) {
    formData.append("_method", "PUT");
  }

  router.post(url, formData, {
    onSuccess: () => {
      showServiceModal.value = false;
      resetServiceForm();
    },
    preserveState: false,
  });
};

const deleteService = (serviceId) => {
  if (confirm("Apakah Anda yakin ingin menghapus service ini?")) {
    router.delete(
      route("masteradmin.website-settings.services.delete", serviceId),
      {
        preserveState: false,
      }
    );
  }
};

const editTeamMember = (member) => {
  editingTeamMember.value = member;
  teamForm.name = member.name;
  teamForm.position = member.position;
  teamForm.phone_number = member.phone_number || ""; // Changed from quote to phone_number
  teamForm.order_index = member.order_index;
  teamForm.photo_path = null;
  showTeamModal.value = true;
};

const saveTeamMember = () => {
  const formData = new FormData();
  Object.keys(teamForm).forEach((key) => {
    if (teamForm[key] !== null) {
      formData.append(key, teamForm[key]);
    }
  });

  const url = editingTeamMember.value
    ? route(
        "masteradmin.website-settings.team-members.update",
        editingTeamMember.value.id
      )
    : route("masteradmin.website-settings.team-members.create");

  if (editingTeamMember.value) {
    formData.append("_method", "PUT");
  }

  router.post(url, formData, {
    onSuccess: () => {
      showTeamModal.value = false;
      resetTeamForm();
    },
    preserveState: false,
  });
};

const deleteTeamMember = (memberId) => {
  if (confirm("Apakah Anda yakin ingin menghapus anggota tim ini?")) {
    router.delete(
      route("masteradmin.website-settings.team-members.delete", memberId),
      {
        preserveState: false,
      }
    );
  }
};

const resetServiceForm = () => {
  editingService.value = null;
  serviceForm.title = "";
  serviceForm.description = "";
  serviceForm.image_path = null;
  serviceForm.order_index = 0;
};

const resetTeamForm = () => {
  editingTeamMember.value = null;
  teamForm.name = "";
  teamForm.position = "";
  teamForm.photo_path = null;
  teamForm.phone_number = ""; // Changed from quote to phone_number
  teamForm.order_index = 0;
};
</script>

<style scoped>
.text-sage-600 {
  color: #8db580;
}
.text-sage-700 {
  color: #7ba169;
}
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-600 {
  background-color: #8db580;
}
.bg-sage-700 {
  background-color: #7ba169;
}
.border-sage-600 {
  border-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #9bc088;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #9bc088;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>
