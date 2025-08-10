<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="service in services"
      :key="service.id"
      class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-sage-100 hover:border-sage-300"
    >
      <!-- Service Image -->
      <div class="relative h-48 overflow-hidden">
        <img
          v-if="service.image_path"
          :src="getServiceImageUrl(service.image_path)"
          :alt="service.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div
          v-else
          class="w-full h-full bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center"
        >
          <component
            :is="getServiceIcon(service)"
            class="w-16 h-16 text-white"
          />
        </div>

        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        <!-- Featured Badge -->
        <div
          v-if="service.is_featured"
          class="absolute top-4 right-4 bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
        >
          Featured
        </div>
      </div>

      <!-- Service Content -->
      <div class="p-6">
        <h3
          class="text-xl font-bold text-gray-900 mb-3 group-hover:text-sage-700 transition-colors duration-300"
        >
          {{ service.title }}
        </h3>

        <p class="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {{ service.description }}
        </p>

        <!-- Service Features -->
        <div v-if="service.features?.length" class="space-y-2 mb-6">
          <div
            v-for="feature in service.features.slice(0, 3)"
            :key="feature"
            class="flex items-start gap-2"
          >
            <div
              class="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
            >
              <CheckIcon class="w-3 h-3 text-sage-600" />
            </div>
            <span class="text-sm text-gray-600">{{ feature }}</span>
          </div>

          <div
            v-if="service.features.length > 3"
            class="text-xs text-sage-600 font-medium pl-7"
          >
            +{{ service.features.length - 3 }} more features
          </div>
        </div>

        <!-- Action Button -->
        <button
          v-if="showButtons"
          @click="$emit('service-click', service)"
          class="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sage-600/25 transform hover:-translate-y-0.5"
        >
          Learn More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckIcon,
  TruckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
} from "@heroicons/vue/24/outline";

defineProps({
  services: { type: Array, required: true },
  showButtons: { type: Boolean, default: true },
});

defineEmits(["service-click"]);

const getServiceImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (imagePath.startsWith("/storage/")) {
    return imagePath;
  }

  if (imagePath.startsWith("storage/")) {
    return `/${imagePath}`;
  }

  return `/storage/${imagePath}`;
};

const getServiceIcon = (service) => {
  const title = service.title?.toLowerCase() || "";

  if (title.includes("truck") || title.includes("transport")) return TruckIcon;
  if (
    title.includes("export") ||
    title.includes("import") ||
    title.includes("global")
  )
    return GlobeAltIcon;
  if (title.includes("warehouse") || title.includes("storage"))
    return BuildingOfficeIcon;

  return TruckIcon; // default
};
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Focus states */
button:focus-visible {
  outline: 2px solid var(--sage-500);
  outline-offset: 2px;
}
</style>
