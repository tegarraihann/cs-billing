<template>
  <section
    v-if="settings.company_name"
    id="home"
    class="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-center bg-cover"
    :style="heroBackgroundStyle"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"
    ></div>

    <!-- Floating Decorative Elements -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-24 left-12 w-64 h-64 bg-sage-400/20 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute bottom-24 right-12 w-80 h-80 bg-sage-500/15 rounded-full blur-3xl animate-float delay-2000"
      ></div>
    </div>

    <!-- Main Content -->
    <div
      class="relative z-10 max-w-7xl w-full px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center"
    >
      <!-- Left Side Text -->
      <div class="text-center lg:text-left space-y-6">
        <!-- Trust Badge -->
        <div
          class="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur rounded-full shadow-lg border border-sage-200 animate-fade-in-down"
        >
          <span
            class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"
          ></span>
          <span class="text-gray-800 font-semibold">{{ trustBadgeText }}</span>
        </div>

        <!-- Company Name as Hero Title -->
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up"
        >
          <span class="block text-white whitespace-nowrap">{{
            companyNameFirst
          }}</span>
          <span
            class="block text-transparent bg-clip-text bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 animate-gradient mt-1 tracking-wide"
          >
            {{ companyNameLast }}
          </span>
        </h1>

        <!-- Company Description -->
        <p
          class="text-lg md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200"
        >
          {{ displayDescription }}
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up delay-400"
        >
          <button class="btn-primary" @click="scrollToContact">
            {{ primaryCtaText }}
          </button>
          <button class="btn-secondary" @click="scrollToServices">
            {{ secondaryCtaText }}
          </button>
        </div>
      </div>

      <!-- Right Side Logo -->
      <div class="flex justify-center">
        <div class="relative logo-parallax">
          <img
            v-if="!imageError && logoSrc"
            :src="logoSrc"
            :alt="companyName + ' Logo'"
            class="w-64 md:w-72 lg:w-80 object-contain drop-shadow-2xl animate-logo-float"
            @error="handleImageError"
          />
          <div v-else class="fallback-logo">{{ companyName }}</div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div
      class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
      @click="scrollToNext"
    >
      <div
        class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center"
      >
        <div class="w-1.5 h-4 bg-white rounded-full mt-2"></div>
      </div>
    </div>

    <!-- Floating WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <a
        v-if="settings.whatsapp_number"
        :href="whatsappUrl"
        target="_blank"
        class="btn-whatsapp"
        :aria-label="whatsappCsText"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          class="w-6 h-6 mr-2"
        >
          <path
            fill="white"
            d="M16.04 2C8.29 2 2 8.29 2 16.04c0 2.83.74 5.53 2.15 7.91L2 30l6.26-2.06a14.07 14.07 0 007.78 2.27c7.75 0 14.04-6.29 14.04-14.04S23.79 2 16.04 2zm0 25.56c-2.54 0-5.02-.72-7.15-2.08l-.51-.32-3.71 1.21 1.21-3.62-.34-.55a11.54 11.54 0 01-1.79-6.16c0-6.38 5.19-11.56 11.56-11.56s11.56 5.18 11.56 11.56-5.19 11.56-11.56 11.56zm6.36-8.64c-.35-.18-2.05-1.01-2.37-1.12-.32-.12-.55-.18-.78.18-.23.35-.9 1.12-1.1 1.35-.2.23-.4.26-.75.09-.35-.18-1.47-.54-2.8-1.72-1.03-.92-1.72-2.06-1.93-2.41-.2-.35-.02-.54.15-.71.15-.15.35-.4.52-.6.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.18-.78-1.87-1.07-2.57-.28-.67-.56-.58-.78-.59h-.66c-.23 0-.58.09-.88.44-.3.35-1.16 1.13-1.16 2.75s1.19 3.19 1.35 3.41c.18.23 2.34 3.57 5.67 5 .79.34 1.41.54 1.89.69.79.25 1.51.21 2.08.13.63-.09 2.05-.84 2.34-1.64.29-.81.29-1.5.2-1.64-.09-.14-.32-.23-.67-.41z"
          />
        </svg>
        {{ whatsappCsText }}
      </a>
    </div>
  </section>
</template>


<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  settings: { type: Object, required: true, default: () => ({}) },
});

const imageError = ref(false);

// Company Name sebagai Hero Title
const companyName = computed(
  () => props.settings.company_name || "PT ESHAKA WIJAYA LOGISTICS"
);

// Split nama perusahaan menjadi bagian awal dan kata terakhir
const companyNameFirst = computed(() => {
  const words = companyName.value.split(" ");
  return words.slice(0, -1).join(" ");
});

const companyNameLast = computed(() => {
  const words = companyName.value.split(" ");
  return words[words.length - 1];
});

// Company Description
const displayDescription = computed(
  () =>
    props.settings.company_description ||
    "Trusted solutions for your international export-import and logistics needs with professional and experienced services."
);

// Trust Badge Text
const trustBadgeText = computed(
  () => props.settings.trust_badge_text || "Trusted for over 20 Years"
);

// CTA Button Texts - STATIS, tidak dinamis
const primaryCtaText = "Free Consultation";
const secondaryCtaText = "Services";

// WhatsApp CS Text - STATIS, tidak dinamis
const whatsappCsText = "Hubungi CS";

const heroBackgroundStyle = computed(() => ({
  backgroundImage: `url('${
    props.settings.hero_background_image
      ? `/storage/${props.settings.hero_background_image}`
      : "/images/hero-bg.jpg"
  }')`,
}));

const logoSrc = computed(() =>
  imageError.value
    ? null
    : props.settings.company_logo
    ? `/storage/${props.settings.company_logo}`
    : "/images/logo/logo-hero.svg"
);

const whatsappUrl = computed(() =>
  props.settings.whatsapp_number
    ? `https://wa.me/${
        props.settings.whatsapp_number
      }?text=${encodeURIComponent(
        `Halo ${companyName.value}, saya tertarik dengan layanan ekspor Anda.`
      )}`
    : "#"
);

const handleImageError = () => {
  imageError.value = true;
};

const handleParallax = () => {
  const scrolled = window.pageYOffset;
  const logo = document.querySelector(".logo-parallax");
  if (logo && scrolled < window.innerHeight) {
    logo.style.transform = `translateY(${scrolled * -0.3}px)`;
  }
};

const scrollToNext = () => {
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToServices = () => {
  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
};

const scrollToContact = () => {
  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() =>
  window.addEventListener("scroll", handleParallax, { passive: true })
);
onUnmounted(() => window.removeEventListener("scroll", handleParallax));
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Jost:wght@400;500;600&display=swap");

.btn-primary {
  @apply bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold flex items-center shadow-lg transition-all duration-300;
}
.btn-secondary {
  @apply bg-white/90 text-gray-800 hover:bg-white px-6 py-3 rounded-full font-semibold flex items-center shadow-lg transition-all duration-300;
}
.btn-sage {
  @apply bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-full font-semibold flex items-center shadow-lg transition-all duration-300;
}
.btn-whatsapp {
  @apply bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-semibold flex items-center shadow-lg transition-all duration-300 animate-pulse;
}
.fallback-logo {
  @apply w-64 h-64 flex items-center justify-center border border-white/20 rounded-lg text-white/80;
}

/* Animations */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
@keyframes logo-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
}
.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}
.animate-float {
  animation: float 12s ease-in-out infinite;
}
.animate-logo-float {
  animation: logo-float 6s ease-in-out infinite;
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 4s ease infinite;
}

.btn-icon {
  @apply p-3 rounded-full text-white shadow-lg transition-all duration-300 flex items-center justify-center;
}

/* Colors */
.bg-sage-400 {
  background-color: #a5c49a;
}
.bg-sage-500 {
  background-color: #8db580;
}
.bg-sage-600 {
  background-color: #7ba169;
}
</style>
