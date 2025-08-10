<!-- resources/js/Components/ContactButton.vue -->

<template>
  <button
    :type="buttonType"
    :disabled="disabled"
    :class="buttonClass"
    class="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-opacity-50"
    @click="handleClick"
    :aria-label="ariaLabel"
  >
    <!-- Dynamic Icon -->
    <component
      :is="iconComponent"
      v-if="showIcon && iconComponent"
      :class="iconClass"
    />

    <!-- Button Text -->
    <span v-if="!isLoading">
      <slot>{{ buttonText }}</slot>
    </span>

    <!-- Loading State -->
    <span v-else class="flex items-center">
      <LoadingIcon class="w-5 h-5 mr-2 animate-spin" />
      {{ loadingText }}
    </span>
  </button>
</template>

<script setup>
import { computed, h, defineComponent } from "vue";

// Props
const props = defineProps({
  // Button type and behavior
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  variant: {
    type: String,
    default: "whatsapp",
    validator: (value) =>
      ["whatsapp", "email", "phone", "custom"].includes(value),
  },

  // Contact information
  href: {
    type: String,
    default: null,
  },
  phoneNumber: {
    type: String,
    default: null,
  },
  emailAddress: {
    type: String,
    default: null,
  },
  whatsappNumber: {
    type: String,
    default: null,
  },

  // WhatsApp specific
  whatsappMessage: {
    type: String,
    default: "Hello! I would like to inquire about your services.",
  },

  // Email specific
  emailSubject: {
    type: String,
    default: "Inquiry about Services",
  },
  emailBody: {
    type: String,
    default:
      "Hello,\n\nI would like to know more about your services.\n\nThank you.",
  },

  // Button appearance
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  iconPosition: {
    type: String,
    default: "left",
    validator: (value) => ["left", "right"].includes(value),
  },

  // State management
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "Processing...",
  },

  // Custom styling
  customClass: {
    type: String,
    default: "",
  },

  // Accessibility
  ariaLabel: {
    type: String,
    default: null,
  },

  // Behavior
  openInNewTab: {
    type: Boolean,
    default: true,
  },
  scrollToContact: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits([
  "click",
  "whatsapp-click",
  "email-click",
  "phone-click",
]);

// Button type for form submission
const buttonType = computed(() => props.type);

// Generate contact URLs
const contactUrl = computed(() => {
  if (props.href) return props.href;

  switch (props.variant) {
    case "whatsapp":
      if (!props.whatsappNumber) return "#";
      const message = encodeURIComponent(props.whatsappMessage);
      return `https://wa.me/${props.whatsappNumber.replace(
        /\D/g,
        ""
      )}?text=${message}`;

    case "email":
      if (!props.emailAddress) return "#";
      const subject = encodeURIComponent(props.emailSubject);
      const body = encodeURIComponent(props.emailBody);
      return `mailto:${props.emailAddress}?subject=${subject}&body=${body}`;

    case "phone":
      if (!props.phoneNumber) return "#";
      return `tel:${props.phoneNumber}`;

    default:
      return "#";
  }
});

// Button styling
const buttonClass = computed(() => {
  const baseClasses = "group relative overflow-hidden";
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };

  const variantClasses = {
    whatsapp: `${baseClasses} bg-green-600 hover:bg-green-700 text-white focus:ring-green-300 border-green-600`,
    email: `${baseClasses} bg-white hover:bg-gray-50 text-sage-700 border border-sage-200 focus:ring-sage-300 shadow-md`,
    phone: `${baseClasses} bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-300 border-blue-600`,
    custom: `${baseClasses} bg-sage-600 hover:bg-sage-700 text-white focus:ring-sage-300 border-sage-600`,
  };

  const disabledClasses = props.disabled
    ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-lg"
    : "";

  return [
    variantClasses[props.variant] || variantClasses.custom,
    sizeClasses[props.size],
    disabledClasses,
    props.customClass,
  ]
    .filter(Boolean)
    .join(" ");
});

// Icon class based on position
const iconClass = computed(() => {
  const baseClass = "flex-shrink-0";
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };

  const positionClass = props.iconPosition === "right" ? "ml-2" : "mr-2";

  return `${baseClass} ${sizeMap[props.size]} ${positionClass}`;
});

// Button text fallback
const buttonText = computed(() => {
  const textMap = {
    whatsapp: "WhatsApp",
    email: "Email",
    phone: "Call",
    custom: "Contact",
  };
  return textMap[props.variant] || "Contact";
});

// Icon component selection
const iconComponent = computed(() => {
  const iconMap = {
    whatsapp: WhatsAppIcon,
    email: EmailIcon,
    phone: PhoneIcon,
    custom: ContactIcon,
  };
  return iconMap[props.variant] || ContactIcon;
});

// Click handler
const handleClick = (event) => {
  if (props.disabled || props.isLoading) {
    event.preventDefault();
    return;
  }

  // Emit specific event based on variant
  emit("click", event);
  emit(`${props.variant}-click`, event);

  // Handle scroll to contact section
  if (props.scrollToContact) {
    event.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    return;
  }

  // Handle external links
  if (contactUrl.value && contactUrl.value !== "#") {
    if (props.openInNewTab && props.variant !== "phone") {
      event.preventDefault();
      window.open(contactUrl.value, "_blank", "noopener,noreferrer");
    } else if (props.variant === "phone" || props.variant === "email") {
      event.preventDefault();
      window.location.href = contactUrl.value;
    }
  }
};

// Icon Components
const WhatsAppIcon = defineComponent({
  name: "WhatsAppIcon",
  render() {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-5 h-5",
      },
      [
        h("path", {
          d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.485",
        }),
      ]
    );
  },
});

const EmailIcon = defineComponent({
  name: "EmailIcon",
  render() {
    return h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-5 h-5",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        }),
      ]
    );
  },
});

const PhoneIcon = defineComponent({
  name: "PhoneIcon",
  render() {
    return h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-5 h-5",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
        }),
      ]
    );
  },
});

const ContactIcon = defineComponent({
  name: "ContactIcon",
  render() {
    return h(
      "svg",
      {
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-5 h-5",
      },
      [
        h("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-width": "2",
          d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        }),
      ]
    );
  },
});

const LoadingIcon = defineComponent({
  name: "LoadingIcon",
  render() {
    return h(
      "svg",
      {
        class: "animate-spin w-5 h-5",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
      },
      [
        h("circle", {
          class: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          "stroke-width": "1",
        }),
        h("path", {
          class: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
        }),
      ]
    );
  },
});
</script>

<style scoped>
/* Sage color palette */
.text-sage-700 {
  color: #7ba169;
}

.bg-sage-600 {
  background-color: #8db580;
}

.bg-sage-700 {
  background-color: #7ba169;
}

.border-sage-200 {
  border-color: #d4ddd0;
}

.border-sage-600 {
  border-color: #8db580;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.focus\:ring-sage-300:focus {
  --tw-ring-color: rgba(191, 208, 184, 0.5);
}

/* Enhanced hover effects */
.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:-translate-y-1:hover {
  transform: translateY(-0.25rem);
}

/* Smooth transitions */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Group hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Focus states for accessibility */
button:focus-visible {
  outline: none;
}

/* Active state */
button:active:not(:disabled) {
  transform: translateY(0);
}

/* Disabled state */
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button:disabled:hover {
  transform: none;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .animate-spin {
    transition: none;
    animation: none;
  }

  .hover\:-translate-y-1:hover {
    transform: none;
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .px-8 {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .text-lg {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  button {
    border: 2px solid currentColor;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .bg-white {
    background-color: #1f2937;
    color: #f9fafb;
  }

  .text-sage-700 {
    color: #a7b8a0;
  }

  .border-sage-200 {
    border-color: #4b5563;
  }
}
</style>
