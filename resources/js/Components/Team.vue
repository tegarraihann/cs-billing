<template>
  <div class="flex items-center justify-center" :class="containerClass">
    <!-- Team Photo Container -->
    <div class="relative group">
      <!-- Main Team Photo -->
      <div class="relative overflow-hidden" :class="photoContainerClass">
        <img
          :src="photoSrc"
          :alt="altText"
          :class="photoClass"
          class="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          @error="handleImageError"
        />

        <!-- Overlay with gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <!-- Team Info Overlay -->
        <div v-if="showOverlay" class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 class="text-2xl font-bold mb-2">{{ teamTitle }}</h3>
          <p class="text-sm opacity-90">{{ teamDescription }}</p>
        </div>
      </div>

      <!-- Decorative Elements (Optional - can be removed if too distracting) -->
      <div v-if="showDecorative" class="absolute -top-4 -right-4 w-8 h-8 bg-sage-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <div v-if="showDecorative" class="absolute -bottom-4 -left-4 w-6 h-6 bg-sage-400 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
    </div>

    <!-- Team Information (if beside photo) -->
    <div v-if="showText && layout === 'horizontal'" :class="textContainerClass">
      <h3 :class="titleClass">{{ teamTitle }}</h3>
      <p :class="descriptionClass">{{ teamDescription }}</p>

      <!-- Team Stats -->
      <div v-if="showStats" class="grid grid-cols-2 gap-4 mt-6">
        <div v-for="stat in teamStats" :key="stat.label" class="text-center">
          <div class="text-2xl font-bold text-sage-700">{{ stat.value }}</div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Team Information (if below photo) -->
  <div v-if="showText && layout === 'vertical'" class="text-center mt-4">
    <h3 :class="titleClass">{{ teamTitle }}</h3>
    <p :class="descriptionClass">{{ teamDescription }}</p>

    <!-- Team Stats -->
    <div v-if="showStats" class="grid grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
      <div v-for="stat in teamStats" :key="stat.label" class="text-center">
        <div class="text-xl font-bold text-sage-700">{{ stat.value }}</div>
        <div class="text-xs text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'large', // small, medium, large, xl, full
    validator: (value) => ['small', 'medium', 'large', 'xl', 'full'].includes(value)
  },
  layout: {
    type: String,
    default: 'vertical', // vertical, horizontal
    validator: (value) => ['vertical', 'horizontal'].includes(value)
  },
  showText: {
    type: Boolean,
    default: true
  },
  showOverlay: {
    type: Boolean,
    default: true
  },
  showStats: {
    type: Boolean,
    default: true
  },
  showDecorative: {
    type: Boolean,
    default: false // Disabled by default for cleaner look
  },
  teamTitle: {
    type: String,
    default: 'Tim Profesional Kami'
  },
  teamDescription: {
    type: String,
    default: 'Tim yang berpengalaman dan berdedikasi dalam memberikan pelayanan logistik terbaik untuk kepuasan pelanggan.'
  },
  aspectRatio: {
    type: String,
    default: 'auto', // auto, square, wide, ultrawide
    validator: (value) => ['auto', 'square', 'wide', 'ultrawide'].includes(value)
  }
})

const imageError = ref(false)

// Team photo source
const photoSrc = computed(() => {
  if (imageError.value) {
    return null
  }
  return '/images/team/tim.png' // atau '/images/team/team-photo.jpg'
})

const altText = computed(() => {
  return `${props.teamTitle} - Eshaka Wijaya Logistics Team`
})

// Size configurations
const sizeConfig = computed(() => {
  const base = {
    small: {
      photoContainer: 'w-64 h-auto',
      photo: 'w-full h-auto',
      container: props.layout === 'horizontal' ? 'space-x-6' : 'space-y-2',
      textContainer: 'flex flex-col',
      title: 'text-xl font-bold text-gray-800',
      description: 'text-sm text-gray-600 mt-2'
    },
    medium: {
      photoContainer: 'w-80 h-auto',
      photo: 'w-full h-auto',
      container: props.layout === 'horizontal' ? 'space-x-8' : 'space-y-3',
      textContainer: 'flex flex-col max-w-md',
      title: 'text-2xl font-bold text-gray-800',
      description: 'text-base text-gray-600 mt-3'
    },
    large: {
      photoContainer: 'w-96 h-auto',
      photo: 'w-full h-auto',
      container: props.layout === 'horizontal' ? 'space-x-10' : 'space-y-4',
      textContainer: 'flex flex-col max-w-lg',
      title: 'text-3xl font-bold text-gray-800',
      description: 'text-lg text-gray-600 mt-4 leading-relaxed'
    },
    xl: {
      photoContainer: 'w-auto h-auto max-w-2xl',
      photo: 'w-full h-auto',
      container: props.layout === 'horizontal' ? 'space-x-12' : 'space-y-4',
      textContainer: 'flex flex-col max-w-xl',
      title: 'text-4xl font-bold text-gray-800',
      description: 'text-xl text-gray-600 mt-4 leading-relaxed'
    },
    full: {
      photoContainer: 'w-full max-w-4xl h-auto',
      photo: 'w-full h-auto',
      container: props.layout === 'horizontal' ? 'space-x-16' : 'space-y-6',
      textContainer: 'flex flex-col max-w-2xl',
      title: 'text-5xl font-bold text-gray-800',
      description: 'text-2xl text-gray-600 mt-6 leading-relaxed'
    }
  }

  // Apply aspect ratio if specified
  if (props.aspectRatio !== 'auto') {
    const aspectRatios = {
      square: 'aspect-square',
      wide: 'aspect-video',
      ultrawide: 'aspect-[21/9]'
    }

    base[props.size].photo = `w-full h-full object-cover ${aspectRatios[props.aspectRatio]}`
    base[props.size].photoContainer = base[props.size].photoContainer.replace('h-auto', aspectRatios[props.aspectRatio])
  }

  return base[props.size]
})

// Team statistics
const teamStats = computed(() => [
  { value: '25+', label: 'Expert Staff' },
  { value: '15+', label: 'Years Exp' },
  { value: '500+', label: 'Projects' },
  { value: '99%', label: 'Success Rate' }
])

// Computed classes
const containerClass = computed(() => {
  const layoutClass = props.layout === 'horizontal' ? 'flex-row items-center' : 'flex-col'
  return `${sizeConfig.value.container} ${layoutClass}`
})

const photoContainerClass = computed(() => sizeConfig.value.photoContainer)
const photoClass = computed(() => sizeConfig.value.photo)
const textContainerClass = computed(() => sizeConfig.value.textContainer)
const titleClass = computed(() => sizeConfig.value.title)
const descriptionClass = computed(() => sizeConfig.value.description)

const handleImageError = () => {
  imageError.value = true
}
</script>

<style scoped>
/* Custom Sage Colors */
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-200 { background-color: #D4DDD0; }
.bg-sage-400 { background-color: #A5C49A; }
.bg-sage-600 { background-color: #8DB580; }
.text-sage-700 { color: #7BA169; }

/* Ensure image displays properly without distortion */
img {
  display: block;
  max-width: 100%;
  height: auto;
}

/* Remove any default rounded corners */
.overflow-hidden {
  border-radius: 0;
}

/* Custom aspect ratios */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-\[21\/9\] {
  aspect-ratio: 21 / 9;
}
</style>
