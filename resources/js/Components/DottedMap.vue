<template>
  <div ref="mapContainer" class="dotted-map-container w-full h-full">
    <!-- Always show fallback initially -->
    <div class="fallback-dotted-map w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mapContainer = ref(null)
let loadAttempted = false

const props = defineProps({
  dotColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.4)'
  },
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  dotSize: {
    type: Number,
    default: 1
  },
  spacing: {
    type: Number,
    default: 2
  },
  countries: {
    type: Array,
    default: () => ['ID', 'SG', 'MY', 'TH', 'VN', 'PH', 'CN', 'JP', 'KR', 'IN', 'AU', 'NZ', 'US', 'GB', 'DE', 'FR', 'NL', 'AE', 'SA']
  }
})

const loadDottedMap = async () => {
  if (loadAttempted || !mapContainer.value) return
  loadAttempted = true

  try {
    // Direct load for faster response
    await loadMapPackage()
  } catch (error) {
    // Fallback is already visible
  }
}

const loadMapPackage = async () => {
  try {
    const dottedMapModule = await import('dotted-map')
    const DottedMapClass = dottedMapModule.default
    
    const map = new DottedMapClass({
      height: 300,
      grid: 'diagonal'
    })

    const svgMap = map.getSVG({
      radius: props.dotSize,
      color: props.dotColor,
      shape: 'circle',
      backgroundColor: props.backgroundColor,
      countries: props.countries
    })

    if (svgMap?.trim() && mapContainer.value) {
      const fallbackElement = mapContainer.value.querySelector('.fallback-dotted-map')
      if (fallbackElement) {
        const div = document.createElement('div')
        div.innerHTML = svgMap
        div.className = 'map-animation'
        div.style.width = '100%'
        div.style.height = '100%'
        div.style.opacity = '0.6'
        
        const svg = div.querySelector('svg')
        if (svg) {
          svg.style.width = '100%'
          svg.style.height = '100%'
        }

        mapContainer.value.replaceChild(div, fallbackElement)
      }
    }
  } catch (error) {
    // Keep fallback
  }
}

onMounted(() => {
  loadDottedMap()
})

onUnmounted(() => {
  if (mapContainer.value) {
    mapContainer.value.innerHTML = ''
  }
})
</script>

<style scoped>
.dotted-map-container {
  position: relative;
  overflow: hidden;
}

/* Simplified animation for the map */
.map-animation {
  animation: float-map 20s ease-in-out infinite;
}

@keyframes float-map {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(2px) translateY(-1px);
  }
  50% {
    transform: translateX(-1px) translateY(2px);
  }
  75% {
    transform: translateX(1px) translateY(-2px);
  }
}

/* Simplified Fallback CSS dotted map */
.fallback-dotted-map {
  background-image: 
    radial-gradient(circle at 3px 3px, rgba(255, 255, 255, 0.4) 1.2px, transparent 0),
    radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 0.8px, transparent 0);
  background-size: 45px 45px, 70px 70px;
  background-position: 0 0, 15px 15px;
  animation: float-dots 30s ease-in-out infinite;
  position: relative;
  opacity: 1;
  min-height: 200px;
}

/* Simplified connection lines overlay */
.fallback-dotted-map::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, transparent 49%, rgba(255, 255, 255, 0.08) 50%, transparent 51%);
  background-size: 100px 100px;
  animation: connect-lines 40s linear infinite;
  opacity: 0.6;
}

/* Simplified pulsing nodes */
.fallback-dotted-map::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.4) 1.5px, transparent 2.5px),
    radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.3) 1.2px, transparent 2.2px);
  animation: pulse-nodes 4s ease-in-out infinite;
}

@keyframes float-dots {
  0%, 100% {
    background-position: 0 0, 15px 15px;
  }
  50% {
    background-position: 4px 4px, 19px 19px;
  }
}

@keyframes connect-lines {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100px 100px;
  }
}

@keyframes pulse-nodes {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
}
</style>