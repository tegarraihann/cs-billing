<template>
  <div class="grid lg:grid-cols-2 gap-8">
    <!-- Main Featured Service -->
    <div
      v-if="featured"
      class="lg:row-span-2 relative rounded-2xl overflow-hidden group shadow-2xl"
    >
      <!-- Background Image with Overlay -->
      <div
        class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        :style="featured.image_path
          ? `background-image: url('${getServiceImageUrl(featured.image_path)}')`
          : 'background: linear-gradient(135deg, var(--sage-500) 0%, var(--sage-700) 100%)'"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 group-hover:from-black/50 group-hover:to-black/60 transition-all duration-500"></div>
      </div>

      <!-- Content Overlay -->
      <div class="relative z-10 p-8 h-full flex flex-col justify-between min-h-[500px]">
        <!-- Header -->
        <div>
          <div class="flex items-center gap-4 mb-6">
            <div class="w-14 h-14 bg-sage-600/90 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300">
              <component :is="getServiceIcon(featured)" class="w-7 h-7 text-white" />
            </div>
            <div class="bg-sage-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              Featured Service
            </div>
          </div>

          <h3 class="text-3xl font-bold text-white mb-4 leading-tight">
            {{ featured.title }}
          </h3>

          <p class="text-sage-100 text-lg leading-relaxed mb-6">
            {{ featured.description }}
          </p>
        </div>

        <!-- Features List -->
        <div v-if="featured.features?.length" class="mb-8">
          <div class="bg-black/20 backdrop-blur-sm rounded-2xl p-6">
            <h4 class="text-white font-semibold mb-4 flex items-center gap-2">
              <CheckCircleIcon class="w-5 h-5 text-sage-300" />
              Key Features
            </h4>
            <div class="space-y-3">
              <div
                v-for="feature in featured.features"
                :key="feature"
                class="flex items-start gap-3"
              >
                <div class="w-6 h-6 bg-sage-500/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <CheckIcon class="w-4 h-4 text-white" />
                </div>
                <span class="text-white/90 font-medium">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          v-if="showButtons"
          @click="$emit('service-click', featured)"
          class="w-full bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-sage-600/30 transform hover:-translate-y-1"
        >
          Explore {{ featured.title }}
          <ArrowRightIcon class="w-5 h-5 ml-2 inline-block" />
        </button>
      </div>
    </div>

    <!-- Other Services -->
    <div class="space-y-6">
      <div
        v-for="service in others"
        :key="service.id"
        class="relative bg-white rounded-2xl p-6 border border-sage-100 hover:border-sage-300 hover:shadow-lg transition-all duration-300 group overflow-hidden"
      >
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
          <div class="w-full h-full bg-sage-600 rounded-full transform translate-x-8 -translate-y-8"></div>
        </div>

        <!-- Service Background Image (if available) -->
        <div
          v-if="service.image_path"
          class="absolute inset-0 bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-300"
          :style="`background-image: url('${getServiceImageUrl(service.image_path)}');`"
        ></div>

        <div class="relative flex items-start gap-4">
          <div class="w-12 h-12 bg-sage-100 group-hover:bg-sage-600 rounded-2xl flex items-center justify-center transition-colors duration-300 flex-shrink-0">
            <component :is="getServiceIcon(service)" class="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" />
          </div>

          <div class="flex-1 min-w-0">
            <h4 class="text-lg font-bold text-gray-900 group-hover:text-sage-700 transition-colors duration-300 mb-2">
              {{ service.title }}
            </h4>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {{ service.description }}
            </p>

            <!-- Quick Features Preview -->
            <div v-if="service.features?.length" class="mt-3 flex flex-wrap gap-1">
              <span
                v-for="feature in service.features.slice(0, 2)"
                :key="feature"
                class="inline-flex items-center px-2 py-1 bg-sage-50 text-sage-700 text-xs rounded-full"
              >
                {{ feature }}
              </span>
              <span
                v-if="service.features.length > 2"
                class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full"
              >
                +{{ service.features.length - 2 }}
              </span>
            </div>
          </div>

          <!-- Arrow Icon -->
          <div class="flex-shrink-0">
            <ArrowRightIcon class="w-5 h-5 text-gray-400 group-hover:text-sage-600 transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  TruckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CubeIcon
} from '@heroicons/vue/24/outline'

defineProps({
  featured: { type: Object, default: null },
  others: { type: Array, default: () => [] },
  showButtons: { type: Boolean, default: true }
})

defineEmits(['service-click'])

const getServiceImageUrl = (imagePath) => {
  if (!imagePath) return null

  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }

  if (imagePath.startsWith('/storage/')) {
    return imagePath
  }

  if (imagePath.startsWith('storage/')) {
    return `/${imagePath}`
  }

  return `/storage/${imagePath}`
}

const getServiceIcon = (service) => {
  const title = service?.title?.toLowerCase() || ''

  if (title.includes('truck') || title.includes('transport') || title.includes('delivery')) return TruckIcon
  if (title.includes('export') || title.includes('import') || title.includes('global') || title.includes('international')) return GlobeAltIcon
  if (title.includes('warehouse') || title.includes('storage') || title.includes('fulfillment')) return BuildingOfficeIcon
  if (title.includes('packaging') || title.includes('cargo') || title.includes('freight')) return CubeIcon

  return TruckIcon // default
}
</script>

<style scoped>
/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced backdrop blur */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Gradient text effect */
.bg-gradient-to-r {
  background: linear-gradient(90deg, var(--sage-600), var(--sage-700));
}

.hover\:from-sage-700:hover {
  --tw-gradient-from: var(--sage-700);
}

.hover\:to-sage-800:hover {
  --tw-gradient-to: var(--sage-800);
}
</style>
