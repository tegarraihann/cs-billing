<template>
  <section id="services" class="py-20 bg-white relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-sage-200/20 rounded-full blur-3xl"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium mb-4"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Professional Services
        </div>
        <h2
          class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-montserrat"
        >
          {{ sectionTitle || "Complete Logistics Solution" }}
        </h2>
        <p class="text-base text-gray-600 max-w-2xl mx-auto font-jost">
          {{ sectionDescription || "With over 20 years of experience, we provide high-quality logistics services with international standards." }}
        </p>
      </div>

      <!-- Services Carousel -->
      <div class="relative">
        <!-- Carousel Container -->
        <div class="overflow-hidden rounded-2xl">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <!-- Service Slides -->
            <div
              v-for="(service, index) in activeServices"
              :key="service.id"
              class="w-full flex-shrink-0"
            >
              <div class="relative h-96 md:h-[500px] group cursor-pointer" @click="handleServiceClick(service)">
                <img
                  :src="getServiceImage(service)"
                  :alt="service.title"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <!-- Service Badge -->
                <div class="absolute top-6 left-6">
                  <div class="inline-flex items-center px-3 py-1 bg-sage-600/90 text-white rounded-full text-sm font-medium">
                    <img
                      v-if="service.icon_path"
                      :src="getServiceIcon(service)"
                      :alt="`${service.title} icon`"
                      class="w-4 h-4 mr-2"
                    />
                    <component
                      v-else
                      :is="getIcon(service.icon)"
                      class="w-4 h-4 mr-2"
                    />
                    {{ service.category || 'Service' }}
                  </div>
                </div>

                <!-- Content -->
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="max-w-4xl">
                    <h3 class="text-3xl md:text-4xl font-bold text-white mb-4 font-montserrat">
                      {{ service.title }}
                    </h3>
                    <p class="text-gray-200 text-lg mb-6 font-jost max-w-2xl">
                      {{ service.description }}
                    </p>

                    <!-- Service Features -->
                    <div v-if="service.features && service.features.length > 0" class="mb-6">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-2xl">
                        <div
                          v-for="feature in service.features.slice(0, 4)"
                          :key="feature"
                          class="flex items-center text-sm text-gray-200"
                        >
                          <svg class="w-4 h-4 mr-2 text-sage-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {{ feature }}
                        </div>
                      </div>
                    </div>

                    <button
                      v-if="showServiceButtons"
                      @click.stop="handleServiceClick(service)"
                      class="inline-flex items-center px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Konsultasi {{ service.title }}
                      <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button
          @click="previousSlide"
          :disabled="currentSlide === 0"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          @click="nextSlide"
          :disabled="currentSlide >= activeServices.length - 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Slide Indicators -->
        <div class="flex justify-center mt-6 space-x-2">
          <button
            v-for="(service, index) in activeServices"
            :key="`indicator-${service.id}`"
            @click="currentSlide = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-sage-600' : 'bg-gray-300 hover:bg-gray-400'"
          ></button>
        </div>

        <!-- Service Counter -->
        <div class="text-center mt-4">
          <span class="text-sm text-gray-500 font-medium">
            {{ currentSlide + 1 }} / {{ activeServices.length }}
          </span>
        </div>
      </div>

      <!-- Contact CTA Section -->
      <ContactCTA
        v-if="showContactCTA"
        :settings="settings"
        :stats="globalStats"
        class="mt-20 lg:mt-24"
        @contact-click="scrollToContact"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { TruckIcon, GlobeAltIcon, CurrencyDollarIcon, ShieldCheckIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import ContactCTA from './Services/ContactCTA.vue'

// Props
const props = defineProps({
  services: { type: Array, required: true, default: () => [] },
  settings: { type: Object, required: true, default: () => ({}) },
  displayMode: {
    type: String,
    default: 'carousel',
    validator: (value) => ['grid', 'featured', 'carousel'].includes(value)
  },
  sectionTitle: { type: String, default: null },
  sectionDescription: { type: String, default: null },
  showContactCTA: { type: Boolean, default: true },
  showServiceButtons: { type: Boolean, default: true },
  maxServicesInCarousel: { type: Number, default: 6 }
})

// Emits
const emit = defineEmits(['service-click', 'contact-click'])

// Reactive state
const currentSlide = ref(0)
const autoPlayInterval = ref(null)

// Default services data (hanya untuk fallback jika props.services kosong)
const defaultServices = [
  {
    id: 1,
    title: 'Export & Import',
    description: 'We specialize in export and import services with comprehensive customs clearance, door-to-door delivery, and real-time tracking.',
    features: [
      'Customs Clearance & Support',
      'Door-to-Door Delivery Service',
      'Real-time Shipment Tracking',
      'Export Consultation & Support'
    ],
    category: 'Trade',
    icon: 'TruckIcon',
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 1
  },
  {
    id: 2,
    title: 'Trucking Inland',
    description: 'Ground shipping throughout Indonesia with a well-established fleet and real-time tracking.',
    features: [
      'Nationwide Coverage',
      'Fleet Management',
      'Real-time GPS Tracking',
      'Secure Transportation'
    ],
    category: 'Transport',
    icon: 'TruckIcon',
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 2
  },
  {
    id: 3,
    title: 'Money Transfer',
    description: 'International transfers at competitive rates and fast processing worldwide.',
    features: [
      'Competitive Exchange Rates',
      'Fast Processing',
      'Secure Transactions',
      'Global Coverage'
    ],
    category: 'Finance',
    icon: 'CurrencyDollarIcon',
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 3
  },
  {
    id: 4,
    title: 'Freight Insurance',
    description: 'Complete protection for shipments with comprehensive coverage and easy claims.',
    features: [
      'Comprehensive Coverage',
      'Easy Claims Process',
      'Risk Assessment',
      '24/7 Support'
    ],
    category: 'Insurance',
    icon: 'ShieldCheckIcon',
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 4
  },
  {
    id: 5,
    title: 'Stuffing/Stripping',
    description: 'Professional container loading and unloading services with careful handling.',
    features: [
      'Professional Handling',
      'Quality Control',
      'Safety Standards',
      'Equipment Expertise'
    ],
    category: 'Logistics',
    icon: 'DocumentTextIcon',
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 5
  }
]

// Computed
const activeServices = computed(() => {
  const servicesToUse = props.services.length > 0 ? props.services : defaultServices
  return servicesToUse
    .filter(service => service.is_active)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
})

const globalStats = computed(() => [
  { value: '50+', label: 'Countries' },
  { value: '15+', label: 'Years Experience' },
  { value: '500+', label: 'Active Clients' },
  { value: '99.5%', label: 'Success Rate' }
])

// Methods
const handleServiceClick = (service) => emit('service-click', service)

const scrollToContact = () => {
  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  emit('contact-click')
}

const getIcon = (iconName) => {
  const icons = {
    TruckIcon,
    GlobeAltIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    CheckCircleIcon
  }
  return icons[iconName] || CheckCircleIcon
}

const getServiceImage = (service) => {
  // Prioritas: gambar dari database > fallback placeholder
  if (service.image_path) {
    // Jika path relatif, tambahkan base URL storage
    if (service.image_path.startsWith('/')) {
      return service.image_path
    }
    return `/storage/${service.image_path}`
  }
  // Fallback ke placeholder jika tidak ada gambar dari database
  return '/images/default-service.jpg'
}

const nextSlide = () => {
  if (currentSlide.value < activeServices.value.length - 1) {
    currentSlide.value++
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const getServiceIcon = (service) => {
  if (service.icon_path) {
    // Jika path relatif, tambahkan base URL storage
    if (service.icon_path.startsWith('/')) {
      return service.icon_path
    }
    return `/storage/${service.icon_path}`
  }
  return null
}

const handleImageError = (event) => {
  // Jika gambar dari database gagal load, gunakan placeholder
  event.target.src = '/images/placeholder-service.jpg'
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    if (currentSlide.value >= activeServices.value.length - 1) {
      currentSlide.value = 0
    } else {
      currentSlide.value++
    }
  }, 5000) // Change slide every 5 seconds
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

// Lifecycle
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap");

/* Add Montserrat font class */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "jost", sans-serif;
}

/* Sage Color System */
:root {
  --sage-50: #f9faf9;
  --sage-100: #f0f2ef;
  --sage-200: #e1e6dd;
  --sage-300: #c8d2bf;
  --sage-400: #a8b897;
  --sage-500: #8db580;
  --sage-600: #7ba169;
  --sage-700: #6a8f57;
  --sage-800: #5a7a4a;
  --sage-900: #4d673f;
}

.text-sage-50 { color: var(--sage-50); }
.text-sage-100 { color: var(--sage-100); }
.text-sage-200 { color: var(--sage-200); }
.text-sage-300 { color: var(--sage-300); }
.text-sage-400 { color: var(--sage-400); }
.text-sage-500 { color: var(--sage-500); }
.text-sage-600 { color: var(--sage-600); }
.text-sage-700 { color: var(--sage-700); }
.text-sage-800 { color: var(--sage-800); }
.text-sage-900 { color: var(--sage-900); }

.bg-sage-50 { background-color: var(--sage-50); }
.bg-sage-100 { background-color: var(--sage-100); }
.bg-sage-200 { background-color: var(--sage-200); }
.bg-sage-300 { background-color: var(--sage-300); }
.bg-sage-400 { background-color: var(--sage-400); }
.bg-sage-500 { background-color: var(--sage-500); }
.bg-sage-600 { background-color: var(--sage-600); }
.bg-sage-700 { background-color: var(--sage-700); }
.bg-sage-800 { background-color: var(--sage-800); }
.bg-sage-900 { background-color: var(--sage-900); }

.bg-sage-100\/30 { background-color: rgb(240 242 239 / 0.3); }
.bg-sage-200\/20 { background-color: rgb(225 230 221 / 0.2); }
.bg-sage-600\/90 { background-color: rgb(123 161 105 / 0.9); }

.border-sage-200 { border-color: var(--sage-200); }
.border-sage-300 { border-color: var(--sage-300); }

.hover\:bg-sage-700:hover { background-color: var(--sage-700); }
.hover\:border-sage-300:hover { border-color: var(--sage-300); }

/* Gradients */
.from-sage-500 { --tw-gradient-from: var(--sage-500); }
.to-sage-700 { --tw-gradient-to: var(--sage-700); }
.via-sage-600 { --tw-gradient-via: var(--sage-600); }

/* Enhanced blur effects */
.blur-3xl { filter: blur(64px); }

/* Focus states */
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--sage-500);
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Custom backdrop blur for navigation buttons */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Carousel specific styles */
.carousel-container {
  overflow: hidden;
}

/* Ensure smooth scrolling on touch devices */
@media (hover: none) and (pointer: coarse) {
  .carousel-container {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
