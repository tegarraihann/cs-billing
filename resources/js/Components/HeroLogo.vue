<template>
  <div class="logo-parallax relative group">
    <!-- Logo container with floating animation -->
    <div class="relative z-10 logo-float transition-all duration-500">
      <img
        :src="logoSrc"
        :alt="altText"
        :class="logoClass"
        class="object-contain filter contrast-125 brightness-110 saturate-110 drop-shadow-2xl group-hover:contrast-130 group-hover:brightness-115 transition-all duration-500"
        loading="eager"
        style="filter: contrast(125%) brightness(110%) saturate(110%) drop-shadow(0 25px 25px rgb(0 0 0 / 0.25)) drop-shadow(0 0 15px rgb(255 255 255 / 0.3));"
        @error="handleImageError"
      />
      
      <!-- Fallback for SVG loading error -->
      <div v-if="imageError" class="flex items-center justify-center text-white/70 text-lg font-medium">
        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'large', // small, medium, large, xl
    validator: (value) => ['small', 'medium', 'large', 'xl'].includes(value)
  },
  enableParallax: {
    type: Boolean,
    default: true
  },
  altText: {
    type: String,
    default: 'PT Eshaka Wijaya Logistics Logo'
  }
})

const imageError = ref(false)

// Logo source - using the new SVG file
const logoSrc = computed(() => {
  if (imageError.value) {
    return null
  }
  return '/images/logo/logo-hero.svg'
})

// Size configurations - increased sizes
const sizeConfig = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40'
    case 'medium':
      return 'w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56'
    case 'large':
      return 'w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72'
    case 'xl':
      return 'w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80'
    default:
      return 'w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72'
  }
})

const logoClass = computed(() => sizeConfig.value)

// Parallax effect for logo
const handleParallax = () => {
  if (!props.enableParallax) return
  
  const scrolled = window.pageYOffset
  const logoElement = document.querySelector('.logo-parallax')
  
  if (logoElement) {
    const rate = scrolled * -0.3
    logoElement.style.transform = `translateY(${rate}px)`
  }
}

const handleImageError = () => {
  imageError.value = true
  console.warn('Failed to load hero logo SVG:', logoSrc.value)
}

onMounted(() => {
  if (props.enableParallax) {
    window.addEventListener('scroll', handleParallax)
  }
})

onUnmounted(() => {
  if (props.enableParallax) {
    window.removeEventListener('scroll', handleParallax)
  }
})
</script>

<style scoped>
/* Logo floating animation */
@keyframes logo-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-5px) rotate(1deg);
  }
  50% {
    transform: translateY(-10px) rotate(0deg);
  }
  75% {
    transform: translateY(-5px) rotate(-1deg);
  }
}

.logo-float {
  animation: logo-float 6s ease-in-out infinite;
  will-change: transform;
}

.logo-parallax {
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.bg-gradient-radial {
  background: radial-gradient(circle, var(--tw-gradient-stops));
}

/* Custom Sage Colors */
.border-sage-300 {
  border-color: #A5C49A;
}
</style>