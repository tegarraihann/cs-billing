<template>
  <div class="flex items-center" :class="containerClass">
    <!-- Logo Image -->
    <img
      :src="logoSrc"
      :alt="altText"
      :class="logoClass"
      class="object-contain"
      @error="handleImageError"
    />

    <!-- Company Text (optional) -->
    <!-- <div v-if="showText" :class="textContainerClass">
      <div :class="primaryTextClass">{{ companyName }}</div>
      <div v-if="showTagline" :class="taglineClass">{{ tagline }}</div>
    </div> -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'medium', // small, medium, large, xl
    validator: (value) => ['small', 'medium', 'large', 'xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'default', // default, white, icon-only
    validator: (value) => ['default', 'white', 'icon-only'].includes(value)
  },
  showText: {
    type: Boolean,
    default: true
  },
  showTagline: {
    type: Boolean,
    default: true
  },
  companyName: {
    type: String,
    default: 'Eshaka Wijaya Logistics'
  },
  tagline: {
    type: String,
    default: 'International Freight Forwarder'
  }
})

const imageError = ref(false)

// Logo source based on variant
const logoSrc = computed(() => {
  if (imageError.value) {
    // Fallback to text if image fails to load
    return null
  }

  if (props.variant === 'icon-only') {
    return '/images/logo/eshaka-wijaya-icon.png'
  } else if (props.variant === 'white') {
    return '/images/logo/eshaka-wijaya-logo-white.png'
  } else {
    return '/images/logo/eshaka-wijaya-logo.png'
  }
})

const altText = computed(() => {
  return `${props.companyName} Logo`
})

// Size configurations
const sizeConfig = computed(() => {
  switch (props.size) {
    case 'small':
      return {
        logo: 'h-8 w-auto',
        container: 'space-x-2',
        textContainer: 'flex flex-col',
        primaryText: 'text-sm font-bold',
        tagline: 'text-xs font-medium'
      }
    case 'large':
      return {
        logo: 'h-16 w-auto',
        container: 'space-x-4',
        textContainer: 'flex flex-col',
        primaryText: 'text-2xl font-bold',
        tagline: 'text-sm font-medium'
      }
    case 'xl':
      return {
        logo: 'h-20 w-auto',
        container: 'space-x-4',
        textContainer: 'flex flex-col',
        primaryText: 'text-3xl font-bold',
        tagline: 'text-base font-medium'
      }
    default: // medium
      return {
        logo: 'h-12 w-auto',
        container: 'space-x-3',
        textContainer: 'flex flex-col',
        primaryText: 'text-xl font-bold',
        tagline: 'text-sm font-medium'
      }
  }
})

// Computed classes
const containerClass = computed(() => sizeConfig.value.container)
const logoClass = computed(() => sizeConfig.value.logo)
const textContainerClass = computed(() => sizeConfig.value.textContainer)

const primaryTextClass = computed(() => {
  const baseClass = sizeConfig.value.primaryText
  const colorClass = props.variant === 'white' ? 'text-white' : 'text-gray-800'
  return `${baseClass} ${colorClass}`
})

const taglineClass = computed(() => {
  const baseClass = sizeConfig.value.tagline
  const colorClass = props.variant === 'white' ? 'text-gray-200' : 'text-gray-600'
  return `${baseClass} ${colorClass}`
})

const handleImageError = () => {
  imageError.value = true
}
</script>
