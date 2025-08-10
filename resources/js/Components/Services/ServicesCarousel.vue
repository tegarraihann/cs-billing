<template>
  <div class="text-center">
    <h3 class="text-2xl font-bold text-gray-800 mb-12 flex items-center justify-center gap-3">
      <SparklesIcon class="w-6 h-6 text-sage-600" />
      Support Services
      <SparklesIcon class="w-6 h-6 text-sage-600" />
    </h3>

    <div class="relative max-w-4xl mx-auto">
      <!-- Carousel Container -->
      <div class="overflow-hidden rounded-2xl shadow-xl">
        <div
          class="flex transition-transform duration-700 ease-out"
          :style="`transform: translateX(-${currentSlide * 100}%)`"
        >
          <div
            v-for="(service, index) in services"
            :key="service.id || service.title"
            class="flex-shrink-0 w-full"
          >
            <!-- Service Card -->
            <div class="flex flex-col md:flex-row bg-white h-96 md:h-80 group">
              <!-- Image Section -->
              <div class="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                <div
                  class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  :style="service.image_path
                    ? `background-image: url('${getServiceImageUrl(service.image_path)}');`
                    : 'background: linear-gradient(135deg, var(--sage-400) 0%, var(--sage-600) 100%)'"
                >
                  <div class="absolute inset-0 bg-gradient-to-br from-sage-900/20 via-transparent to-sage-900/40 group-hover:from-sage-900/10 transition-all duration-500"></div>
                </div>

                <!-- Floating Icon -->
                <div class="absolute top-6 left-6">
                  <div class="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-sage-600 transition-all duration-500 shadow-lg">
                    <component
                      :is="getServiceIcon(service)"
                      class="w-8 h-8 text-sage-600 group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                </div>

                <!-- Service Number -->
                <div class="absolute bottom-4 right-4">
                  <div class="w-10 h-10 bg-sage-600/90 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {{ String(index + 1).padStart(2, '0') }}
                  </div>
                </div>
              </div>

              <!-- Content Section -->
              <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div class="mb-4">
                  <span class="inline-flex items-center px-3 py-1 bg-sage-100 text-sage-700 text-sm font-medium rounded-full mb-3">
                    Support Service
                  </span>
                </div>

                <h4 class="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-sage-700 transition-colors duration-300 mb-4 leading-tight">
                  {{ service.title }}
                </h4>

                <p class="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 mb-6">
                  {{ service.description }}
                </p>

                <!-- Features Preview -->
                <div v-if="service.features?.length" class="flex flex-wrap gap-2">
                  <div
                    v-for="feature in service.features.slice(0, 3)"
                    :key="feature"
                    class="flex items-center gap-1 text-sm text-sage-600"
                  >
                    <CheckIcon class="w-4 h-4" />
                    <span>{{ feature }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div v-if="totalSlides > 1" class="flex justify-between items-center mt-8">
        <!-- Previous Button -->
        <button
          @click="previousSlide"
          :disabled="currentSlide === 0"
          class="group w-12 h-12 bg-sage-100 hover:bg-sage-600 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
          :class="currentSlide === 0 ? 'opacity-50' : 'hover:scale-110'"
        >
          <ChevronLeftIcon class="w-6 h-6 text-sage-600 group-hover:text-white group-disabled:text-gray-400 transition-colors duration-300" />
        </button>

        <!-- Slide Indicators -->
        <div class="flex items-center gap-3">
          <button
            v-for="(slide, index) in totalSlides"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300"
            :class="currentSlide === index
              ? 'w-8 h-3 bg-sage-600 rounded-full'
              : 'w-3 h-3 bg-gray-300 hover:bg-sage-400 rounded-full'"
          >
            <span class="sr-only">Go to slide {{ index + 1 }}</span>
          </button>
        </div>

        <!-- Next Button -->
        <button
          @click="nextSlide"
          :disabled="currentSlide >= totalSlides - 1"
          class="group w-12 h-12 bg-sage-100 hover:bg-sage-600 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl disabled:shadow-none"
          :class="currentSlide >= totalSlides - 1 ? 'opacity-50' : 'hover:scale-110'"
        >
          <ChevronRightIcon class="w-6 h-6 text-sage-600 group-hover:text-white group-disabled:text-gray-400 transition-colors duration-300" />
        </button>
      </div>

      <!-- Slide Counter -->
      <div class="text-center mt-4">
        <span class="text-sm text-gray-500">
          {{ currentSlide + 1 }} of {{ totalSlides }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  SparklesIcon,
  TruckIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  CubeIcon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  services: { type: Array, required: true }
})

// Reactive state
const currentSlide = ref(0)
let autoSlideInterval = null

// Computed
const totalSlides = computed(() => Math.max(1, props.services.length))

// Methods
const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoSlide()
}

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
  if (title.includes('consulting') || title.includes('support') || title.includes('service')) return Cog6ToothIcon

  return Cog6ToothIcon // default for support services
}

// Auto-slide functionality
const startAutoSlide = () => {
  if (totalSlides.value <= 1) return

  autoSlideInterval = setInterval(() => {
    if (currentSlide.value >= totalSlides.value - 1) {
      currentSlide.value = 0
    } else {
      nextSlide()
    }
  }, 6000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

const resetAutoSlide = () => {
  stopAutoSlide()
  setTimeout(() => startAutoSlide(), 1000) // Resume after 1 second
}

// Handle visibility change
const handleVisibilityChange = () => {
  if (document.hidden) {
    stopAutoSlide()
  } else {
    startAutoSlide()
  }
}

// Lifecycle
onMounted(() => {
  startAutoSlide()
  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true })
})

onUnmounted(() => {
  stopAutoSlide()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
/* Custom transitions */
.transition-transform {
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Backdrop blur for floating elements */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

/* Screen reader only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Enhanced button states */
button:disabled {
  pointer-events: none;
}

button:not(:disabled):active {
  transform: scale(0.95);
}

/* Smooth hover animations */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Focus visible for accessibility */
button:focus-visible {
  outline: 2px solid var(--sage-500);
  outline-offset: 2px;
}
</style>
