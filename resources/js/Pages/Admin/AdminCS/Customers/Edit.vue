<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Edit Pelanggan: {{ customer.name }}
              </h2>
              <p class="text-sage-600">
                Perbarui informasi pelanggan dan status komunikasi
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.customers.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">
            Form Edit Pelanggan
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi informasi pelanggan dengan benar
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nama -->
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  id="name"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                />
                <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">
                  {{ form.errors.name }}
                </div>
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  id="email"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                />
                <div v-if="form.errors.email" class="mt-2 text-sm text-red-600">
                  {{ form.errors.email }}
                </div>
              </div>

              <!-- Telepon -->
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Nomor Telepon <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  id="phone"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                />
                <div v-if="form.errors.phone" class="mt-2 text-sm text-red-600">
                  {{ form.errors.phone }}
                </div>
              </div>

              <!-- Perusahaan -->
              <div>
                <label
                  for="company"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Nama Perusahaan
                </label>
                <input
                  v-model="form.company"
                  type="text"
                  id="company"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                />
                <div
                  v-if="form.errors.company"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ form.errors.company }}
                </div>
              </div>

              <!-- Sumber Inquiry -->
              <div>
                <label
                  for="inquiry_source"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Sumber Inquiry <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.inquiry_source"
                  id="inquiry_source"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                >
                  <option value="">Pilih Sumber</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="phone">Telepon</option>
                  <option value="website">Website</option>
                </select>
                <div
                  v-if="form.errors.inquiry_source"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ form.errors.inquiry_source }}
                </div>
              </div>

              <!-- Status -->
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.status"
                  id="status"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                >
                  <option value="">Pilih Status</option>
                  <option value="new">Baru</option>
                  <option value="contacted">Dihubungi</option>
                  <option value="quoted">Dikutip</option>
                  <option value="converted">Konversi</option>
                  <option value="closed">Ditutup</option>
                </select>
                <div
                  v-if="form.errors.status"
                  class="mt-2 text-sm text-red-600"
                >
                  {{ form.errors.status }}
                </div>
              </div>
            </div>

            <!-- Alamat -->
            <div>
              <label
                for="address"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Alamat
              </label>
              <textarea
                v-model="form.address"
                id="address"
                rows="3"
                placeholder="Masukkan alamat lengkap pelanggan..."
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
              >
              </textarea>
              <div v-if="form.errors.address" class="mt-2 text-sm text-red-600">
                {{ form.errors.address }}
              </div>
            </div>

            <!-- Catatan -->
            <div>
              <label
                for="notes"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Catatan
              </label>
              <textarea
                v-model="form.notes"
                id="notes"
                rows="4"
                placeholder="Catatan tentang pelanggan, inquiry, atau komunikasi..."
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
              >
              </textarea>
              <div v-if="form.errors.notes" class="mt-2 text-sm text-red-600">
                {{ form.errors.notes }}
              </div>
            </div>

            <!-- Submit Buttons -->
            <div
              class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200"
            >
              <Link
                :href="route('admin-cs.customers.index')"
                class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  v-if="form.processing"
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-if="form.processing">Menyimpan...</span>
                <span v-else>Update Pelanggan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Alert Dialog -->
    <AlertDialog
      :show="alertDialog.show"
      :type="alertDialog.type"
      :title="alertDialog.title"
      :message="alertDialog.message"
      :confirm-text="alertDialog.confirmText"
      :cancel-text="alertDialog.cancelText"
      @confirm="handleAlertConfirm"
      @cancel="handleAlertCancel"
      @close="closeAlert"
    />
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

const props = defineProps({
  customer: Object,
});

// Alert Dialog State
const alertDialog = ref({
  show: false,
  type: "info",
  title: "",
  message: "",
  confirmText: "",
  cancelText: "",
  onConfirm: null,
});

const form = useForm({
  name: props.customer.name || "",
  email: props.customer.email || "",
  phone: props.customer.phone || "",
  company: props.customer.company || "",
  address: props.customer.address || "",
  inquiry_source: props.customer.inquiry_source || "",
  status: props.customer.status || "new",
  notes: props.customer.notes || "",
});

const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
  alertDialog.value = {
    show: true,
    type,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm: null,
  };
};

const handleAlertConfirm = () => {
  if (alertDialog.value.onConfirm) {
    alertDialog.value.onConfirm();
  }
};

const handleAlertCancel = () => {
  // Cancel logic if needed
};

const closeAlert = () => {
  alertDialog.value.show = false;
};

const submit = () => {
  form.put(route("admin-cs.customers.update", props.customer.id), {
    onSuccess: () => {
      showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
    },
    onError: (errors) => {
      const errorMessage =
        Object.keys(errors).length > 0
          ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan."
          : "Terjadi kesalahan saat memperbarui data pelanggan.";
      showAlert("error", "Gagal Memperbarui", errorMessage);
    },
  });
};
</script>

<style scoped>
/* Custom Sage Colors */
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
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
