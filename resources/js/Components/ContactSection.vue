<template>
  <section
    id="contact"
    class="py-24 bg-sage-900"
    aria-labelledby="contact-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-24">
        <div
          class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold mb-6"
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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact Our Professional Team
        </div>
        <h2
          id="contact-heading"
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-inter"
        >
          Let's Discuss Your Needs
        </h2>
        <p
          class="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-jost"
        >
          Our team of experts is ready to help provide the best logistics
          solutions for your business with 24/7 service.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start">
        <!-- Contact Form -->
        <div
          class="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
        >
          <h3
            class="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 lg:mb-8 font-inter"
            id="contact-form-heading"
          >
            Send Your Message
          </h3>

          <form
            @submit.prevent="submitForm"
            class="space-y-4 md:space-y-6"
            aria-labelledby="contact-form-heading"
            novalidate
          >
            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label
                  for="contact-name"
                  class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost"
                  >Full Name *</label
                >
                <input
                  id="contact-name"
                  v-model="form.name"
                  type="text"
                  required
                  :class="[
                    'w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm',
                    formErrors.name
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/30 focus:ring-white/50',
                  ]"
                  placeholder="Enter full name"
                  :aria-invalid="!!formErrors.name"
                  :aria-describedby="formErrors.name ? 'name-error' : undefined"
                  @blur="validateForm"
                />
                <p
                  v-if="formErrors.name"
                  id="name-error"
                  class="text-red-300 text-xs mt-1 font-jost"
                  role="alert"
                >
                  {{ formErrors.name }}
                </p>
              </div>
              <div>
                <label
                  for="contact-email"
                  class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost"
                  >Email *</label
                >
                <input
                  id="contact-email"
                  v-model="form.email"
                  type="email"
                  required
                  :class="[
                    'w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm',
                    formErrors.email
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/30 focus:ring-white/50',
                  ]"
                  placeholder="example@email.com"
                  :aria-invalid="!!formErrors.email"
                  :aria-describedby="
                    formErrors.email ? 'email-error' : undefined
                  "
                  @blur="validateForm"
                />
                <p
                  v-if="formErrors.email"
                  id="email-error"
                  class="text-red-300 text-xs mt-1 font-jost"
                  role="alert"
                >
                  {{ formErrors.email }}
                </p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label
                  for="contact-phone"
                  class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost"
                  >Mobile Phone *</label
                >
                <input
                  id="contact-phone"
                  v-model="form.phone"
                  type="tel"
                  required
                  :class="[
                    'w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm',
                    formErrors.phone
                      ? 'border-red-400 focus:ring-red-400/50'
                      : 'border-white/30 focus:ring-white/50',
                  ]"
                  placeholder="+62 8xx xxxx xxxx"
                  :aria-invalid="!!formErrors.phone"
                  :aria-describedby="
                    formErrors.phone ? 'phone-error' : undefined
                  "
                  @blur="validateForm"
                />
                <p
                  v-if="formErrors.phone"
                  id="phone-error"
                  class="text-red-300 text-xs mt-1 font-jost"
                  role="alert"
                >
                  {{ formErrors.phone }}
                </p>
              </div>
              <div>
                <label
                  for="contact-service"
                  class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost"
                  >Services</label
                >
                <select
                  id="contact-service"
                  v-model="form.service"
                  class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm"
                  aria-label="Select a service"
                >
                  <option value="" class="text-gray-900">Choose Service</option>
                  <option value="export-import" class="text-gray-900">
                    Export/Import
                  </option>
                  <option value="trucking" class="text-gray-900">
                    Trucking Inland
                  </option>
                  <option value="money-transfer" class="text-gray-900">
                    Transfer Uang
                  </option>
                  <option value="insurance" class="text-gray-900">
                    Asuransi Barang
                  </option>
                  <option value="warehousing" class="text-gray-900">
                    Warehousing
                  </option>
                  <option value="consulting" class="text-gray-900">
                    Consulting
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                for="contact-message"
                class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost"
                >Your Message *</label
              >
              <textarea
                id="contact-message"
                v-model="form.message"
                required
                rows="5"
                :class="[
                  'w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm resize-none',
                  formErrors.message
                    ? 'border-red-400 focus:ring-red-400/50'
                    : 'border-white/30 focus:ring-white/50',
                ]"
                placeholder="Describe your specific needs..."
                :aria-invalid="!!formErrors.message"
                :aria-describedby="
                  formErrors.message ? 'message-error' : undefined
                "
                @blur="validateForm"
              ></textarea>
              <p
                v-if="formErrors.message"
                id="message-error"
                class="text-red-300 text-xs mt-1 font-jost"
                role="alert"
              >
                {{ formErrors.message }}
              </p>
            </div>

            <!-- Success/Error Messages -->
            <div
              v-if="submitStatus === 'success'"
              class="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 text-sm font-jost flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2 flex-shrink-0"
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
              Your message has been sent successfully! Our team will contact you
              soon.
            </div>

            <div
              v-if="submitStatus === 'error'"
              class="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-sm font-jost flex items-center"
            >
              <svg
                class="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              An error occurred. Please try again.
            </div>

            <button
              type="submit"
              :disabled="isSubmitting || !isFormValid"
              :class="[
                'w-full px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300',
                isFormValid && !isSubmitting
                  ? 'bg-white text-sage-500 hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  : 'bg-white/50 text-sage-400 cursor-not-allowed',
              ]"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-sage-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="1"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            </button>
          </form>
        </div>

        <!-- Contact Information & Map -->
        <div
          class="space-y-6 md:space-y-8"
          role="complementary"
          aria-labelledby="contact-info-heading"
        >
          <!-- Contact Info Cards -->
          <div class="grid gap-6">
            <h3 id="contact-info-heading" class="sr-only">
              Contact Information
            </h3>
            <div
              v-for="office in offices"
              :key="office.id"
              class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <h4
                class="text-base md:text-lg font-bold text-white mb-3 md:mb-4 font-inter"
              >
                {{ office.name }}
              </h4>
              <div class="space-y-2 md:space-y-3">
                <div class="flex items-start">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 text-white/80 mt-0.5 mr-2 md:mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span
                    class="text-white/90 text-xs md:text-sm leading-relaxed font-jost"
                    >{{ office.address }}</span
                  >
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 text-white/80 mr-2 md:mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span
                    class="text-white font-medium text-xs md:text-sm font-jost"
                    >{{ office.phone }}</span
                  >
                </div>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 md:w-5 md:h-5 text-white/80 mr-2 md:mr-3 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span
                    class="text-white font-medium text-xs md:text-sm break-all font-jost"
                    >{{ office.email }}</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Why Choose Us -->
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20"
            role="complementary"
            aria-labelledby="why-choose-us-heading"
          >
            <h4
              id="why-choose-us-heading"
              class="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 font-inter"
            >
              Why Choose Us?
            </h4>
            <div class="space-y-3 md:space-y-4">
              <div
                v-for="reason in whyChooseUs"
                :key="reason.title"
                class="flex items-start group"
              >
                <div
                  class="w-2 h-2 bg-white rounded-full mt-2 mr-3 md:mr-4 group-hover:scale-125 transition-transform duration-300 flex-shrink-0"
                ></div>
                <div>
                  <h5
                    class="font-semibold text-white text-xs md:text-sm mb-1 font-jost"
                  >
                    {{ reason.title }}
                  </h5>
                  <p class="text-white/80 text-xs leading-relaxed font-jost">
                    {{ reason.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from "vue";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref(""); // 'success', 'error', or ''
const formErrors = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

// Form validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateForm = () => {
  // Clear previous errors
  Object.keys(formErrors).forEach((key) => (formErrors[key] = ""));

  let isValid = true;

  if (!form.name.trim()) {
    formErrors.name = "Full name is required";
    isValid = false;
  } else if (form.name.trim().length < 2) {
    formErrors.name = "Name must be at least 2 characters";
    isValid = false;
  }

  if (!form.email.trim()) {
    formErrors.email = "Email is required";
    isValid = false;
  } else if (!validateEmail(form.email)) {
    formErrors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!form.phone.trim()) {
    formErrors.phone = "Phone number is required";
    isValid = false;
  } else if (!validatePhone(form.phone)) {
    formErrors.phone = "Please enter a valid phone number";
    isValid = false;
  }

  if (!form.message.trim()) {
    formErrors.message = "Message is required";
    isValid = false;
  } else if (form.message.trim().length < 10) {
    formErrors.message = "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
};

const isFormValid = computed(() => {
  return (
    form.name.trim() &&
    form.email.trim() &&
    validateEmail(form.email) &&
    form.phone.trim() &&
    validatePhone(form.phone) &&
    form.message.trim() &&
    form.message.trim().length >= 10
  );
});

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = "";

  try {
    // Send form data to backend API
    const response = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      // Reset form on success
      Object.keys(form).forEach((key) => (form[key] = ""));
      submitStatus.value = "success";

      // Clear success message after 5 seconds
      setTimeout(() => {
        submitStatus.value = "";
      }, 5000);
    } else {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      submitStatus.value = "error";
    }
  } catch (error) {
    submitStatus.value = "error";
    console.error("Form submission error:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const offices = [
  {
    id: 1,
    name: "Jakarta Head Office",
    address:
      "Ruko Aerohub Citra 8 No.C7-10, Pegadungan, Kec.Kalideres, Kota Jakarta Barat, DKI Jakarta 11830",
    phone: "(021) 23095467",
    email: "eshakawijayalogistics@ewilog.com",
  },
];

const whyChooseUs = [
  {
    title: "Trusted Experience",
    description:
      "20+ years of export-import service with perfect track record and high client satisfaction",
  },
  {
    title: "Global Network",
    description:
      "Partnerships with 50+ countries and access to all major world ports",
  },
  {
    title: "Modern Technology",
    description:
      "Real-time tracking system and process digitization for maximum transparency",
  },
  {
    title: "Profesional Team",
    description:
      "Supported by certified experts with 24/7 responsiveness for your satisfaction",
  },
  {
    title: "Competitive Price",
    description:
      "Best deals with premium quality with no compromise on service excellence",
  },
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Jost:wght@400;500;600&display=swap");

/* Font families */
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.font-jost {
  font-family: "Jost", sans-serif;
}

.font-inter {
  font-family: "Inter", sans-serif;
}

/* Custom Sage Colors - optimized for used classes only */
.text-sage-500 {
  color: #8db580;
}
.text-sage-400 {
  color: #a5c49a;
}
.bg-sage-500 {
  background-color: #8db580;
}
.bg-sage-900 {
  background-color: #5a7d52;
}

/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Optimized responsive utilities */
@media (max-width: 768px) {
  .break-all {
    word-break: break-all;
  }
}

/* Performance optimizations */
.backdrop-blur-sm,
.backdrop-blur-md {
  will-change: backdrop-filter;
}

.transition-all {
  will-change: transform, background-color, border-color, box-shadow;
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-colors,
  .transition-transform {
    transition: none;
  }

  .animate-spin,
  .animate-pulse {
    animation: none;
  }
}
</style>
