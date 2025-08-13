<template>
  <div>
    <!-- Dynamic Head Meta Tags -->
    <Head>
      <title>{{ pageTitle }}</title>
      <meta name="description" :content="pageDescription" />
      <meta
        name="keywords"
        :content="meta.keywords || 'ekspor, indonesia, bisnis, internasional'"
      />

      <!-- Open Graph Tags -->
      <meta property="og:title" :content="pageTitle" />
      <meta property="og:description" :content="pageDescription" />
      <meta property="og:type" content="website" />
      <meta property="og:image" :content="heroImageUrl" />

      <!-- Twitter Card Tags -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" :content="pageTitle" />
      <meta name="twitter:description" :content="pageDescription" />
      <meta name="twitter:image" :content="heroImageUrl" />
    </Head>

    <!-- Navigation -->
    <NavBar :settings="settings" />

    <!-- Dynamic Hero Section -->
    <DynamicHeroSection :settings="settings" />

    <!-- Dynamic Services Section -->
    <DynamicServicesSection
      v-if="hasServices"
      :services="services"
      :support-services="supportServices"
      :settings="settings"
    />

    <!-- About Section -->
    <AboutSection :team-members="teamMembers" :settings="settings" />

    <ContactSection />
    <!-- Footer -->
    <FooterSection :settings="settings" />
  </div>
</template>

<script setup>
import { Head } from "@inertiajs/vue3";
import { computed } from "vue";

// Import Components
import NavBar from "@/Components/homePage/Navbar.vue";
import DynamicHeroSection from "@/Components/DynamicHeroSection.vue";
import DynamicServicesSection from "@/Components/DynamicServicesSection.vue";
import AboutSection from "@/Components/AboutSection.vue";
// import ContactButton from "@/Components/ContactButton.vue";
import ContactSection from "@/Components/ContactSection.vue";
import FooterSection from "@/Components/FooterSection.vue";

// Props
const props = defineProps({
  settings: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  services: {
    type: Array,
    default: () => [],
  },
  supportServices: {
    type: Array,
    default: () => [],
  },
  teamMembers: {
    type: Array,
    default: () => [],
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
  canLogin: {
    type: Boolean,
    default: false,
  },
  canRegister: {
    type: Boolean,
    default: false,
  },
});

// Computed Properties
const companyName = computed(() => {
  return props.settings.company_name || "PT Dunia Ekspor Indonesia";
});

const pageTitle = computed(() => {
  return props.meta.title || companyName.value;
});

const pageDescription = computed(() => {
  return (
    props.meta.description ||
    props.settings.company_description ||
    "Solusi ekspor terpercaya untuk bisnis Anda"
  );
});

const heroImageUrl = computed(() => {
  return props.settings.hero_background_image
    ? `/storage/${props.settings.hero_background_image}`
    : "/images/hero-bg.jpg";
});

const hasServices = computed(() => {
  return props.services && props.services.length > 0;
});

// Dynamic URLs
const whatsappUrl = computed(() => {
  if (!props.settings.whatsapp_number) return "#";
  const message = encodeURIComponent(
    `Halo ${companyName.value}, saya tertarik untuk memulai ekspor dengan bantuan Anda.`
  );
  return `https://wa.me/${props.settings.whatsapp_number}?text=${message}`;
});

const emailUrl = computed(() => {
  if (!props.settings.contact_email) return "#";
  const subject = encodeURIComponent(
    `Konsultasi Ekspor - ${companyName.value}`
  );
  const body = encodeURIComponent(
    `Halo Tim ${companyName.value},\n\nSaya tertarik untuk memulai ekspor dan ingin berkonsultasi dengan tim Anda.\n\nTerima kasih.`
  );
  return `mailto:${props.settings.contact_email}?subject=${subject}&body=${body}`;
});
</script>

<style scoped>
/* Import Fonts */
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap");

/* Font Classes */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "Jost", sans-serif;
}

/* Sage Colors */
.text-sage-100 {
  color: #e8ece5;
}

.text-sage-700 {
  color: #7ba169;
}

.bg-sage-600 {
  background-color: #8db580;
}

.bg-sage-700 {
  background-color: #7ba169;
}

.from-sage-600 {
  --tw-gradient-from: #8db580;
}

.to-sage-700 {
  --tw-gradient-to: #7ba169;
}

/* Typography */
.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}

/* Global Styles */
:root {
  --sage-50: #f4f6f3;
  --sage-100: #e8ece5;
  --sage-200: #d4ddd0;
  --sage-300: #bfd0b8;
  --sage-400: #a5c49a;
  --sage-500: #8db580;
  --sage-600: #8db580;
  --sage-700: #7ba169;
  --sage-800: #6b8f5e;
  --sage-900: #5a7d52;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--sage-50);
}

::-webkit-scrollbar-thumb {
  background: var(--sage-400);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--sage-600);
}

/* Animation Classes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slide-up {
  animation: slideUp 1s ease-out forwards;
}
</style>
