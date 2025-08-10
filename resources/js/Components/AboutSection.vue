<template>
  <section
    id="about"
    class="py-24 bg-gradient-to-b from-gray-50 to-sage-50"
    aria-labelledby="about-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-20">
        <div
          class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-800 rounded-full text-sm font-semibold mb-6"
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          Authorized & Trusted Certificate
        </div>
        <h2
          id="about-heading"
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 font-inter"
        >
          About Eshaka Wijaya Logistics
        </h2>
        <p
          class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-jost"
        >
          With more than 20 years of experience in the Indonesian logistics
          industry, we are here as a trusted partner for efficient and
          professional international trade solutions.
        </p>
      </div>

      <div
        class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24"
      >
        <!-- Content -->
        <div>
          <h3
            class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 font-inter"
          >
            Trusted Logistics Partner
            <span class="text-sage-700 block md:inline">Since 2015</span>
          </h3>

          <p
            class="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed font-jost"
          >
            <b>Eshaka Wijaya Logistics</b> was established with the vision of
            becoming the leading logistics company in Indonesia. We provide
            export-import, inland trucking, international money transfer, and
            freight insurance services with trusted international quality
            standards.
          </p>

          <!-- Key Points -->
          <div class="space-y-4 md:space-y-6 mb-8 md:mb-10">
            <div
              v-for="point in keyPoints"
              :key="point.title"
              class="flex items-start group"
            >
              <div
                class="w-12 h-12 bg-sage-700 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300"
                style="will-change: transform"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h4
                  class="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2 font-montserrat"
                >
                  {{ point.title }}
                </h4>
                <p
                  class="text-sm md:text-base text-gray-600 leading-relaxed font-jost"
                >
                  {{ point.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <button
            @click="scrollToContact"
            class="btn-primary-sage hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            style="will-change: transform, box-shadow"
            aria-label="Contact us for consultation"
          >
            Consultation Now
          </button>
        </div>

        <!-- Statistics & Achievements -->
        <div class="relative">
          <!-- Main Card -->
          <div
            class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100"
            role="complementary"
            aria-label="Company statistics and achievements"
          >
            <!-- Company Stats -->
            <div class="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8">
              <div
                v-for="stat in companyStats"
                :key="stat.label"
                class="text-center p-3 md:p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300"
              >
                <div
                  class="text-2xl md:text-3xl font-bold text-sage-700 mb-1 md:mb-2 font-montserrat"
                >
                  {{ stat.value }}
                </div>
                <div
                  class="text-gray-600 font-medium text-xs md:text-sm font-jost"
                >
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- Achievement Badges -->
            <div class="space-y-3 md:space-y-4">
              <div
                v-for="achievement in achievements"
                :key="achievement.title"
                class="flex items-center p-3 md:p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300"
              >
                <div
                  class="w-10 h-10 md:w-12 md:h-12 bg-sage-400 rounded-xl flex items-center justify-center mr-3 md:mr-4 flex-shrink-0"
                >
                  <div
                    v-html="achievement.icon"
                    class="w-5 h-5 md:w-6 md:h-6 text-white"
                  ></div>
                </div>
                <div>
                  <h4
                    class="font-bold text-gray-800 text-sm md:text-base font-montserrat"
                  >
                    {{ achievement.title }}
                  </h4>
                  <p
                    class="text-xs md:text-sm text-gray-600 font-jost leading-relaxed"
                  >
                    {{ achievement.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Elements -->
          <div
            class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30"
          ></div>
          <div
            class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20"
          ></div>
        </div>
      </div>

      <!-- Vision & Mission -->
      <div class="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 lg:mb-24">
        <!-- Vision -->
        <div
          class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300"
        >
          <div
            class="w-14 h-14 md:w-16 md:h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6"
          >
            <svg
              class="w-6 h-6 md:w-8 md:h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
            Our Vision
          </h3>
          <p class="text-gray-600 leading-relaxed font-jost">
            To become the leading logistics company in Indonesia, providing
            world-class export-import services and comprehensive logistics
            solutions that connect businesses across global markets with
            reliability, efficiency, and innovation.
          </p>
        </div>

        <!-- Mission -->
        <div
          class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300"
        >
          <div
            class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6"
          >
            <svg
              class="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5M8 6V4h8v2M8 6H6a2 2 0 00-2 2v6.5m16-1.245a23.931 23.931 0 01-9 1.745c-3.183 0-6.22-.62-9-1.745M21 13.255V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.745"
              />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat">
            Our Mission
          </h3>
          <div class="space-y-3 text-gray-600 font-jost">
            <div class="flex items-start">
              <div
                class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"
              ></div>
              <p class="leading-relaxed">
                Provide comprehensive and professional logistics services with
                international quality standards
              </p>
            </div>
            <div class="flex items-start">
              <div
                class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"
              ></div>
              <p class="leading-relaxed">
                Build strategic partnerships with global networks to facilitate
                efficient international trade
              </p>
            </div>
            <div class="flex items-start">
              <div
                class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0"
              ></div>
              <p class="leading-relaxed">
                Continuously innovate with modern technology and systems for
                customer satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->

      <!-- <div class="bg-white rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl border border-sage-100">
                <div class="text-center mb-6 md:mb-8">
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 font-montserrat">

            <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl border border-sage-100">
                <div class="text-center mb-6 sm:mb-8 md:mb-10">
                    <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-6 font-montserrat">

                        Our Professional Team
                    </h3>
                    <p class="text-sm sm:text-base md:text-lg text-gray-600 max-w-xs sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-jost px-2 sm:px-0">
                        Led by experienced professionals in the logistics industry and international trade with a high
                        commitment to customer satisfaction. Our solid and experienced team is ready to provide the best
                        service for your logistics needs.
                    </p>
                </div> -->

      <!-- Team Photo Component -->
      <!-- <div class="flex justify-center mb-8 md:mb-12">
                    <Team size="large" layout="vertical" :show-text="false" :show-overlay="true" :show-stats="true"
                        team-title="Tim Expert Logistics"
                        team-description="Profesional berpengalaman dengan dedikasi tinggi dalam melayani kebutuhan logistik internasional Anda." />
                </div> -->

      <!-- Team Highlights -->
      <!-- <div class="grid md:grid-cols-3 gap-4 md:gap-8">

                <-- Team Carousel -->
      <div class="mb-6 sm:mb-8 md:mb-12 max-w-4xl mx-auto px-4">
        <div class="relative">
          <!-- Carousel Container -->
          <div class="overflow-hidden rounded-xl">
            <div
              class="flex transition-transform duration-500 ease-in-out"
              :style="`transform: translate3d(-${currentSlide * 100}%, 0, 0)`"
              style="will-change: transform"
            >
              <div
                v-for="(member, index) in clientTestimonials"
                :key="member.name"
                class="flex-shrink-0 w-full"
              >
                <!-- Single Team Member Card -->
                <div class="flex justify-center px-8 py-6">
                  <div
                    class="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer"
                    style="max-width: 400px"
                  >
                    <!-- Team Member Image with original aspect ratio -->
                    <img
                      :src="member.src"
                      :alt="member.name"
                      class="w-full h-auto transition-all duration-500 group-hover:scale-110 object-cover"
                      style="will-change: transform"
                      loading="lazy"
                    />
                    <!-- Overlay positioned over image -->
                    <div class="absolute inset-0">
                      <!-- Black gradient overlay for text readability -->
                      <div
                        class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-500"
                      ></div>
                    </div>

                    <!-- WhatsApp Contact for Customer Service (responsive positioning) -->
                    <div
                      v-if="member.name === 'Customer Support'"
                      class="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2"
                    >
                      <!-- Contact Badge - hidden on mobile, shown on larger screens -->
                      <div
                        class="hidden sm:block bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold shadow-lg"
                      >
                        Hubungi CS
                      </div>
                      <!-- WhatsApp Icon - smaller on mobile -->
                      <button
                        @click="openWhatsApp(member.designation)"
                        class="w-8 h-8 sm:w-12 sm:h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                      >
                        <svg
                          class="w-4 h-4 sm:w-6 sm:h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                          />
                        </svg>
                      </button>
                    </div>

                    <!-- Content Section - Bottom Left Corner -->
                    <div class="absolute bottom-4 left-4 z-10">
                      <!-- Text container -->
                      <div>
                        <h4
                          class="text-lg md:text-xl font-bold text-white mb-1 font-montserrat drop-shadow-lg"
                        >
                          {{ member.name }}
                        </h4>
                        <p
                          class="text-sage-200 text-sm md:text-base font-jost drop-shadow-md"
                        >
                          {{ member.designation }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Navigation - Positioned at sides of image -->
          <div
            class="flex justify-between items-center absolute top-1/2 left-4 right-4 z-30 pointer-events-none"
            style="transform: translateY(-50%)"
          >
            <!-- Previous Button -->
            <button
              @click="previousSlide"
              :disabled="currentSlide === 0"
              class="w-10 h-10 bg-white/80 hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg pointer-events-auto backdrop-blur-sm"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Next Button -->
            <button
              @click="nextSlide"
              :disabled="currentSlide >= totalSlides - 1"
              class="w-10 h-10 bg-white/80 hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg pointer-events-auto backdrop-blur-sm"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Team Highlights -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
      >
        <div
          v-for="highlight in teamHighlights"
          :key="highlight.title"
          class="text-center p-4 sm:p-5 md:p-6 bg-sage-50 rounded-xl sm:rounded-2xl hover:bg-sage-100 transition-colors duration-300"
        >
          <div
            class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sage-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
          >
            <div
              v-html="highlight.icon"
              class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white"
            ></div>
          </div>
          <h4
            class="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 font-montserrat"
          >
            {{ highlight.title }}
          </h4>
          <p
            class="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-jost"
          >
            {{ highlight.description }}
          </p>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </section>
</template>

<script setup>
// import Team from './Team.vue'
import { ref, computed, onMounted, onUnmounted } from "vue";

const scrollToContact = () => {
  const element = document.querySelector("#contact");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// Carousel functionality
const currentSlide = ref(0);

const totalSlides = computed(() => {
  return clientTestimonials.length;
});

const nextSlide = () => {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

onMounted(() => {
  // Auto slide disabled per user request
});

onUnmounted(() => {
  // Cleanup if needed
});

// WhatsApp function
const openWhatsApp = (designation) => {
  // Extract phone number from designation
  const phoneMatch = designation.match(/\+(\d+)/);
  if (phoneMatch) {
    const phoneNumber = phoneMatch[1]; // Extract the number without + sign
    const message = encodeURIComponent(
      "Halo, saya ingin konsultasi tentang layanan logistics Eshaka Wijaya."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }
};

const companyStats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Active Client" },
  { value: "50+", label: "Destination Country" },
  { value: "99.5%", label: "Success Rate" },
];

const achievements = [
  {
    title: "ISO 9001:2015 Certified",
    description: "International quality management certificate",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  },
  {
    title: "Forwarder License",
    description:
      "Official freight forwarder license from the Ministry of Transportation",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  },
  {
    title: "Best Service Award",
    description: "Best service award 2023",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
  },
];

const keyPoints = [
  {
    title: "15+ Years Experience",
    description:
      "Serving export-import and logistics with a trusted and professional track record",
  },
  {
    title: "Global Network",
    description:
      "Partnerships with 50+ countries to facilitate efficient international trade",
  },
  {
    title: "Modern Technology",
    description:
      "Real-time tracking system and process digitalization for maximum efficiency and transparency",
  },
  {
    title: "Professional Team",
    description:
      "Supported by internationally certified experts in logistics and trade",
  },
];

const clientTestimonials = [
  {
    quote:
      "Eshaka Wijaya Logistics has been our trusted partner for international trade for the past 5 years. Their professional service and on-time delivery make our business operations much more efficient.",
    name: "Our Team",
    designation: "Complete Logistics Team",
    src: "/images/team/all-team.png",
  },
  {
    quote:
      "The team's expertise in handling complex logistics requirements is remarkable. They consistently deliver beyond our expectations with competitive pricing and excellent customer service.",
    name: "Customer Support",
    designation: "Name... | +6285213866455",
    src: "/images/team/cs-satu.png",
  },
  {
    quote:
      "Real-time tracking system and transparent communication from Eshaka Wijaya Logistics give us complete confidence in every shipment. Highly recommended for international logistics needs.",
    name: "Customer Support",
    designation: "Name... | +62895334850224",
    src: "/images/team/cs-dua.png",
  },
  {
    quote:
      "Their comprehensive services from customs clearance to final delivery have simplified our export operations significantly. Professional team with deep understanding of international trade regulations.",
    name: "Head of Operations",
    designation: "Name...",
    src: "/images/team/head-ops.png",
  },
  {
    quote:
      "We provide innovative marketing strategies and business development solutions that drive growth and success for our logistics partners across international markets.",
    name: "Marketing Team",
    designation: "Name...",
    src: "/images/team/marketing-satu.png",
  },
  {
    quote:
      "Our dedicated marketing professionals work tirelessly to build strong relationships and expand our network, ensuring the best service delivery for all our valued clients.",
    name: "Marketing Team",
    designation: "Name...",
    src: "/images/team/marketing-dua.png",
  },
];

const teamHighlights = [
  {
    title: "Expert Leadership",
    description:
      "Management team with 20+ years of experience in the international logistics industry",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  },
  {
    title: "Certified Professionals",
    description:
      "All teams have international certifications and update knowledge regularly",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
  },
  {
    title: "24/7 Support",
    description:
      "Customer service team ready to help you anytime, anywhere with responsive and professional support",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap");

/* Add Montserrat font class */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "jost", sans-serif;
}

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Custom Sage Colors */

.btn-primary-sage {
  background-color: #556b2f;
}

.text-sage-600 {
  color: #8db580;
}

.text-sage-700 {
  color: #556b2f !important;
}

.text-sage-200 {
  color: #d4ddd0 !important;
}

.bg-sage-50 {
  background-color: #f4f6f3;
}

.bg-sage-100 {
  background-color: #e8ece5;
}

.bg-sage-200 {
  background-color: #d4ddd0;
}

.bg-sage-300 {
  background-color: #bfd0b8;
}

.bg-sage-600 {
  background-color: #556b2f !important;
}

.bg-sage-700 {
  background-color: #556b2f !important;
}

.bg-sage-400 {
  background-color: #556b2f !important;
}

.border-sage-100 {
  border-color: #e8ece5;
}

.border-sage-200 {
  border-color: #d4ddd0;
}

.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.hover\:bg-sage-400:hover {
  background-color: #8db580;
}
</style>
