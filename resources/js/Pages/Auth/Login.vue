<template>
  <div class="min-h-screen bg-gradient-to-br from-sage-50 via-sage-100 to-sage-200 flex items-center justify-center p-4">
    <Head title="Sign In - Master Admin" />

    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <svg class="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill="currentColor" class="text-sage-400"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    <!-- Main Container -->
    <div class="w-full max-w-md relative z-10">
      <!-- Brand Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sage-600 to-sage-700 rounded-2xl shadow-lg mb-4">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <p class="text-sage-600 text-sm sm:text-base">Sign in to access your dashboard</p>
      </div>

      <!-- Login Card -->
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-sage-200/50 p-6 sm:p-8">
        <!-- Status Message -->
        <div
          v-if="status"
          class="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-start space-x-3"
        >
          <svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ status }}</span>
        </div>

        <form @submit.prevent="submit" class="space-y-5 sm:space-y-6">
          <!-- Email Field -->
          <div class="space-y-2">
            <InputLabel for="email" value="Email Address" class="text-sage-800 font-semibold text-sm" />
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <TextInput
                id="email"
                type="email"
                class="w-full pl-10 pr-4 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200 text-sm sm:text-base"
                v-model="form.email"
                required
                autofocus
                autocomplete="username"
                placeholder="Enter your email address"
              />
            </div>
            <InputError class="text-xs sm:text-sm" :message="form.errors.email" />
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <InputLabel for="password" value="Password" class="text-sage-800 font-semibold text-sm" />
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <TextInput
                id="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full pl-10 pr-12 py-3 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all duration-200 text-sm sm:text-base"
                v-model="form.password"
                required
                autocomplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-sage-400 hover:text-sage-600 transition-colors focus:outline-none"
                aria-label="Toggle password visibility"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              </button>
            </div>
            <InputError class="text-xs sm:text-sm" :message="form.errors.password" />
          </div>

          <!-- Remember & Forgot -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <label class="flex items-center cursor-pointer group">
              <Checkbox
                name="remember"
                v-model:checked="form.remember"
                class="rounded border-sage-300 text-sage-600 focus:ring-sage-500 focus:ring-offset-0"
              />
              <span class="ml-2 text-sm text-sage-600 group-hover:text-sage-800 transition-colors select-none">
                Remember me
              </span>
            </label>

            <Link
              v-if="canResetPassword"
              :href="route('password.request')"
              class="text-sm text-sage-600 hover:text-sage-800 font-medium transition-colors duration-200 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="form.processing"
            class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-sage-600 to-sage-700 hover:from-sage-700 hover:to-sage-800 disabled:from-sage-400 disabled:to-sage-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl disabled:shadow-md transform hover:-translate-y-0.5 disabled:translate-y-0 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 text-sm sm:text-base"
          >
            <svg
              v-if="form.processing"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ form.processing ? 'Signing In...' : 'Sign In' }}</span>
          </button>
        </form>

        <!-- Additional Actions -->
        <div class="mt-6 space-y-4">
          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-sage-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-3 bg-white text-sage-500">Don't have an account?</span>
            </div>
          </div>

          <!-- Register Link -->
          <div class="text-center">
            <Link
              :href="route('register')"
              class="inline-flex items-center text-sage-600 hover:text-sage-800 font-medium transition-colors duration-200 text-sm hover:underline"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create a new account
            </Link>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-6 sm:mt-8">
        <p class="text-xs sm:text-sm text-sage-500">
          &copy; {{ new Date().getFullYear() }} All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Checkbox from '@/Components/Checkbox.vue'
import InputError from '@/Components/InputError.vue'
import InputLabel from '@/Components/InputLabel.vue'
import TextInput from '@/Components/TextInput.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'

// Props
defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
})

// Reactive state
const showPassword = ref(false)

// Form setup
const form = useForm({
  email: '',
  password: '',
  remember: false,
})

// Methods
const submit = () => {
  form.post(route('login'), {
    onFinish: () => form.reset('password'),
  })
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
/* Smooth animations */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Input focus enhancements */
input:focus {
  transform: scale(1.005);
}

/* Button active state */
button:active:not(:disabled) {
  transform: scale(0.98) translateY(0);
}

/* Custom scrollbar for mobile */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(141, 181, 128, 0.3);
  border-radius: 2px;
}

/* Mobile optimizations */
@media (max-width: 640px) {
  input {
    font-size: 16px; /* Prevents zoom on iOS */
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
