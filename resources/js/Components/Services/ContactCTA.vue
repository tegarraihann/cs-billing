<template>
  <div class="relative">
    <!-- Main CTA Banner -->
    <div
      class="relative bg-gradient-to-br from-sage-600 via-sage-700 to-sage-800 rounded-3xl p-6 md:p-8 lg:p-12 text-white overflow-hidden shadow-2xl"
    >
      <!-- Background Decorative Elements -->
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/5 to-transparent rounded-full"
      ></div>

      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute inset-0"
          style="
            background-image: radial-gradient(
                circle at 20% 50%,
                white 1px,
                transparent 1px
              ),
              radial-gradient(circle at 70% 20%, white 1px, transparent 1px);
            background-size: 50px 50px, 80px 80px;
            animation: float 20s ease-in-out infinite;
          "
        ></div>
      </div>

      <!-- Content Grid -->
      <div
        class="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
      >
        <!-- Left Content -->
        <div class="flex-1 text-center lg:text-left">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold">Available 24/7</span>
          </div>

          <!-- Main Heading -->
          <h3
            class="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
          >
            Ready to Serve Your
            <span
              class="block bg-gradient-to-r from-sage-200 to-white bg-clip-text text-transparent"
            >
              Logistics Needs
            </span>
          </h3>

          <!-- Description -->
          <p
            class="text-sage-100 text-base md:text-lg leading-relaxed mb-6 lg:mb-0 max-w-2xl"
          >
            Get free consultation with our expert team. Find the best solutions
            for export-import, trucking, and other logistics services.
          </p>
        </div>

        <!-- Right CTA Buttons -->
        <div class="flex-shrink-0 w-full lg:w-auto">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4"
          >
            <!-- WhatsApp Contact -->
            <a
              v-if="settings.whatsapp_number"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-600/30 transform hover:-translate-y-1"
            >
              <div class="w-6 h-6 flex-shrink-0">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-full h-full"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.485"
                  />
                </svg>
              </div>
              <span
                class="group-hover:text-green-100 transition-colors duration-300"
                >WhatsApp</span
              >
            </a>

            <!-- Email Contact -->
            <a
              v-if="settings.contact_email"
              :href="emailUrl"
              class="group flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm hover:bg-white hover:text-sage-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 border border-white/30 hover:border-white"
            >
              <EnvelopeIcon
                class="w-6 h-6 flex-shrink-0 group-hover:text-sage-600 transition-colors duration-300"
              />
              <span>Email Us</span>
            </a>

            <!-- Phone Contact -->
            <a
              v-if="settings.contact_phone"
              :href="`tel:${settings.contact_phone}`"
              class="group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-600/30 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1 xl:col-span-2"
            >
              <PhoneIcon
                class="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              />
              <span class="truncate">{{
                formatPhoneNumber(settings.contact_phone)
              }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Stats Section -->
      <div
        v-if="stats.length > 0"
        class="relative z-20 mt-8 lg:mt-12 pt-8 border-t border-white/20"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="group"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div
              class="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-sage-200 transition-colors duration-300 animate-fade-in-up"
            >
              {{ stat.value }}
            </div>
            <div
              class="text-sage-200 text-sm md:text-base font-medium opacity-90"
            >
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Secondary Actions -->
    <div class="mt-8 text-center">
      <p class="text-gray-600 mb-4">Or explore our services</p>
      <button
        @click="$emit('contact-click')"
        class="inline-flex items-center gap-2 text-sage-600 hover:text-sage-700 font-semibold transition-colors duration-300 group"
      >
        <span>View All Services</span>
        <ArrowRightIcon
          class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {
  EnvelopeIcon,
  PhoneIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  settings: { type: Object, required: true },
  stats: { type: Array, default: () => [] },
});

defineEmits(["contact-click"]);

// Computed URLs
const whatsappUrl = computed(() => {
  if (!props.settings.whatsapp_number) return "#";

  const cleanNumber = props.settings.whatsapp_number.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${
      props.settings.company_name || "Team"
    }, I would like to inquire about your logistics services.`
  );

  return `https://wa.me/${cleanNumber}?text=${message}`;
});

const emailUrl = computed(() => {
  if (!props.settings.contact_email) return "#";

  const subject = encodeURIComponent(
    `Inquiry about Services - ${
      props.settings.company_name || "Logistics Company"
    }`
  );
  const body = encodeURIComponent(
    `Hello ${
      props.settings.company_name || "Team"
    },\n\nI am interested in learning more about your logistics services.\n\nBest regards.`
  );

  return `mailto:${props.settings.contact_email}?subject=${subject}&body=${body}`;
});

// Utility functions
const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Simple formatting for display
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length >= 10) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
};
</script>

<style scoped>
/* Gradient utilities */
.bg-gradient-radial {
  background: radial-gradient(var(--tw-gradient-stops));
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--tw-gradient-stops));
}

.from-sage-200 {
  --tw-gradient-from: #e1e6dd;
}

.to-white {
  --tw-gradient-to: #ffffff;
}

/* Background clip text */
.bg-clip-text {
  background-clip: text;
  -webkit-background-clip: text;
}

.text-transparent {
  color: transparent;
}

/* Custom animations */
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

@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

/* Backdrop blur support */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
}

@supports not (backdrop-filter: blur(8px)) {
  .backdrop-blur-sm {
    background-color: rgba(255, 255, 255, 0.25);
  }
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

/* Focus styles */
a:focus-visible,
button:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
  border-radius: 1rem;
}

/* Phone number truncation on smaller screens */
@media (max-width: 640px) {
  .truncate {
    max-width: 120px;
  }
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
