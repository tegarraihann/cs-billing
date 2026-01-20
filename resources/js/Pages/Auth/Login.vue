<template>
    <div
        class="relative min-h-screen bg-gradient-to-br from-sage-100 via-sage-200 to-sage-300 flex items-center justify-center p-4 overflow-hidden">

        <Head title="Sign In - Master Admin" />

        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <circle cx="30" cy="30" r="2" fill="currentColor" class="text-sage-400" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>

        <!-- Right Hero Logo -->
        <div
            class="absolute inset-y-50 right-0 hidden lg:flex items-end justify-end pr-0 pb-0 pointer-events-none z-0 translate-x-96 translate-y-16">
            <img src="/images/logo/logo.png" alt="Logo" class="w-[50rem] xl:w-[60rem] opacity-30" />
        </div>

        <!-- Main Container -->
        <div class="w-full max-w-md relative z-10">
            <!-- Login Card -->
            <div
                class="bg-[#8B9C7E] text-white backdrop-blur-md rounded-[2rem] shadow-[0_30px_60px_rgba(38,56,34,0.3)] border border-white/20 p-6 sm:p-8">
                <div class="text-center mb-6">
                    <h1 class="text-2xl sm:text-3xl font-semibold tracking-wide uppercase mb-1">Welcome Back</h1>
                    <p class="text-white/80 text-sm sm:text-base">Sign in to access your dashboard</p>
                </div>
                <!-- Status Message -->
                <div v-if="status"
                    class="mb-6 p-3 sm:p-4 bg-white/20 border border-white/30 rounded-xl text-white text-sm flex items-start space-x-3">
                    <svg class="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ status }}</span>
                </div>

                <!-- Demo Credentials Info -->
                <!-- <div class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 class="font-semibold text-blue-800 mb-2 flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Demo Credentials
          </h3>
          <div class="text-xs text-blue-700 space-y-1">
            <p><strong>Master Admin:</strong> masteradmin@example.com</p>
            <p><strong>Admin CS:</strong> CS@example.com</p>
            <p><strong>Finance Dept:</strong> keuangan@example.com</p>
            <p class="mt-2"><strong>Password for all:</strong> password</p>
          </div>
        </div> -->

                <form id="login-form" @submit.prevent="submit" class="space-y-5 sm:space-y-6">
                    <!-- Role Selection Field -->
                    <div class="space-y-2">
                        <InputLabel for="role" value="LOGIN AS :" class="text-white/90 font-medium text-sm uppercase" />
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <select id="role" v-model="form.role"
                                class="w-full pl-10 pr-4 py-3 border border-white/40 rounded-full bg-white/70 text-sage-900 placeholder-sage-500 shadow-[0_14px_24px_rgba(0,0,0,0.22)] focus:ring-2 focus:ring-white/70 focus:border-white/70 transition-all duration-200 text-sm sm:text-base appearance-none"
                                required>
                                <option value="">Select your role</option>
                                <option v-for="role in roles" :key="role.value" :value="role.value">
                                    {{ role.label }}
                                </option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <InputError class="text-xs sm:text-sm text-white/90" :message="form.errors.role" />
                    </div>

                    <!-- Email Field -->
                    <div class="space-y-2 rounded-full">
                        <InputLabel for="email" value="EMAIL ADDRESS :"
                            class="text-white/90 font-medium text-sm uppercase rounded-full" />
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                            <TextInput id="email" type="email"
                                class="w-full pl-10 pr-4 py-3 border border-white/40 !rounded-full bg-white/70 text-sage-900 placeholder-sage-500 shadow-[0_14px_24px_rgba(0,0,0,0.22)] focus:ring-2 focus:ring-white/70 focus:border-white/70 transition-all duration-200 text-sm sm:text-base"
                                v-model="form.email" required autocomplete="username"
                                placeholder="Enter your email address" />
                        </div>
                        <InputError class="text-xs sm:text-sm text-white/90" :message="form.errors.email" />
                    </div>

                    <!-- Password Field -->
                    <div class="space-y-2">
                        <InputLabel for="password" value="PASSWORD :"
                            class="text-white/90 font-medium text-sm uppercase" />
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg class="w-5 h-5 text-white/70" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <TextInput id="password" :type="showPassword ? 'text' : 'password'"
                                class="w-full pl-10 pr-12 py-3 border border-white/40 !rounded-full bg-white/70 text-sage-900 placeholder-sage-500 shadow-[0_14px_24px_rgba(0,0,0,0.22)] focus:ring-2 focus:ring-white/70 focus:border-white/70 transition-all duration-200 text-sm sm:text-base"
                                v-model="form.password" required autocomplete="current-password"
                                placeholder="Enter your password" />
                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center text-white/70 hover:text-white transition-colors focus:outline-none"
                                aria-label="Toggle password visibility">
                                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                </svg>
                            </button>
                        </div>
                        <InputError class="text-xs sm:text-sm text-white/90" :message="form.errors.password" />
                    </div>

                    <!-- Remember & Forgot -->
                    <!-- <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <label class="flex items-center cursor-pointer group">
                            <Checkbox name="remember" v-model:checked="form.remember"
                                class="rounded border-white/70 text-sage-600 focus:ring-white/70 focus:ring-offset-0" />
                            <span
                                class="ml-2 text-sm text-white/80 group-hover:text-white transition-colors select-none">
                                Remember me
                            </span>
                        </label>

                        <span class="text-sm text-white/80 select-none">&nbsp;</span>
                    </div> -->
                </form>
            </div>

            <!-- Submit Button -->
            <div class="mt-6 flex items-center justify-between">
                <Link v-if="canResetPassword" :href="route('password.request')"
                    class="text-sm text-white/80 hover:text-white font-medium transition-colors duration-200 hover:underline">
                    Forgot your password?
                </Link>
                <button type="submit" form="login-form" :disabled="form.processing"
                    class="flex items-center justify-center px-10 py-3 bg-white/25 text-white font-bold uppercase tracking-wide rounded-full shadow-[0_14px_20px_rgba(38,56,34,0.2)] hover:bg-white/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/70 text-base sm:text-lg">
                    <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-5 w-5 text-sage-800"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    <span>{{ form.processing ? 'SIGNING IN...' : 'SIGN IN' }}</span>
                </button>
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
const props = defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    roles: {
        type: Array,
        default: () => [],
    },
})

// Reactive state
const showPassword = ref(false)

// Form setup
const form = useForm({
    role: '',
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
input:focus,
select:focus {
    transform: scale(1.005);
}

/* Button active state */
button:active:not(:disabled) {
    transform: scale(0.98) translateY(0);
}
</style>
