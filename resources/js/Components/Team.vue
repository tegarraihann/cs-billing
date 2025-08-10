<template>
  <div
    class="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8"
    :class="containerClass"
  >
    <!-- Team Photo Container -->
    <div class="relative group">
      <!-- Main Team Photo -->
      <div class="relative overflow-hidden" :class="photoContainerClass">
        <img
          :src="photoSrc"
          :alt="altText"
          :class="photoClass"
          class="object-cover object-center transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          @error="handleImageError"
          @load="handleImageLoad"
        />

        <!-- Loading placeholder -->
        <div
          v-if="!imageLoaded && !imageError"
          class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center"
        >
          <div class="text-gray-500 text-lg font-medium">Loading...</div>
        </div>

        <!-- Error fallback -->
        <div
          v-if="imageError"
          class="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
        >
          <div class="text-center text-gray-600">
            <svg
              class="w-16 h-16 mx-auto mb-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v3m0 3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            <p class="text-sm">Tim Photo Unavailable</p>
          </div>
        </div>

        <!-- Simplified Overlay -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        ></div>

        <!-- Team Info Overlay -->
        <div
          v-if="showOverlay"
          class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"
        >
          <h3 class="text-2xl font-bold mb-2 font-montserrat">
            {{ teamTitle }}
          </h3>
          <p class="text-sm opacity-90 font-jost">{{ teamDescription }}</p>
        </div>
      </div>

      <!-- Simplified Decorative Elements -->
      <div
        v-if="showDecorative"
        class="absolute -top-3 -right-3 w-6 h-6 bg-sage-600 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-200"
      ></div>
      <div
        v-if="showDecorative"
        class="absolute -bottom-3 -left-3 w-4 h-4 bg-sage-400 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-200"
      ></div>
    </div>

    <!-- Team Information (if beside photo) -->
    <div v-if="showText && layout === 'horizontal'" :class="textContainerClass">
      <h3 :class="titleClass">{{ teamTitle }}</h3>
      <p :class="descriptionClass">{{ teamDescription }}</p>

      <!-- Team Stats -->
      <div v-if="showStats" class="grid grid-cols-2 gap-4 mt-6">
        <div v-for="stat in teamStats" :key="stat.label" class="text-center">
          <div class="text-2xl font-bold text-sage-700">{{ stat.value }}</div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Team Information (if below photo) -->
  <div v-if="showText && layout === 'vertical'" class="text-center mt-4">
    <h3 :class="titleClass">{{ teamTitle }}</h3>
    <p :class="descriptionClass">{{ teamDescription }}</p>

    <!-- Team Stats -->
    <div v-if="showStats" class="grid grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto">
      <div v-for="stat in teamStats" :key="stat.label" class="text-center">
        <div class="text-xl font-bold text-sage-700">{{ stat.value }}</div>
        <div class="text-xs text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  size: {
    type: String,
    default: "large", // small, medium, large, xl, full
    validator: (value) =>
      ["small", "medium", "large", "xl", "full"].includes(value),
  },
  layout: {
    type: String,
    default: "vertical", // vertical, horizontal
    validator: (value) => ["vertical", "horizontal"].includes(value),
  },
  showText: {
    type: Boolean,
    default: true,
  },
  showOverlay: {
    type: Boolean,
    default: true,
  },
  showStats: {
    type: Boolean,
    default: true,
  },
  showDecorative: {
    type: Boolean,
    default: false, // Disabled by default for cleaner look
  },
  teamTitle: {
    type: String,
    default: "Tim Profesional Kami",
  },
  teamDescription: {
    type: String,
    default:
      "Tim yang berpengalaman dan berdedikasi dalam memberikan pelayanan logistik terbaik untuk kepuasan pelanggan.",
  },
  aspectRatio: {
    type: String,
    default: "auto", // auto, square, wide, ultrawide
    validator: (value) =>
      ["auto", "square", "wide", "ultrawide"].includes(value),
  },
});

const imageError = ref(false);
const imageLoaded = ref(false);

// Team photo source
const photoSrc = computed(() => {
  if (imageError.value) {
    return null;
  }
  return "/images/team/tim.png";
});

const altText = computed(() => {
  return `${props.teamTitle} - Eshaka Wijaya Logistics Team`;
});

// Size configurations
const sizeConfig = computed(() => {
  const base = {
    small: {
      photoContainer: "w-full max-w-sm h-auto px-4 sm:px-0",
      photo: "w-full h-auto",
      container: props.layout === "horizontal" ? "space-x-6" : "space-y-2",
      textContainer: "flex flex-col",
      title: "text-xl font-bold text-gray-800",
      description: "text-sm text-gray-600 mt-2",
    },
    medium: {
      photoContainer: "w-full max-w-md h-auto px-4 sm:px-0",
      photo: "w-full h-auto",
      container: props.layout === "horizontal" ? "space-x-8" : "space-y-3",
      textContainer: "flex flex-col max-w-md",
      title: "text-2xl font-bold text-gray-800",
      description: "text-base text-gray-600 mt-3",
    },
    large: {
      photoContainer:
        "w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[40rem] h-auto sm:h-[25rem] md:h-[30rem] lg:h-[35rem] mx-auto px-4 sm:px-0",
      photo: "w-full h-auto sm:h-full object-cover sm:object-cover",
      container: props.layout === "horizontal" ? "space-x-10" : "space-y-4",
      textContainer: "flex flex-col max-w-lg",
      title: "text-3xl font-bold text-gray-800",
      description: "text-lg text-gray-600 mt-4 leading-relaxed",
    },
    xl: {
      photoContainer:
        "w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto sm:h-[30rem] md:h-[35rem] lg:h-[40rem] mx-auto px-4 sm:px-0",
      photo: "w-full h-auto sm:h-full object-cover",
      container: props.layout === "horizontal" ? "space-x-12" : "space-y-4",
      textContainer: "flex flex-col max-w-xl",
      title: "text-4xl font-bold text-gray-800",
      description: "text-xl text-gray-600 mt-4 leading-relaxed",
    },
    full: {
      photoContainer:
        "w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl h-auto sm:h-[35rem] md:h-[40rem] lg:h-[45rem] mx-auto px-4 sm:px-0",
      photo: "w-full h-auto sm:h-full object-cover",
      container: props.layout === "horizontal" ? "space-x-16" : "space-y-6",
      textContainer: "flex flex-col max-w-2xl",
      title: "text-5xl font-bold text-gray-800",
      description: "text-2xl text-gray-600 mt-6 leading-relaxed",
    },
  };

  // Apply aspect ratio if specified
  if (props.aspectRatio !== "auto") {
    const aspectRatios = {
      square: "aspect-square",
      wide: "aspect-video",
      ultrawide: "aspect-[21/9]",
    };

    base[props.size].photo = `${base[props.size].photo
      .split(" ")
      .slice(0, -1)
      .join(" ")} h-full object-cover ${aspectRatios[props.aspectRatio]}`;
    base[props.size].photoContainer = base[props.size].photoContainer.replace(
      "h-auto",
      aspectRatios[props.aspectRatio]
    );
  }

  return base[props.size];
});

// Team statistics
const teamStats = computed(() => [
  { value: "25+", label: "Expert Staff" },
  { value: "15+", label: "Years Exp" },
  { value: "500+", label: "Projects" },
  { value: "99%", label: "Success Rate" },
]);

// Computed classes
const containerClass = computed(() => {
  const layoutClass =
    props.layout === "horizontal" ? "flex-row items-center" : "flex-col";
  return `${sizeConfig.value.container} ${layoutClass}`;
});

const photoContainerClass = computed(() => sizeConfig.value.photoContainer);
const photoClass = computed(() => sizeConfig.value.photo);
const textContainerClass = computed(() => sizeConfig.value.textContainer);
const titleClass = computed(() => sizeConfig.value.title);
const descriptionClass = computed(() => sizeConfig.value.description);

const handleImageError = () => {
  imageError.value = true;
  console.warn("Failed to load team image:", photoSrc.value);
};

const handleImageLoad = () => {
  imageLoaded.value = true;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap");

/* Add Montserrat font class */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "jost", sans-serif;
}

/* Custom Sage Colors */
.bg-sage-100 {
  background-color: #e8ece5;
}
.bg-sage-200 {
  background-color: #d4ddd0;
}
.bg-sage-400 {
  background-color: #a5c49a;
}
.bg-sage-600 {
  background-color: #8db580;
}
.text-sage-700 {
  color: #7ba169;
}

/* Ensure image displays properly without distortion */
img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Desktop-specific image styling */
@media (min-width: 640px) {
  img {
    height: 100%;
    min-height: 100%;
  }
}

/* Optimized image loading */
img[loading="lazy"] {
  transition: opacity 0.2s ease-in-out;
}

/* Smooth loading animation */
@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.animate-pulse {
  animation: shimmer 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
  background-size: 200px;
}

/* Remove any default rounded corners */
.overflow-hidden {
  border-radius: 0;
}

/* Custom aspect ratios */
.aspect-square {
  aspect-ratio: 1 / 1;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

.aspect-\[21\/9\] {
  aspect-ratio: 21 / 9;
}
</style>
