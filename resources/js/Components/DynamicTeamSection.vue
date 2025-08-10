<template>
  <section class="py-16 sm:py-20 lg:py-24 bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Container with White Background -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">

        <!-- Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-montserrat">
            Our Professional Team
          </h2>
          <p class="text-lg text-gray-600 font-jost max-w-4xl mx-auto leading-relaxed">
            Led by experienced professionals in the logistics industry and international trade with a high
            commitment to customer satisfaction. Our solid and experienced team is ready to provide the best
            service for your logistics needs.
          </p>
        </div>

        <!-- Team Member Carousel Section -->
        <div v-if="hasTeamMembers" class="mb-20">
          <div class="relative max-w-2xl mx-auto">
            <!-- Navigation Arrows -->
            <button
              @click="previousMember"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 border border-gray-200"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            <button
              @click="nextMember"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 z-10 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all duration-300 border border-gray-200"
            >
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>

            <!-- Team Member Card -->
            <div
              v-if="currentMember"
              class="relative bg-white rounded-2xl shadow-xl overflow-hidden max-w-lg mx-auto border border-gray-200"
            >
              <!-- Member Photo -->
              <div class="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300">
                <img
                  v-if="currentMember.photo_path"
                  :src="`/storage/${currentMember.photo_path}`"
                  :alt="currentMember.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300"
                >
                  <div class="text-center">
                    <div class="w-20 h-20 mx-auto mb-3 bg-gray-400 rounded-full flex items-center justify-center">
                      <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- WhatsApp Button -->
                <div class="absolute top-4 right-4">
                  <a
                    v-if="currentMember.phone_number"
                    :href="getWhatsAppUrl(currentMember.phone_number, currentMember.name)"
                    target="_blank"
                    class="inline-flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg"
                  >
                    <span class="mr-1">Hubungi CS</span>
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.486 3.488"/>
                    </svg>
                  </a>
                </div>

                <!-- Overlay with member info -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 text-white">
                  <h3 class="text-2xl font-bold mb-1 font-montserrat">
                    {{ currentMember.position }}
                  </h3>
                  <p class="text-lg opacity-90 font-jost">
                    {{ currentMember.name || 'Name...' }} | {{ formatPhoneNumber(currentMember.phone_number) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <!-- Expert Leadership -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
            <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-montserrat">
              Expert Leadership
            </h3>
            <p class="text-gray-600 font-jost leading-relaxed">
              Management team with 20+ years of experience in the international logistics industry
            </p>
          </div>

          <!-- Certified Professionals -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
            <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-montserrat">
              Certified Professionals
            </h3>
            <p class="text-gray-600 font-jost leading-relaxed">
              All teams have international certifications and update knowledge regularly
            </p>
          </div>

          <!-- 24/7 Support -->
          <div class="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all duration-300">
            <div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4 font-montserrat">
              24/7 Support
            </h3>
            <p class="text-gray-600 font-jost leading-relaxed">
              Customer service team ready to help you anytime, anywhere with responsive and professional support
            </p>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

// Props
const props = defineProps({
  teamMembers: {
    type: Array,
    default: () => [],
  },
  settings: {
    type: Object,
    default: () => ({}),
  },
});

// Reactive state
const currentMemberIndex = ref(0);

// Computed properties
const companyName = computed(() =>
  props.settings?.company_name || "PT Dunia Ekspor Indonesia"
);

const hasTeamMembers = computed(() =>
  Array.isArray(props.teamMembers) && props.teamMembers.length > 0
);

const activeTeamMembers = computed(() =>
  props.teamMembers
    ?.filter(member => member?.is_active)
    ?.sort((a, b) => (a.order_index || 0) - (b.order_index || 0)) || []
);

const currentMember = computed(() => {
  if (!hasTeamMembers.value) return null;
  return activeTeamMembers.value[currentMemberIndex.value] || activeTeamMembers.value[0];
});

// Methods
const nextMember = () => {
  if (!hasTeamMembers.value) return;
  currentMemberIndex.value = (currentMemberIndex.value + 1) % activeTeamMembers.value.length;
};

const previousMember = () => {
  if (!hasTeamMembers.value) return;
  currentMemberIndex.value = currentMemberIndex.value === 0
    ? activeTeamMembers.value.length - 1
    : currentMemberIndex.value - 1;
};

const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Format Indonesian phone numbers
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('62')) {
    // International format: +62xxxxxxxxxx
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    // Local format: 0xxxxxxxxx
    return cleaned;
  }

  return phone;
};

const getWhatsAppUrl = (phoneNumber, memberName) => {
  if (!phoneNumber) return '#';

  // Clean phone number and ensure it starts with 62
  let cleanPhone = phoneNumber.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('62')) {
    cleanPhone = '62' + cleanPhone;
  }

  const message = encodeURIComponent(
    `Halo ${memberName}, saya ingin berkonsultasi mengenai layanan ekspor dari ${companyName.value}.`
  );

  return `https://wa.me/${cleanPhone}?text=${message}`;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800&family=Jost:ital,wght@0,400;0,500;0,600;1,400&display=swap");

/* Font classes */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "Jost", sans-serif;
}

/* Sage Color System */
.bg-sage-600 {
  background-color: #7ba169;
}

/* Enhanced shadows */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .translate-x-16 {
    transform: translateX(3rem);
  }

  .-translate-x-16 {
    transform: translateX(-3rem);
  }
}

@media (max-width: 640px) {
  .translate-x-16 {
    transform: translateX(2rem);
  }

  .-translate-x-16 {
    transform: translateX(-2rem);
  }

  .text-3xl {
    font-size: 1.875rem;
  }

  .text-4xl {
    font-size: 2.25rem;
  }
}
</style>
