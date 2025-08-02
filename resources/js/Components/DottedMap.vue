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
    // Use requestIdleCallback for better performance
    if (window.requestIdleCallback) {
      window.requestIdleCallback(async () => {
        await loadMapPackage()
      })
    } else {
      setTimeout(async () => {
        await loadMapPackage()
      }, 100)
    }
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
        const fragment = document.createDocumentFragment()
        const div = document.createElement('div')
        div.innerHTML = svgMap
        div.className = 'map-animation'
        div.style.cssText = 'width:100%;height:100%;opacity:0.6'
        
        const svg = div.querySelector('svg')
        if (svg) {
          svg.style.cssText = 'width:100%;height:100%;will-change:transform'
        }

        fragment.appendChild(div)
        mapContainer.value.replaceChild(fragment, fallbackElement)
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
  contain: layout style paint;
}

/* Optimized animation for the map */
.map-animation {
  animation: float-map 30s ease-in-out infinite;
  will-change: transform;
}

@keyframes float-map {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  33% {
    transform: translate3d(1px, -0.5px, 0);
  }
  66% {
    transform: translate3d(-0.5px, 1px, 0);
  }
}

/* Optimized Fallback CSS dotted map */
.fallback-dotted-map {
  background-image: 
    radial-gradient(circle at 3px 3px, rgba(255, 255, 255, 0.4) 1.2px, transparent 0),
    radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.3) 0.8px, transparent 0),
    radial-gradient(circle at 15px 35px, rgba(255, 255, 255, 0.25) 1px, transparent 0);
  background-size: 45px 45px, 70px 70px, 55px 55px;
  background-position: 0 0, 15px 15px, 8px 25px;
  animation: float-dots 40s ease-in-out infinite;
  position: relative;
  opacity: 1;
  min-height: 200px;
  contain: layout style paint;
  will-change: background-position;
}

/* Optimized connection lines overlay */
.fallback-dotted-map::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, transparent 49.5%, rgba(255, 255, 255, 0.06) 50%, transparent 50.5%),
    linear-gradient(-45deg, transparent 49.5%, rgba(255, 255, 255, 0.04) 50%, transparent 50.5%);
  background-size: 140px 140px, 120px 120px;
  animation: connect-lines 60s linear infinite;
  opacity: 0.5;
  contain: layout style paint;
}

/* Optimized pulsing nodes */
.fallback-dotted-map::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.4) 1.5px, transparent 2.5px),
    radial-gradient(circle at 75% 25%, rgba(255, 255, 255, 0.3) 1.2px, transparent 2.2px),
    radial-gradient(circle at 80% 65%, rgba(255, 255, 255, 0.4) 1.5px, transparent 2.5px),
    radial-gradient(circle at 30% 75%, rgba(255, 255, 255, 0.3) 1.2px, transparent 2.2px);
  animation: pulse-nodes 6s ease-in-out infinite;
  contain: layout style paint;
}

@keyframes float-dots {
  0%, 100% {
    background-position: 0 0, 15px 15px, 8px 25px;
  }
  50% {
    background-position: 4px 4px, 19px 19px, 12px 29px;
  }
}

@keyframes connect-lines {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 140px 140px, -120px 120px;
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