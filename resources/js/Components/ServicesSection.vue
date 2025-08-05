<template>
    <section id="services" class="py-20 relative overflow-hidden">
        <!-- Subtle Background Elements -->
        <div class="absolute top-0 right-0 w-96 h-96" style="background-color: rgba(168, 185, 151, 0.3); border-radius: 50%; filter: blur(3rem);"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80" style="background-color: rgba(138, 155, 122, 0.2); border-radius: 50%; filter: blur(3rem);"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div
                    class="inline-flex items-center px-4 py-2 bg-secondary-sage text-white rounded-full text-sm font-medium mb-4">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Professional Services
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-inter">
                    Complete Logistics Solution
                </h2>
                <p class="text-base text-gray-600 max-w-2xl mx-auto font-jost">
                    With over 20 years of experience, we provide high-quality logistics services with international
                    standards.
                </p>
            </div>

            <!-- Main Services Grid -->
            <div class="grid lg:grid-cols-2 gap-8 mb-20">
                <!-- Featured Service -->
                <div
                    class="lg:row-span-2 relative rounded-xl p-8 shadow-md transition-all duration-300 overflow-hidden group">
                    <!-- Background Image -->
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style="background-image: url('/images/export.jpg')" :class="'bg-light-sage/50'">
                        <div class="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300">
                        </div>
                    </div>

                    <!-- Content Container -->
                    <div class="relative z-10">
                        <div class="flex items-center mb-6">
                            <div
                                class="w-12 h-12 bg-primary-sage rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                            <div class="bg-primary-sage text-white px-3 py-1 rounded-full text-xs font-medium">
                                Featured
                            </div>
                        </div>


                        <div class="space-y-2 mb-8 bg-black/8 rounded-lg p-4 backdrop-blur-sm rounded-xl">
                            <h3
                                class="text-2xl font-bold text-white mb-3 font-inter drop-shadow-lg  rounded-lg py-2 ">
                                Export & Import
                            </h3>
                            <p class="text-white mb-6 leading-relaxed font-jost drop-shadow-md">
                                We specialize in export and import services with comprehensive customs clearance,
                                door-to-door delivery, and real-time tracking.
                            </p>
                            <div v-for="feature in exportImportFeatures" :key="feature" class="flex items-start">
                                <div
                                    class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span class="text-white text-sm font-jost font-medium drop-shadow-sm">{{ feature
                                    }}</span>
                            </div>
                        </div>

                        <button
                            class="w-full bg-primary-sage hover:bg-accent-sage text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg shadow-md">
                            Konsultasi Export Import
                        </button>
                    </div>
                </div>

                <!-- Other Services -->
                <div class="space-y-6">
                    <div v-for="service in otherServices" :key="service.title"
                        class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-accent-sage hover:shadow-sm transition-all duration-200 overflow-hidden group">
                        <!-- Service Background Image with inline style -->
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                            :style="`background-image: url('${service.backgroundImage}');`" :class="service.fallbackBg"
                            style="will-change: transform;" loading="lazy">
                            <div
                                class="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-opacity duration-300">
                            </div>
                        </div>

                        <div class="relative flex items-start bg-black/8 rounded-lg p-4 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"
                                :class="service.iconBg">
                                <div v-html="service.icon" class="w-5 h-5 text-white"></div>
                            </div>
                            <div class="flex-1">
                                <h4
                                    class="text-lg font-bold text-white mb-2 font-inter transition-colors duration-200 drop-shadow-md">
                                    {{ service.title }}
                                </h4>
                                <p class="text-sm text-white/95 leading-relaxed font-jost drop-shadow-sm">
                                    {{ service.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Services Carousel -->
            <div class="text-center">
                <h3 class="text-xl font-bold text-gray-800 mb-8 font-inter">
                    Support Services
                </h3>

                <div class="relative">
                    <!-- Carousel Container -->
                    <div class="overflow-hidden rounded-xl">
                        <div class="flex transition-transform duration-500 ease-in-out"
                            :style="`transform: translate3d(-${currentSlide * 100}%, 0, 0)`"
                            style="will-change: transform;">
                            <div v-for="(addon, index) in additionalServices" :key="addon.title"
                                class="flex-shrink-0 w-full">
                                <!-- Single Service Card -->
                                <div
                                    class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden h-80 md:h-80 group">
                                    <!-- Image Section (Left) -->
                                    <div class="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                            :style="`background-image: url('${addon.backgroundImage}');`"
                                            style="will-change: transform;" loading="lazy">
                                            <div
                                                class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300">
                                            </div>
                                        </div>

                                        <!-- Icon on Image -->
                                        <div class="absolute top-6 left-6">
                                            <div
                                                class="w-16 h-16 bg-primary-sage backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-accent-sage transition-all duration-300 relative">
                                                <div v-html="addon.icon"
                                                    class="w-8 h-8 text-white group-hover:text-pale-sage transition-colors duration-300 icon-hover relative z-20">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section (Right) -->
                                    <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                        <h4
                                            class="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4 font-inter group-hover:text-primary-sage transition-colors duration-300">
                                            {{ addon.title }}
                                        </h4>
                                        <p
                                            class="text-gray-600 leading-relaxed font-jost group-hover:text-gray-700 transition-colors duration-300">
                                            {{ addon.description }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Carousel Navigation -->
                    <div class="flex justify-between items-center mt-6">
                        <!-- Previous Button -->
                        <button @click="previousSlide" :disabled="currentSlide === 0"
                            class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <!-- Dots Indicator -->
                        <div class="flex space-x-2">
                            <button v-for="(slide, index) in totalSlides" :key="index" @click="goToSlide(index)"
                                class="w-2 h-2 rounded-full transition-all duration-200"
                                :class="currentSlide === index ? 'bg-primary-sage w-6' : 'bg-gray-300 hover:bg-accent-sage'"></button>
                        </div>

                        <!-- Next Button -->
                        <button @click="nextSlide" :disabled="currentSlide >= totalSlides - 1"
                            class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                    d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- CTA Banner Section -->
            <div class="mt-20 lg:mt-24 relative bg-light-sage rounded-2xl">
                <!-- Background World Map -->
                <div class="absolute inset-0 opacity-50 z-0 min-h-96">
                    <WorldMapDotted :dot-size="3" dot-color="rgba(85, 107, 47, 0.8)" :dot-spacing="25"
                        :animated="true" :show-country-highlights="true" highlight-color="rgba(85, 107, 47, 1)"
                        :opacity="1" height="100%" width="100%" />
                </div>

                <!-- Banner Content -->
                <div
                    class="relative rounded-2xl p-6 md:p-8 lg:p-12 text-white overflow-hidden z-10" style="background: linear-gradient(135deg, #556B2F 0%, #4A5F29 50%, #556B2F 100%);">
                    <!-- Inner Banner World Map -->
                    <div class="absolute inset-0 opacity-15 z-0">
                        <WorldMapDotted :dot-size="1" dot-color="rgba(255, 255, 255, 0.4)" :dot-spacing="30"
                            :animated="true" :show-country-highlights="false" :opacity="1" height="100%" width="100%" />
                    </div>

                    <!-- Decorative Elements -->
                    <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl z-5"></div>
                    <div class="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-lg z-5"></div>

                    <!-- Banner Content Grid -->
                    <div class="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                        <!-- Left Content -->
                        <div class="flex-1 text-center lg:text-left">
                            <!-- Main Heading -->
                            <h3
                                class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-inter leading-tight text-white">
                                Ready to Handle Your
                                <br>
                                <span class="font-bold drop-shadow-lg" style="color: #A8B897;">Logistics Needs</span>
                            </h3>

                            <!-- Description -->
                            <p
                                class="text-base md:text-lg text-white/90 mb-4 md:mb-0 leading-relaxed font-jost max-w-2xl lg:max-w-none">
                                Get a free consultation with our expert team. We provide the best solutions for
                                export-import,
                                trucking, and other logistics services. </p>
                        </div>

                        <!-- Right CTA -->
                        <div class="flex-shrink-0">
                            <button @click="scrollToContact"
                                class="bg-white text-primary-sage px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-accent-sage hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group flex items-center">
                                <svg class="w-5 h-5 mr-2 text-primary-sage group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>Contact Us</span>
                                <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Optional Stats Bar -->
                    <div class="relative z-20 mt-6 lg:mt-8 pt-6 border-t border-white/20">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div v-for="stat in globalStats" :key="stat.label">
                                <div class="text-lg md:text-xl font-bold text-white mb-1 font-inter">{{ stat.value
                                    }}</div>
                                <div class="text-accent-sage text-xs md:text-sm font-medium font-jost">{{ stat.label }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DottedMapCSS from '@/Components/DottedMapCSS.vue'
import WorldMapDotted from '@/Components/WorldMapDotted.vue'

const exportImportFeatures = [
    'Customs Clearance & Documentation',
    'Door-to-Door Delivery Service',
    'Real-time Shipment Tracking',
    'Expert Consultation & Support',
    'Competitive Pricing',
]

const otherServices = [
    {
        title: 'Trucking Inland',
        description: 'Ground shipping throughout Indonesia with a well-maintained fleet and real-time tracking.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V9a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V15a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h4a1 1 0 001-1m-6 0H9m0 0H5m0 0v-4a1 1 0 011-1h4a1 1 0 011 1v4"/></svg>',
        iconBg: 'bg-primary-sage',
        backgroundImage: '/images/trucking-bg.jpg',
        fallbackBg: 'bg-light-sage'
    },
    {
        title: 'Money Transfer',
        description: 'International transfers at competitive rates and fast processing worldwide.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        iconBg: 'bg-primary-sage',
        backgroundImage: '/images/export.jpg',
        fallbackBg: 'bg-light-sage'
    },
    {
        title: 'Freight Insurance',
        description: 'Complete protection for shipments with comprehensive coverage and easy claims.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        iconBg: 'bg-primary-sage',
        backgroundImage: '/images/insurance.jpg',
        fallbackBg: 'bg-light-sage'
    }
]

const additionalServices = [
    {
        title: 'Warehousing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/warehouse.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>'
    },
    {
        title: 'Packaging',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/packaging.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
    },
    {
        title: 'Cargo Service',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/cargo-service.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    },

    {
        title: 'Stuffing/Stripping',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/stuffing.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
    },
    {
        title: 'Cold Chain',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/coldchain.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>'
    },
    {
        title: 'Freight Forwarding',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/freight.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
    }
]

// Global statistics for CTA section
const globalStats = [
    { value: '50+', label: 'Countries' },
    { value: '15+', label: 'Years Experience' },
    { value: '500+', label: 'Active Clients' },
    { value: '99.5%', label: 'Success Rate' }
]

// Scroll functions for CTA buttons
const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}

// Carousel functionality
const currentSlide = ref(0)

const totalSlides = computed(() => {
    return additionalServices.length
})

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
}

// Reset slide if current slide is out of bounds
const resetSlideIfNeeded = () => {
    if (currentSlide.value >= totalSlides.value) {
        currentSlide.value = Math.max(0, totalSlides.value - 1)
    }
}

// Optimized auto slide with idle detection
let autoSlideInterval = null
let isPageVisible = true

const startAutoSlide = () => {
    if (!isPageVisible) return

    autoSlideInterval = setInterval(() => {
        if (!isPageVisible) return

        if (currentSlide.value >= totalSlides.value - 1) {
            currentSlide.value = 0
        } else {
            nextSlide()
        }
    }, 6000) // Restore original interval
}

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
        autoSlideInterval = null
    }
}

const handleVisibilityChange = () => {
    isPageVisible = !document.hidden
    if (isPageVisible) {
        startAutoSlide()
    } else {
        stopAutoSlide()
    }
}

onMounted(() => {
    resetSlideIfNeeded()
    startAutoSlide()
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true })
})

onUnmounted(() => {
    stopAutoSlide()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Jost:wght@400;500;600&display=swap');

/* Service Section Color Variables */
:root {
    --primary-sage: #556B2F;    /* CTA buttons */
    --secondary-sage: #6B7F5A;  /* Icons, badges */
    --accent-sage: #8A9B7A;     /* Hover effects */
    --light-sage: #A8B897;      /* Backgrounds */
    --pale-sage: #C5D1B7;       /* Subtle backgrounds */
}

/* Add Inter font class */
.font-inter {
    font-family: 'Inter', sans-serif;
}

/* Primary color utilities - CTA buttons */
.text-primary-sage { color: #556B2F !important; }
.bg-primary-sage { background-color: #556B2F !important; }
.border-primary-sage { border-color: #556B2F !important; }
.hover\:bg-primary-sage:hover { background-color: #556B2F !important; }

/* Secondary color utilities - Icons, badges */
.text-secondary-sage { color: #6B7F5A !important; }
.bg-secondary-sage { background-color: #6B7F5A !important; }
.border-secondary-sage { border-color: #6B7F5A !important; }
.hover\:bg-secondary-sage:hover { background-color: #6B7F5A !important; }

/* Accent color utilities - Hover effects */
.text-accent-sage { color: #8A9B7A !important; }
.bg-accent-sage { background-color: #8A9B7A !important; }
.border-accent-sage { border-color: #8A9B7A !important; }
.hover\:bg-accent-sage:hover { background-color: #8A9B7A !important; }
.hover\:text-white:hover { color: white !important; }

/* Light sage utilities - Backgrounds */
.bg-light-sage { background-color: #A8B897 !important; }
.text-light-sage { color: #A8B897 !important; }

/* Pale sage utilities - Subtle backgrounds */
.bg-pale-sage { background-color: #C5D1B7 !important; }
.text-pale-sage { color: #C5D1B7 !important; }
.hover\:bg-pale-sage:hover { background-color: #C5D1B7 !important; }

.font-jost {
    font-family: 'jost', sans-serif;
}


/* Carousel transition optimization */
.carousel-slide {
    transition: transform 0.5s ease-in-out;
    will-change: transform;
}

/* Optimized icon hover effect */
.group:hover .icon-hover svg {
    color: #C5D1B7 !important;
    stroke: #C5D1B7 !important;
    fill: none !important;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

.group:hover .icon-hover {
    color: #C5D1B7 !important;
    z-index: 20;
    position: relative;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
}

/* Additional service icon styling */
.icon-hover {
    z-index: 20;
    position: relative;
}

.icon-hover svg {
    display: block;
    position: relative;
    z-index: 21;
}


</style>
