<template>
  <!-- Backdrop -->
  <Transition name="backdrop">
    <div
      v-if="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click="handleBackdropClick"
    >
      <!-- Dialog -->
      <Transition name="dialog" appear>
        <div
          v-if="show"
          class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden"
          @click.stop
        >
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200" :class="headerClass">
            <div class="flex items-center">
              <div class="flex-shrink-0 mr-3">
                <!-- Success Icon -->
                <svg
                  v-if="type === 'success'"
                  class="w-6 h-6 text-green-600"
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
                <!-- Error Icon -->
                <svg
                  v-else-if="type === 'error'"
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <!-- Warning Icon -->
                <svg
                  v-else-if="type === 'warning'"
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <!-- Info Icon -->
                <svg
                  v-else-if="type === 'info'"
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <!-- Confirm Icon -->
                <svg
                  v-else
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900">
                  {{ title || defaultTitle }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-4">
            <p class="text-sm text-gray-600">
              {{ message }}
            </p>
          </div>

          <!-- Actions -->
          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div class="flex justify-end space-x-3">
              <!-- Cancel Button (for confirm dialogs) -->
              <button
                v-if="type === 'confirm'"
                @click="handleCancel"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              >
                {{ cancelText || "Batal" }}
              </button>

              <!-- Primary Button -->
              <button
                @click="handleConfirm"
                class="px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-2 transition-colors"
                :class="primaryButtonClass"
              >
                {{ confirmText || defaultConfirmText }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "info", // success, error, warning, info, confirm
    validator: (value) =>
      ["success", "error", "warning", "info", "confirm"].includes(value),
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  confirmText: {
    type: String,
    default: "",
  },
  cancelText: {
    type: String,
    default: "",
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["confirm", "cancel", "close"]);

const defaultTitle = computed(() => {
  switch (props.type) {
    case "success":
      return "Berhasil";
    case "error":
      return "Terjadi Kesalahan";
    case "warning":
      return "Peringatan";
    case "confirm":
      return "Konfirmasi";
    case "info":
    default:
      return "Informasi";
  }
});

const defaultConfirmText = computed(() => {
  switch (props.type) {
    case "success":
    case "info":
      return "OK";
    case "error":
      return "Tutup";
    case "warning":
      return "Mengerti";
    case "confirm":
      return "Ya, Hapus";
    default:
      return "OK";
  }
});

const headerClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-50";
    case "error":
      return "bg-red-50";
    case "warning":
      return "bg-yellow-50";
    case "confirm":
      return "bg-red-50";
    case "info":
    default:
      return "bg-blue-50";
  }
});

const primaryButtonClass = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-600 hover:bg-green-700 focus:ring-green-500";
    case "error":
      return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
    case "warning":
      return "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";
    case "confirm":
      return "bg-red-600 hover:bg-red-700 focus:ring-red-500";
    case "info":
    default:
      return "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
  }
});

const handleConfirm = () => {
  emit("confirm");
  emit("close");
};

const handleCancel = () => {
  emit("cancel");
  emit("close");
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    if (props.type === "confirm") {
      emit("cancel");
    }
    emit("close");
  }
};
</script>

<style scoped>
/* Backdrop Transitions */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.2s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Dialog Transitions */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}
</style>
