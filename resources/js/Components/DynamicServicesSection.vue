<!-- DynamicServicesSection.vue -->
<template>
  <section id="services" class="py-20 relative overflow-hidden">
    <!-- Subtle Background Elements -->
    <div class="absolute top-0 right-0 w-96 h-96" style="background-color: rgba(168, 185, 151, 0.3); border-radius: 50%; filter: blur(3rem);"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80" style="background-color: rgba(138, 155, 122, 0.2); border-radius: 50%; filter: blur(3rem);"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center px-4 py-2 bg-secondary-sage text-white rounded-full text-sm font-medium mb-4"
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
        <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-inter">
          {{ sectionTitle || "Complete Logistics Solution" }}
        </h2>
        <p class="text-base text-gray-600 max-w-2xl mx-auto font-jost">
          {{
            sectionDescription ||
            "With over 20 years of experience, we provide high-quality logistics services with international standards."
          }}
        </p>
      </div>

      <!-- Main Services Grid -->
      <div class="grid lg:grid-cols-2 gap-8 mb-20">
        <!-- Featured Service (First Service) -->
        <div
          v-if="activeServices.length > 0"
          class="lg:row-span-2 relative rounded-xl p-8 shadow-md transition-all duration-300 overflow-hidden group"
        >
          <!-- Background Image -->
          <div
            class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            :style="`background-image: url('${getServiceImage(activeServices[0])}');`"
            :class="'bg-light-sage/50'"
          >
            <div
              class="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"
            ></div>
          </div>

          <!-- Content Container -->
          <div class="relative z-10">
            <div class="flex items-center mb-6">
              <div
                class="w-12 h-12 bg-primary-sage rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"
              >
                <component
                  :is="getDefaultIcon(0)"
                  class="w-6 h-6 text-white"
                />
              </div>
              <div
                class="bg-primary-sage text-white px-3 py-1 rounded-full text-xs font-medium"
              >
                Featured
              </div>
            </div>

            <div class="space-y-2 mb-8 bg-black/20 rounded-lg p-4 backdrop-blur-none rounded-xl">
              <h3
                class="text-2xl font-bold text-white mb-3 font-inter drop-shadow-lg rounded-lg py-2"
              >
                {{ activeServices[0].title }}
              </h3>
              <p class="text-white mb-6 leading-relaxed font-jost drop-shadow-md">
                {{ activeServices[0].description }}
              </p>
              <div
                v-if="getServiceFeatures(activeServices[0]).length > 0"
                v-for="feature in getServiceFeatures(activeServices[0])"
                :key="feature"
                class="flex items-start"
              >
                <div
                  class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm"
                >
                  <svg
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span class="text-white text-sm font-jost font-medium drop-shadow-sm">
                  {{ feature }}
                </span>
              </div>
            </div>

            <button
              @click="handleServiceClick(activeServices[0])"
              class="w-full bg-primary-sage hover:bg-accent-sage text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg shadow-md"
            >
              Konsultasi {{ activeServices[0].title }}
            </button>
          </div>
        </div>

        <!-- Other Services -->
        <div class="space-y-6">
          <div
            v-for="(service, index) in activeServices.slice(1, 4)"
            :key="service.id"
            class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-accent-sage hover:shadow-sm transition-all duration-200 overflow-hidden group"
          >
            <!-- Service Background Image -->
            <div
              class="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              :style="`background-image: url('${getServiceImage(service)}');`"
              :class="'bg-light-sage'"
              style="will-change: transform;"
              loading="lazy"
            >
              <div
                class="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-opacity duration-300"
              ></div>
            </div>

            <div class="relative flex items-start bg-black/25 rounded-lg p-4 backdrop-blur-none">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200 bg-primary-sage"
              >
                <component
                  :is="getDefaultIcon(index + 1)"
                  class="w-5 h-5 text-white"
                />
              </div>
              <div class="flex-1">
                <h4
                  class="text-lg font-bold text-white mb-2 font-inter transition-colors duration-200 drop-shadow-md"
                >
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
      <div v-if="activeSupportServices.length > 0" class="text-center">
        <h3 class="text-xl font-bold text-gray-800 mb-8 font-inter">
          Support Services
        </h3>

        <div class="relative">
          <!-- Carousel Container -->
          <div class="overflow-hidden rounded-xl">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="`transform: translate3d(-${currentSupportSlide * 100}%, 0, 0)`"
              style="will-change: transform;"
            >
              <div
                v-for="(supportService, index) in activeSupportServices"
                :key="supportService.id"
                class="flex-shrink-0 w-full"
              >
                <!-- Single Support Service Card with Full Background -->
                <div class="relative rounded-xl shadow-lg overflow-hidden h-80 md:h-80 group cursor-pointer">
                  <!-- Full Background Image with Blur Effect -->
                  <div
                    class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                    :style="`background-image: url('${getSupportServiceImage(supportService)}');`"
                    style="will-change: transform;"
                    loading="lazy"
                  >
                    <!-- Blur filter on hover -->
                    <div class="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500"></div>
                    <!-- Black gradient overlay for text readability -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-500"></div>
                  </div>

                  <!-- Icon positioned at top -->
                  <div class="absolute top-6 left-6 z-10">
                    <div class="w-16 h-16 bg-primary-sage/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-accent-sage/90 group-hover:scale-110 transition-all duration-300 relative shadow-lg">
                      <component
                        v-if="!supportService.icon_path"
                        :is="getSupportServiceDefaultIcon(index)"
                        class="w-8 h-8 text-white group-hover:text-pale-sage transition-colors duration-300 icon-hover relative z-20"
                      />
                      <img
                        v-else
                        :src="getSupportServiceIcon(supportService)"
                        :alt="`${supportService.title} icon`"
                        class="w-8 h-8 object-contain"
                      />
                    </div>
                  </div>

                  <!-- Content Section - Animated from bottom -->
                  <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    <!-- Text container with slide up animation -->
                    <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h4 class="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-inter drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                        {{ supportService.title }}
                      </h4>
                      <!-- Description with delayed animation -->
                      <p class="text-white/90 leading-relaxed font-jost drop-shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150">
                        {{ supportService.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Navigation -->
          <div class="flex justify-between items-center mt-6">
            <!-- Previous Button -->
            <button
              @click="previousSupportSlide"
              :disabled="currentSupportSlide === 0"
              class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <!-- Dots Indicator -->
            <div class="flex space-x-2">
              <button
                v-for="(slide, index) in totalSupportSlides"
                :key="index"
                @click="goToSupportSlide(index)"
                class="w-2 h-2 rounded-full transition-all duration-200"
                :class="currentSupportSlide === index ? 'bg-primary-sage w-6' : 'bg-gray-300 hover:bg-accent-sage'"
              ></button>
            </div>

            <!-- Next Button -->
            <button
              @click="nextSupportSlide"
              :disabled="currentSupportSlide >= totalSupportSlides - 1"
              class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- CTA Banner Section - Updated to match serviceSection.vue -->
      <div v-if="showContactCTA" class="mt-20 lg:mt-24 relative bg-light-sage rounded-2xl">
        <!-- Background World Map -->
        <div class="absolute inset-0 opacity-50 z-0 min-h-96">
          <WorldMapDotted
            :dot-size="3"
            dot-color="rgba(85, 107, 47, 0.8)"
            :dot-spacing="25"
            :animated="true"
            :show-country-highlights="true"
            highlight-color="rgba(85, 107, 47, 1)"
            :opacity="1"
            height="100%"
            width="100%"
          />
        </div>

        <!-- Banner Content -->
        <div
          class="relative rounded-2xl p-6 md:p-8 lg:p-12 text-white overflow-hidden z-10"
          style="background: linear-gradient(135deg, #556B2F 0%, #4A5F29 50%, #556B2F 100%);"
        >
          <!-- Inner Banner World Map -->
          <div class="absolute inset-0 opacity-15 z-0">
            <WorldMapDotted
              :dot-size="1"
              dot-color="rgba(255, 255, 255, 0.4)"
              :dot-spacing="30"
              :animated="true"
              :show-country-highlights="false"
              :opacity="1"
              height="100%"
              width="100%"
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
              <h3
                class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-inter leading-tight text-white"
              >
                Ready to Handle Your
                <br>
                <span class="font-bold drop-shadow-lg" style="color: #A8B897;">Logistics Needs</span>
              </h3>

              <!-- Description -->
              <p
                class="text-base md:text-lg text-white/90 mb-4 md:mb-0 leading-relaxed font-jost max-w-2xl lg:max-w-none"
              >
                Get a free consultation with our expert team. We provide the best solutions for
                export-import, trucking, and other logistics services.
              </p>
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
                <div class="text-lg md:text-xl font-bold text-white mb-1 font-inter">{{ stat.value }}</div>
                <div class="text-accent-sage text-xs md:text-sm font-medium font-jost">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import {
  TruckIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";
import WorldMapDotted from '@/Components/WorldMapDotted.vue';

// Props
const props = defineProps({
  services: { type: Array, required: true, default: () => [] },
  supportServices: { type: Array, default: () => [] },
  settings: { type: Object, required: true, default: () => ({}) },
  displayMode: {
    type: String,
    default: "carousel",
    validator: (value) => ["grid", "featured", "carousel"].includes(value),
  },
  sectionTitle: { type: String, default: null },
  sectionDescription: { type: String, default: null },
  showContactCTA: { type: Boolean, default: true },
  showServiceButtons: { type: Boolean, default: true },
  maxServicesInCarousel: { type: Number, default: 6 },
});

// Emits
const emit = defineEmits(["service-click", "contact-click"]);

// Reactive state
const currentSlide = ref(0);
const currentSupportSlide = ref(0);
const autoPlayInterval = ref(null);

// Default services data (hanya untuk fallback jika props.services kosong)
const defaultServices = [
  {
    id: 1,
    title: "Export & Import",
    description:
      "We specialize in export and import services with comprehensive customs clearance, door-to-door delivery, and real-time tracking.",
    features: [
      "Customs Clearance & Support",
      "Door-to-Door Delivery Service",
      "Real-time Shipment Tracking",
      "Export Consultation & Support",
    ],
    category: "Trade",
    icon: "TruckIcon",
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 1,
  },
  {
    id: 2,
    title: "Trucking Inland",
    description:
      "Ground shipping throughout Indonesia with a well-established fleet and real-time tracking.",
    features: [
      "Nationwide Coverage",
      "Fleet Management",
      "Real-time GPS Tracking",
      "Secure Transportation",
    ],
    category: "Transport",
    icon: "TruckIcon",
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 2,
  },
  {
    id: 3,
    title: "Money Transfer",
    description:
      "International transfers at competitive rates and fast processing worldwide.",
    features: [
      "Competitive Exchange Rates",
      "Fast Processing",
      "Secure Transactions",
      "Global Coverage",
    ],
    category: "Finance",
    icon: "CurrencyDollarIcon",
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 3,
  },
  {
    id: 4,
    title: "Freight Insurance",
    description:
      "Complete protection for shipments with comprehensive coverage and easy claims.",
    features: [
      "Comprehensive Coverage",
      "Easy Claims Process",
      "Risk Assessment",
      "24/7 Support",
    ],
    category: "Insurance",
    icon: "ShieldCheckIcon",
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 4,
  },
  {
    id: 5,
    title: "Stuffing/Stripping",
    description:
      "Professional container loading and unloading services with careful handling.",
    features: [
      "Professional Handling",
      "Quality Control",
      "Safety Standards",
      "Equipment Expertise",
    ],
    category: "Logistics",
    icon: "DocumentTextIcon",
    image_path: null, // Akan diambil dari database
    icon_path: null, // Akan diambil dari database
    is_active: true,
    order_index: 5,
  },
];

// Computed
const activeServices = computed(() => {
  const servicesToUse =
    props.services.length > 0 ? props.services : defaultServices;
  return servicesToUse
    .filter((service) => service.is_active)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
});

const activeSupportServices = computed(() => {
  return props.supportServices
    .filter((service) => service.is_active)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
});

const totalSupportSlides = computed(() => {
  return activeSupportServices.value.length;
});

const globalStats = computed(() => [
  { value: "50+", label: "Countries" },
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Active Clients" },
  { value: "99.5%", label: "Success Rate" },
]);

// Methods
const handleServiceClick = (service) => emit("service-click", service);

const scrollToContact = () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  emit("contact-click");
};

const getIcon = (iconName) => {
  const icons = {
    TruckIcon,
    GlobeAltIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    DocumentTextIcon,
    CheckCircleIcon,
  };
  return icons[iconName] || CheckCircleIcon;
};

const getServiceImage = (service) => {
  // Prioritas: gambar dari database > fallback placeholder
  if (service.image_path) {
    // Jika path relatif, tambahkan base URL storage
    if (service.image_path.startsWith("/")) {
      return service.image_path;
    }
    return `/storage/${service.image_path}`;
  }
  // Fallback ke placeholder jika tidak ada gambar dari database
  return "/images/default-service.jpg";
};

// Default icon mapping berdasarkan index
const getDefaultIcon = (index) => {
  const iconMap = {
    0: 'GlobeAltIcon', // Export/Import - globe
    1: 'TruckIcon',    // Trucking
    2: 'CurrencyDollarIcon', // Money Transfer
    3: 'ShieldCheckIcon',    // Insurance
    4: 'DocumentTextIcon',   // Documentation
  };

  const iconName = iconMap[index] || 'CheckCircleIcon';
  return getIcon(iconName);
};

// Get service features with fallback
const getServiceFeatures = (service) => {
  if (service.features && Array.isArray(service.features)) {
    return service.features.slice(0, 4);
  }

  // Fallback features based on service title
  const fallbackFeatures = {
    'Export & Import': [
      'Customs Clearance & Documentation',
      'Door-to-Door Delivery Service',
      'Real-time Shipment Tracking',
      'Expert Consultation & Support'
    ],
    'Trucking Inland': [
      'Nationwide Coverage',
      'Fleet Management',
      'Real-time GPS Tracking',
      'Secure Transportation'
    ],
    'Money Transfer': [
      'Competitive Exchange Rates',
      'Fast Processing',
      'Secure Transactions',
      'Global Coverage'
    ],
    'Freight Insurance': [
      'Comprehensive Coverage',
      'Easy Claims Process',
      'Risk Assessment',
      '24/7 Support'
    ]
  };

  return fallbackFeatures[service.title] || [];
};

const getServiceIcon = (service) => {
  if (service.icon_path) {
    // Jika path relatif, tambahkan base URL storage
    if (service.icon_path.startsWith("/")) {
      return service.icon_path;
    }
    return `/storage/${service.icon_path}`;
  }
  return null;
};

const handleImageError = (event) => {
  // Jika gambar dari database gagal load, gunakan placeholder
  event.target.src = "/images/placeholder-service.jpg";
};

// Support Services methods
const getSupportServiceImage = (supportService) => {
  if (supportService.image_path) {
    if (supportService.image_path.startsWith("/")) {
      return supportService.image_path;
    }
    return `/storage/${supportService.image_path}`;
  }
  // Fallback images based on title
  const fallbackImages = {
    'Warehousing': '/images/warehouse.jpg',
    'Packaging': '/images/packaging.jpg',
    'Cargo Service': '/images/cargo-service.jpg',
    'Stuffing/Stripping': '/images/stuffing.jpg',
    'Cold Chain': '/images/coldchain.jpg',
    'Freight Forwarding': '/images/freight.jpg'
  };
  return fallbackImages[supportService.title] || '/images/default-support-service.jpg';
};

const getSupportServiceIcon = (supportService) => {
  if (supportService.icon_path) {
    if (supportService.icon_path.startsWith("/")) {
      return supportService.icon_path;
    }
    return `/storage/${supportService.icon_path}`;
  }
  return null;
};

const getSupportServiceDefaultIcon = (index) => {
  const iconMap = {
    0: 'DocumentTextIcon', // Warehousing
    1: 'CheckCircleIcon',         // Packaging
    2: 'ShieldCheckIcon',              // Cargo Service
    3: 'DocumentTextIcon',       // Stuffing/Stripping
    4: 'ShieldCheckIcon',        // Cold Chain
    5: 'GlobeAltIcon',          // Freight Forwarding
  };

  const iconName = iconMap[index] || 'CheckCircleIcon';
  return getIcon(iconName);
};

// Support Services carousel methods
const nextSupportSlide = () => {
  if (currentSupportSlide.value < totalSupportSlides.value - 1) {
    currentSupportSlide.value++;
  }
};

const previousSupportSlide = () => {
  if (currentSupportSlide.value > 0) {
    currentSupportSlide.value--;
  }
};

const goToSupportSlide = (index) => {
  currentSupportSlide.value = index;
};


// Lifecycle - remove autoplay since we're using grid now
onMounted(() => {
  // Grid layout doesn't need autoplay
});

onUnmounted(() => {
  // Cleanup if needed
});
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
  font-family: "jost", sans-serif;
}

.font-montserrat {
  font-family: "Montserrat", sans-serif;
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

/* CTA Banner Styling - Matching ServicesSection exactly */

/* Additional sage colors for CTA section */
.text-sage-100 {
  color: #f4f6f3;
}
.text-sage-200 {
  color: #e8ece5;
}
.bg-sage-50 {
  background-color: #f4f6f3;
}

/* Gradient utilities for CTA */
.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-sage-600 {
  --tw-gradient-from: #8db580;
  --tw-gradient-to: rgb(141 181 128 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.via-sage-700 {
  --tw-gradient-to: rgb(123 161 105 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), #7ba169, var(--tw-gradient-to);
}

.to-sage-600 {
  --tw-gradient-to: #8db580;
}

/* Float animation for dotted background */
@keyframes float {
  0%,
  100% {
    background-position: 0% 0%, 0% 0%;
  }
  25% {
    background-position: 25% 25%, 10% 10%;
  }
  50% {
    background-position: 50% 10%, 20% 30%;
  }
  75% {
    background-position: 25% 35%, 30% 10%;
  }
}
</style>
