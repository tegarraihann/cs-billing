<template>
    <section id="services" class="py-20 bg-white relative overflow-hidden">
        <!-- Subtle Background Elements -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium mb-4">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Professional Services
                </div>
                <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-montserrat">
                    Complete Logistics Solution
                </h2>
                <p class="text-base text-gray-600 max-w-2xl mx-auto font-jost">
                    With over 20 years of experience, we provide high-quality logistics services with international standards.
                </p>
            </div>

            <!-- Main Services Grid -->
            <div class="grid lg:grid-cols-2 gap-8 mb-20">
                <!-- Featured Service -->
                <div class="lg:row-span-2 relative rounded-xl p-8 shadow-md transition-all duration-300 overflow-hidden group">
                    <!-- Background Image -->
                    <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                         style="background-image: url('/images/export.jpg')"
                         :class="'bg-sage-50/50'">
                        <div class="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
                    </div>

                    <!-- Content Container -->
                    <div class="relative z-10">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                            </svg>
                        </div>
                        <div class="bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Featured
                        </div>
                    </div>

                    <h3 class="text-2xl font-semibold text-white mb-3 font-montserrat drop-shadow-lg bg-black/15 rounded-lg px-3 py-2 backdrop-blur-sm">
                        Export & Import
                    </h3>
                    <p class="text-white mb-6 leading-relaxed font-jost drop-shadow-md">
                        We specialize in export and import services with comprehensive customs clearance, door-to-door delivery, and real-time tracking.
                    </p>

                    <div class="space-y-2 mb-8 bg-black/8 rounded-lg p-4 backdrop-blur-sm">
                        <div v-for="feature in exportImportFeatures" :key="feature" class="flex items-start">
                            <div class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm">
                                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                </svg>
                            </div>
                            <span class="text-white text-sm font-jost font-medium drop-shadow-sm">{{ feature }}</span>
                        </div>
                    </div>

                    <button class="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg shadow-md">
                        Konsultasi Export Import
                    </button>
                    </div>
                </div>

                <!-- Other Services -->
                <div class="space-y-6">
                    <div v-for="service in otherServices" :key="service.title"
                         class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-sm transition-all duration-200 overflow-hidden group">
                        <!-- Service Background Image with inline style -->
                        <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                             :style="`background-image: url('${service.backgroundImage}');`"
                             :class="service.fallbackBg"
                             style="will-change: transform; contain: layout style paint;"
                             loading="lazy">
                            <div class="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-opacity duration-300"></div>
                        </div>

                        <div class="relative flex items-start bg-black/8 rounded-lg p-4 backdrop-blur-sm">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"
                                 :class="service.iconBg">
                                <div v-html="service.icon" class="w-5 h-5 text-white"></div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-lg font-semibold text-white mb-2 font-montserrat transition-colors duration-200 drop-shadow-md">
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
                <h3 class="text-xl font-semibold text-gray-800 mb-8 font-montserrat">
                    Support Services
                </h3>

                <div class="relative">
                    <!-- Carousel Container -->
                    <div class="overflow-hidden rounded-xl">
                        <div
                            class="flex transition-transform duration-500 ease-in-out"
                            :style="`transform: translate3d(-${currentSlide * 100}%, 0, 0)`"
                            style="will-change: transform;"
                        >
                            <div
                                v-for="(addon, index) in additionalServices"
                                :key="addon.title"
                                class="flex-shrink-0 w-full"
                            >
                                <!-- Single Service Card -->
                                <div class="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden h-80 md:h-80 group">
                                    <!-- Image Section (Left) -->
                                    <div class="w-full md:w-1/2 h-48 md:h-full relative overflow-hidden">
                                        <div
                                            class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                                            :style="`background-image: url('${addon.backgroundImage}');`"
                                            style="will-change: transform; contain: layout style paint;"
                                            loading="lazy"
                                        >
                                            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                                        </div>

                                        <!-- Icon on Image -->
                                        <div class="absolute top-6 left-6">
                                            <div class="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-all duration-300 group">
                                                <div v-html="addon.icon" class="w-8 h-8 text-sage-600 transition-colors duration-300 icon-hover"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Content Section (Right) -->
                                    <div class="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                                        <h4 class="text-xl md:text-2xl font-semibold text-gray-800 mb-3 md:mb-4 font-montserrat group-hover:text-sage-700 transition-colors duration-300">
                                            {{ addon.title }}
                                        </h4>
                                        <p class="text-gray-600 leading-relaxed font-jost group-hover:text-gray-700 transition-colors duration-300">
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
                        <button
                            @click="previousSlide"
                            :disabled="currentSlide === 0"
                            class="w-10 h-10 bg-sage-100 hover:bg-sage-200 disabled:bg-gray-100 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>

                        <!-- Dots Indicator -->
                        <div class="flex space-x-2">
                            <button
                                v-for="(slide, index) in totalSlides"
                                :key="index"
                                @click="goToSlide(index)"
                                class="w-2 h-2 rounded-full transition-all duration-200"
                                :class="currentSlide === index ? 'bg-sage-600 w-6' : 'bg-gray-300 hover:bg-sage-300'"
                            ></button>
                        </div>

                        <!-- Next Button -->
                        <button
                            @click="nextSlide"
                            :disabled="currentSlide >= totalSlides - 1"
                            class="w-10 h-10 bg-sage-100 hover:bg-sage-200 disabled:bg-gray-100 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- CTA Banner Section -->
            <div class="mt-20 lg:mt-24 relative">
                <!-- Dotted Map Background -->
                <div class="absolute inset-0 opacity-40 z-0 min-h-full">
                    <DottedMap
                        dot-color="rgba(255, 255, 255, 0.8)"
                        :dot-size="2"
                        :spacing="2"
                        :countries="['ID', 'SG', 'MY', 'TH', 'VN', 'PH', 'CN', 'JP', 'KR', 'IN', 'AU', 'NZ', 'US', 'GB', 'DE', 'FR', 'NL', 'AE', 'SA', 'BR', 'MX', 'CA']"
                    />
                </div>

                <!-- Banner Content -->
                <div class="relative bg-gradient-to-r from-sage-600 via-sage-700 to-sage-600 rounded-2xl p-6 md:p-8 lg:p-12 text-white overflow-hidden z-10">
                    <!-- Inner Dotted Map Background on Banner -->
                    <div class="absolute inset-0 opacity-15 z-0">
                        <DottedMap 
                            dot-color="rgba(255, 255, 255, 0.4)"
                            :dot-size="0.8"
                            :spacing="6"
                            :countries="['ID', 'SG', 'MY', 'TH', 'VN', 'PH', 'CN', 'JP', 'KR', 'AU', 'US']"
                        />
                    </div>
                    
                    <!-- Decorative Elements -->
                    <div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl z-5"></div>
                    <div class="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-lg z-5"></div>

                    <!-- Banner Content Grid -->
                    <div class="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
                        <!-- Left Content -->
                        <div class="flex-1 text-center lg:text-left">
                            <!-- Main Heading -->
                            <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-montserrat leading-tight">
                                Siap Melayani Kebutuhan
                                <span class="text-sage-200 block lg:inline"> Logistik Anda</span>
                            </h3>

                            <!-- Description -->
                            <p class="text-base md:text-lg text-sage-100 mb-4 md:mb-0 leading-relaxed font-jost max-w-2xl lg:max-w-none">
                                Konsultasi gratis dengan tim ahli kami. Dapatkan solusi terbaik untuk ekspor-impor, trucking, dan layanan logistik lainnya.
                            </p>
                        </div>

                        <!-- Right CTA -->
                        <div class="flex-shrink-0">
                            <button @click="scrollToContact"
                                class="bg-white text-sage-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-sage-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group flex items-center">
                                <svg class="w-5 h-5 mr-2 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <span>Hubungi Kami</span>
                                <svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Optional Stats Bar -->
                    <div class="relative z-20 mt-6 lg:mt-8 pt-6 border-t border-white/20">
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div v-for="stat in globalStats" :key="stat.label">
                                <div class="text-lg md:text-xl font-bold text-white mb-1 font-montserrat">{{ stat.value }}</div>
                                <div class="text-sage-200 text-xs md:text-sm font-medium font-jost">{{ stat.label }}</div>
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
import DottedMap from '@/Components/DottedMap.vue'

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
        iconBg: 'bg-gray-400',
        backgroundImage: '/images/trucking-bg.jpg',
        fallbackBg: 'bg-gray-50'
    },
    {
        title: 'Money Transfer',
        description: 'International transfers at competitive rates and fast processing worldwide.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        iconBg: 'bg-sage-500',
        backgroundImage: '/images/export.jpg',
        fallbackBg: 'bg-sage-50'
    },
    {
        title: 'Freight Insurance',
        description: 'Complete protection for shipments with comprehensive coverage and easy claims.',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        iconBg: 'bg-amber-500',
        backgroundImage: '/images/insurance.jpg',
        fallbackBg: 'bg-amber-50'
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
        description: 'Sistem rantai dingin untuk menjaga kualitas produk yang memerlukan suhu terkontrol',
        backgroundImage: '/images/coldchain.jpg',
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>'
    },
    {
        title: 'Freight Forwarding',
        description: 'Koordinasi pengiriman multimoda dengan jaringan global untuk efisiensi maksimal',
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
    }, 8000) // Increased interval for better performance
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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap');

/* Add Montserrat font class */
.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-jost {
    font-family: 'jost', sans-serif;
}

/* Optimized Sage Colors - Only used classes */
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-200 { background-color: #D4DDD0; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.border-sage-100 { border-color: #E8ECE5; }
.border-sage-200 { border-color: #D4DDD0; }
.hover\:border-sage-200:hover { border-color: #D4DDD0; }
.hover\:bg-sage-200:hover { background-color: #D4DDD0; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }

/* Optimized carousel transition */
.carousel-slide {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
    contain: layout style paint;
}

/* Optimized icon hover effect */
.group:hover .icon-hover svg {
    color: white !important;
    stroke: white !important;
}

.group:hover .icon-hover {
    color: white !important;
}

/* Optimized containers */
.dotted-map-background {
    position: absolute;
    inset: 0;
    pointer-events: none;
    contain: layout style paint;
}

/* Additional sage colors for CTA section */
.text-sage-100 { color: #F4F6F3; }
.text-sage-200 { color: #E8ECE5; }
.bg-sage-50 { background-color: #F4F6F3; }
</style>
