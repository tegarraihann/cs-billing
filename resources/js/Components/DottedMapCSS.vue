<template>
  <div
    class="dotted-map-container"
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- Base Pattern Layer -->
    <div class="dotted-pattern base-pattern" :style="basePatternStyle"></div>

    <!-- Country Highlight Layer (if enabled) -->
    <div
      v-if="showCountryHighlights"
      class="dotted-pattern country-highlights"
      :style="highlightPatternStyle"
    ></div>

    <!-- Animated Layer (if enabled) -->
    <div
      v-if="animated"
      class="dotted-pattern animated-pattern"
      :style="animatedPatternStyle"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  // Dot configuration
  dotSize: {
    type: Number,
    default: 2,
  },
  dotColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.4)",
  },
  dotSpacing: {
    type: Number,
    default: 20,
  },

  // Pattern variations
  pattern: {
    type: String,
    default: "regular", // regular, diagonal, hexagon, random, worldmap
    validator: (value) =>
      ["regular", "diagonal", "hexagon", "random", "worldmap"].includes(value),
  },

  // Animation
  animated: {
    type: Boolean,
    default: false,
  },
  animationDuration: {
    type: String,
    default: "20s",
  },

  // Country highlights
  showCountryHighlights: {
    type: Boolean,
    default: false,
  },
  highlightColor: {
    type: String,
    default: "rgba(255, 255, 255, 0.8)",
  },

  // Container styling
  opacity: {
    type: Number,
    default: 1,
  },
  height: {
    type: String,
    default: "100%",
  },
  width: {
    type: String,
    default: "100%",
  },
});

const containerClass = computed(() => {
  return ["relative", "overflow-hidden", props.animated ? "animated" : ""];
});

const containerStyle = computed(() => ({
  width: props.width,
  height: props.height,
  opacity: props.opacity,
}));

const basePatternStyle = computed(() => {
  const size = props.dotSpacing;
  let backgroundImage = "";

  switch (props.pattern) {
    case "worldmap":
      // Create a world map-like pattern with continent shapes
      backgroundImage = [
        // Asia-Pacific region (top-right)
        `radial-gradient(ellipse 120px 80px at 75% 25%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 60px 40px at 85% 35%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 40px 60px at 90% 45%, ${props.dotColor} 1px, transparent 1px)`,

        // Europe-Africa region (center)
        `radial-gradient(ellipse 80px 100px at 55% 30%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 70px 120px at 52% 55%, ${props.dotColor} 1px, transparent 1px)`,

        // Americas region (left)
        `radial-gradient(ellipse 60px 150px at 25% 35%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 80px 100px at 20% 65%, ${props.dotColor} 1px, transparent 1px)`,

        // Australia region (bottom-right)
        `radial-gradient(ellipse 50px 30px at 80% 75%, ${props.dotColor} 1px, transparent 1px)`,

        // Island chains and connections
        `radial-gradient(circle at 70% 50%, ${props.dotColor} 0.5px, transparent 0.5px),
         radial-gradient(circle at 45% 40%, ${props.dotColor} 0.5px, transparent 0.5px),
         radial-gradient(circle at 35% 60%, ${props.dotColor} 0.5px, transparent 0.5px)`,
      ].join(", ");

      return {
        backgroundImage,
        backgroundSize: `800px 400px, 600px 350px, 500px 450px, 300px 200px, ${size}px ${size}px`,
        backgroundPosition: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
        backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat, repeat",
      };

    case "diagonal":
      backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
      return {
        backgroundImage,
        backgroundSize: `${size}px ${size}px`,
        transform: "rotate(45deg) scale(1.4)",
        transformOrigin: "center",
      };

    case "hexagon":
      backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
      return {
        backgroundImage,
        backgroundSize: `${size}px ${size * 0.866}px`,
        backgroundPosition: `0 0, ${size / 2}px ${size * 0.433}px`,
      };

    case "random":
      // Create multiple background layers for random effect
      backgroundImage = [
        `radial-gradient(circle at 25% 25%, ${props.dotColor} 1px, transparent 0)`,
        `radial-gradient(circle at 75% 50%, ${props.dotColor} 1px, transparent 0)`,
        `radial-gradient(circle at 50% 75%, ${props.dotColor} 1px, transparent 0)`,
        `radial-gradient(circle at 20% 80%, ${props.dotColor} 1px, transparent 0)`,
        `radial-gradient(circle at 80% 20%, ${props.dotColor} 1px, transparent 0)`,
      ].join(", ");
      return {
        backgroundImage,
        backgroundSize: `${size * 2}px ${size * 2}px, ${size * 1.5}px ${
          size * 1.5
        }px, ${size * 1.8}px ${size * 1.8}px, ${size * 2.2}px ${
          size * 2.2
        }px, ${size * 1.3}px ${size * 1.3}px`,
        backgroundPosition: "0 0, 10px 5px, -5px 15px, 8px -8px, -12px -3px",
      };

    default: // regular
      backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
      return {
        backgroundImage,
        backgroundSize: `${size}px ${size}px`,
      };
  }
});

const highlightPatternStyle = computed(() => {
  if (!props.showCountryHighlights) return {};

  const size = props.dotSpacing * 1.5;
  return {
    backgroundImage: `radial-gradient(circle at ${props.dotSize * 1.5}px ${
      props.dotSize * 1.5
    }px, ${props.highlightColor} 2px, transparent 0)`,
    backgroundSize: `${size}px ${size}px`,
    backgroundPosition: `${size * 0.3}px ${size * 0.5}px`,
    animationDelay: "2s",
  };
});

const animatedPatternStyle = computed(() => {
  if (!props.animated) return {};

  const size = props.dotSpacing * 0.8;
  return {
    backgroundImage: `radial-gradient(circle at ${props.dotSize * 0.8}px ${
      props.dotSize * 0.8
    }px, ${props.dotColor} 0.8px, transparent 0)`,
    backgroundSize: `${size}px ${size}px`,
    animationDuration: props.animationDuration,
    animationDelay: "1s",
  };
});
</script>

<style scoped>
.dotted-map-container {
  position: relative;
  pointer-events: none;
}

.dotted-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: repeat;
}

.base-pattern {
  z-index: 1;
}

.country-highlights {
  z-index: 2;
  animation: pulse-highlight 8s ease-in-out infinite;
}

.animated-pattern {
  z-index: 3;
  animation: float-dots 15s linear infinite;
}

/* Animation untuk container yang dianimasikan */
.dotted-map-container.animated .base-pattern {
  animation: drift 30s linear infinite;
}

/* Keyframe animations */
@keyframes pulse-highlight {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes float-dots {
  0% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.6;
  }
  25% {
    transform: translateY(-10px) translateX(5px);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-5px) translateX(-3px);
    opacity: 0.4;
  }
  75% {
    transform: translateY(-8px) translateX(2px);
    opacity: 0.7;
  }
  100% {
    transform: translateY(0px) translateX(0px);
    opacity: 0.6;
  }
}

@keyframes drift {
  0% {
    background-position: 0px 0px;
  }
  100% {
    background-position: 40px 40px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .dotted-pattern {
    background-size: 80% !important;
  }
}

/* Performance optimizations */
.dotted-pattern {
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animated-pattern,
  .country-highlights,
  .dotted-map-container.animated .base-pattern {
    animation: none !important;
  }
}
</style>
