<template>
    <div class="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-2xl md:px-8">
        <div class="flex h-96 w-full flex-col items-center justify-center">
            <div class="relative flex h-full w-full items-center justify-center">
                <!-- Left Side - Layered Photo Cards -->
                <div class="relative flex flex-col items-center justify-center">
                    <div class="relative w-80 h-80">
                        <!-- Stacked Photos -->
                        <div class="absolute inset-0 w-full h-full">
                            <!-- All photos rendered, positioned with CSS transforms -->
                            <div v-for="(testimonial, index) in testimonials" :key="index"
                                class="absolute w-full h-full rounded-2xl overflow-hidden shadow-xl smooth-card-transition"
                                :class="getCardClasses(index)"
                                :style="getCardStyle(index)">
                                <img :src="testimonial.src" :alt="testimonial.name"
                                    class="w-full h-full object-cover rounded-2xl bg-white" />

                                <!-- Photo Overlay with Name (only show on active) -->
                                <div v-if="index === active"
                                    class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-2xl smooth-overlay-transition">
                                    <h4 class="text-white font-bold text-lg">{{ testimonial.name }}</h4>
                                    <p class="text-white/90 text-sm flex items-center">
                                        <template v-if="testimonial.designation.includes('+62') || testimonial.designation.includes('0895')">
                                            <span class="mr-2">{{ testimonial.designation.split('|')[0].trim() }}</span>
                                            <span class="flex items-center">
                                                <svg class="w-4 h-4 mr-1 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {{ testimonial.designation.split('|')[1].trim() }}
                                            </span>
                                        </template>
                                        <template v-else>
                                            {{ testimonial.designation }}
                                        </template>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Floating Elements -->
                        <div class="absolute -top-4 -right-4 w-6 h-6 bg-sage-400 rounded-full opacity-60 animate-pulse">
                        </div>
                        <div class="absolute -bottom-6 -left-6 w-8 h-8 bg-sage-300 rounded-full opacity-40"></div>
                        <div class="absolute top-1/2 -right-8 w-4 h-4 bg-sage-500 rounded-full opacity-50"></div>
                    </div>
                </div>

            </div>

            <!-- Navigation Controls - Positioned below the photo cards -->
            <div class="flex flex-row items-center justify-center gap-4 py-6">
                <button @click="handlePrev" :disabled="isTransitioning"
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 hover:bg-sage-200 transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sage-100 disabled:hover:shadow-md">
                    <ChevronLeftIcon class="h-6 w-6 text-sage-700 transition-transform duration-200" 
                        :class="{ 'scale-90': isTransitioning }" />
                </button>
                <button @click="handleNext" :disabled="isTransitioning"
                    class="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 hover:bg-sage-200 transition-colors duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sage-100 disabled:hover:shadow-md">
                    <ChevronRightIcon class="h-6 w-6 text-sage-700 transition-transform duration-200" 
                        :class="{ 'scale-90': isTransitioning }" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    testimonials: {
        type: Array,
        required: true,
        validator: (testimonials) => {
            return testimonials.every(testimonial =>
                testimonial.quote &&
                testimonial.name &&
                testimonial.designation &&
                testimonial.src
            )
        }
    },
    autoplay: {
        type: Boolean,
        default: false
    }
})

const active = ref(0)
let interval = null
let isTransitioning = ref(false)

const handleNext = () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    active.value = (active.value + 1) % props.testimonials.length
    setTimeout(() => {
        isTransitioning.value = false
    }, 600)
}

const handlePrev = () => {
    if (isTransitioning.value) return
    isTransitioning.value = true
    active.value = (active.value - 1 + props.testimonials.length) % props.testimonials.length
    setTimeout(() => {
        isTransitioning.value = false
    }, 600)
}

const getCardRotation = (index) => {
    const rotations = [-8, -4, 0, 4, 8, -6, 6, -2, 2, -7]
    return rotations[index % rotations.length]
}

const getCardStyle = (index) => {
    const totalItems = props.testimonials.length
    const activeIndex = active.value
    
    // Calculate relative position
    let relativePosition = index - activeIndex
    if (relativePosition > totalItems / 2) {
        relativePosition -= totalItems
    } else if (relativePosition < -totalItems / 2) {
        relativePosition += totalItems
    }
    
    // Define card positions
    if (relativePosition === 0) {
        // Active card (front)
        return {
            transform: `rotate(${getCardRotation(index)}deg) scale(1) translateY(0px) translateX(0px)`,
            zIndex: 10,
            opacity: 1
        }
    } else if (relativePosition === 1 || relativePosition === -totalItems + 1) {
        // Next card (middle)
        return {
            transform: `rotate(3deg) scale(0.94) translateY(4px) translateX(10px)`,
            zIndex: 5,
            opacity: 0.85
        }
    } else if (relativePosition === 2 || relativePosition === -totalItems + 2) {
        // Card behind (back)
        return {
            transform: `rotate(-6deg) scale(0.88) translateY(8px) translateX(15px)`,
            zIndex: 2,
            opacity: 0.7
        }
    } else {
        // Hidden cards
        return {
            transform: `rotate(${getCardRotation(index)}deg) scale(0.8) translateY(20px) translateX(${relativePosition > 0 ? 30 : -30}px)`,
            zIndex: 1,
            opacity: 0
        }
    }
}

const getCardClasses = (index) => {
    const totalItems = props.testimonials.length
    const activeIndex = active.value
    
    let relativePosition = index - activeIndex
    if (relativePosition > totalItems / 2) {
        relativePosition -= totalItems
    } else if (relativePosition < -totalItems / 2) {
        relativePosition += totalItems
    }
    
    if (relativePosition === 0) {
        return 'layered-card-shadow'
    }
    return ''
}

// onMounted(() => {
//   if (props.autoplay) {
//     interval = setInterval(handleNext, 10000)
//   }
// })

onUnmounted(() => {
    if (interval) {
        clearInterval(interval)
    }
})
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-400 {
    color: #A3B096;
}

.text-sage-600 {
    color: #8DB580;
}

.text-sage-700 {
    color: #7BA169;
}

.bg-sage-100 {
    background-color: #E8ECE5;
}

.bg-sage-200 {
    background-color: #D4DDD0;
}

.bg-sage-300 {
    background-color: #BFD0B8;
}

.bg-sage-400 {
    background-color: #A3B096;
}

.bg-sage-500 {
    background-color: #96A689;
}

.bg-sage-600 {
    background-color: #8DB580;
}

.hover\:bg-sage-200:hover {
    background-color: #D4DDD0;
}

/* Layered Card Effect */
.layered-card-shadow {
    box-shadow:
        0 25px 50px -12px rgba(0, 0, 0, 0.25),
        0 10px 20px -5px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.1);
}

/* Enhanced Transitions */
.rotate-12 {
    transform: rotate(12deg);
}

.-rotate-12 {
    transform: rotate(-12deg);
}

/* Smooth card transitions */
.smooth-card-transition {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform, opacity, z-index;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

/* Smooth overlay transition */
.smooth-overlay-transition {
    transition: opacity 0.3s ease-in-out;
}

/* Hardware acceleration for better performance */
.smooth-card-transition img {
    transform: translateZ(0);
    backface-visibility: hidden;
}

/* Remove default transition styles that might conflict */
.transition-all {
    transition: none !important;
}

/* Floating Animation */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

/* Pulse Animation for Floating Elements */
@keyframes pulse {

    0%,
    100% {
        opacity: 0.6;
    }

    50% {
        opacity: 0.3;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
