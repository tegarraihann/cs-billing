<template>
    <section id="services" class="py-20 bg-white relative overflow-hidden">
        <!-- Subtle Background Elements -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <div class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium mb-4">
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Layanan Profesional
                </div>
                <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
                    Solusi Logistik Terlengkap
                </h2>
                <p class="text-base text-gray-600 max-w-2xl mx-auto">
                    Dengan pengalaman lebih dari 15 tahun, kami menyediakan layanan logistik berkualitas tinggi dengan standar internasional.
                </p>
            </div>

            <!-- Main Services Grid -->
            <div class="grid lg:grid-cols-2 gap-8 mb-20">
                <!-- Featured Service -->
                <div class="lg:row-span-2 bg-sage-50/50 rounded-xl p-8 shadow-md transition-all duration-300">
                    <div class="flex items-center mb-6">
                        <div class="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200">
                            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                            </svg>
                        </div>
                        <div class="bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Unggulan
                        </div>
                    </div>

                    <h3 class="text-2xl font-semibold text-gray-800 mb-3">
                        Export & Import
                    </h3>
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi dengan berbagai pihak terkait.
                    </p>

                    <div class="space-y-3 mb-8">
                        <div v-for="feature in exportImportFeatures" :key="feature" class="flex items-start">
                            <div class="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                                <svg class="w-3 h-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                                </svg>
                            </div>
                            <span class="text-gray-700 text-sm">{{ feature }}</span>
                        </div>
                    </div>

                    <button class="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-sm">
                        Konsultasi Export Import
                    </button>
                </div>

                <!-- Other Services -->
                <div class="space-y-6">
                    <div v-for="service in otherServices" :key="service.title"
                         class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-sm transition-all duration-200 overflow-hidden group">
                        <!-- Service Background Image with inline style -->
                        <div class="absolute inset-0"
                             :style="`background-image: url('${service.backgroundImage}'); background-size: cover; background-position: center;`"
                             :class="service.fallbackBg">
                            <div class="absolute inset-0 bg-white/90 group-hover:bg-white/85 transition-all duration-300"></div>
                        </div>

                        <div class="relative flex items-start">
                            <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"
                                 :class="service.iconBg">
                                <div v-html="service.icon" class="w-5 h-5 text-white"></div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-lg font-semibold text-gray-800 mb-2">
                                    {{ service.title }}
                                </h4>
                                <p class="text-sm text-gray-600 leading-relaxed">
                                    {{ service.description }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Services Carousel -->
            <div class="text-center">
                <h3 class="text-xl font-semibold text-gray-800 mb-8">
                    Layanan Pendukung
                </h3>

                <div class="relative">
                    <!-- Carousel Container -->
                    <div class="overflow-hidden rounded-xl">
                        <div
                            class="flex transition-transform duration-500 ease-in-out"
                            :style="`transform: translateX(-${currentSlide * (100 / slidesPerView)}%)`"
                        >
                            <div
                                v-for="(addon, index) in additionalServices"
                                :key="addon.title"
                                class="relative flex-shrink-0 h-64 group cursor-pointer overflow-hidden rounded-lg mx-2"
                                :class="slidesPerView === 1 ? 'w-full' : slidesPerView === 2 ? 'w-1/2' : 'w-1/3'"
                                :style="`background-image: url('${addon.backgroundImage}'); background-size: cover; background-position: center;`"
                            >
                                <!-- Dark overlay that appears on hover -->
                                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                                <!-- Content -->
                                <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                    <!-- Icon -->
                                    <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:bg-sage-800 transition-all duration-300">
                                        <div v-html="addon.icon" class="w-6 h-6 text-white"></div>
                                    </div>

                                    <!-- Title -->
                                    <h4 class="text-xl font-semibold mb-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
                                        {{ addon.title }}
                                    </h4>

                                    <!-- Description - hidden by default, shows on hover -->
                                    <p class="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-gray-200">
                                        {{ addon.description }}
                                    </p>
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
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
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
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

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
        description: 'Pengiriman darat ke seluruh Indonesia dengan armada terawat dan tracking real-time.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: 'bg-gray-400',
        backgroundImage: '/images/trucking-bgg.jpg',
        fallbackBg: 'bg-gray-50'
    },
    {
        title: 'Transfer Uang',
        description: 'Transfer internasional dengan kurs kompetitif dan proses cepat ke seluruh dunia.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: 'bg-sage-500',
        backgroundImage: '/images/exportt.jpg',
        fallbackBg: 'bg-sage-50'
    },
    {
        title: 'Asuransi Barang',
        description: 'Proteksi lengkap untuk kiriman dengan coverage komprehensif dan klaim mudah.',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: 'bg-amber-500',
        backgroundImage: '/images/insurancee.jpg',
        fallbackBg: 'bg-amber-50'
    }
]

const additionalServices = [
    {
        title: 'Warehousing',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/warehouse.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
    },
    {
        title: 'Packaging',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/packaging.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
    },
    {
        title: 'Cargo Service',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/cargo-service.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
    },

    {
        title: 'Stuffing/Stripping',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        backgroundImage: '/images/stuffing.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 4a1 1 0 100 2h6a1 1 0 100-2H7zm0 3a1 1 0 100 2h3a1 1 0 100-2H7z"/></svg>'
    },
    {
        title: 'Cold Chain',
        description: 'Sistem rantai dingin untuk menjaga kualitas produk yang memerlukan suhu terkontrol',
        backgroundImage: '/images/coldchain.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.715-5.349L11 7.618V9a1 1 0 11-2 0V7.618L6.237 6.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"/></svg>'
    },
    {
        title: 'Freight Forwarding',
        description: 'Koordinasi pengiriman multimoda dengan jaringan global untuk efisiensi maksimal',
        backgroundImage: '/images/freight.jpg',
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>'
    }
]

// Carousel functionality
const currentSlide = ref(0)
const slidesPerView = ref(3)

const totalSlides = computed(() => {
    return Math.ceil(additionalServices.length / slidesPerView.value)
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

// Responsive slides per view
const updateSlidesPerView = () => {
    if (window.innerWidth < 768) {
        slidesPerView.value = 1
    } else if (window.innerWidth < 1024) {
        slidesPerView.value = 2
    } else {
        slidesPerView.value = 3
    }

    // Reset slide if current slide is out of bounds
    if (currentSlide.value >= totalSlides.value) {
        currentSlide.value = Math.max(0, totalSlides.value - 1)
    }
}

// Auto slide
let autoSlideInterval = null

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        if (currentSlide.value >= totalSlides.value - 1) {
            currentSlide.value = 0
        } else {
            nextSlide()
        }
    }, 5000)
}

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
        autoSlideInterval = null
    }
}

onMounted(() => {
    updateSlidesPerView()
    window.addEventListener('resize', updateSlidesPerView)
    startAutoSlide()
})

onUnmounted(() => {
    window.removeEventListener('resize', updateSlidesPerView)
    stopAutoSlide()
})
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 { color: #8DB580; }
.text-sage-700 { color: #7BA169; }
.bg-sage-50 { background-color: #F4F6F3; }
.bg-sage-100 { background-color: #E8ECE5; }
.bg-sage-200 { background-color: #D4DDD0; }
.bg-sage-300 { background-color: #C1CDB8; }
.bg-sage-500 { background-color: #8DB580; }
.bg-sage-600 { background-color: #8DB580; }
.bg-sage-700 { background-color: #7BA169; }
.border-sage-100 { border-color: #E8ECE5; }
.border-sage-200 { border-color: #D4DDD0; }
.hover\:border-sage-200:hover { border-color: #D4DDD0; }
.hover\:bg-sage-200:hover { background-color: #D4DDD0; }
.hover\:bg-sage-300:hover { background-color: #C1CDB8; }
.hover\:bg-sage-700:hover { background-color: #7BA169; }

/* Carousel specific styles */
.carousel-slide {
    transition: transform 0.5s ease-in-out;
}

/* Custom scrollbar for carousel if needed */
.carousel-container::-webkit-scrollbar {
    display: none;
}

.carousel-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
