<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="pt-16">
      <!-- Sidebar -->
      <Navbar />

      <!-- Hero Section -->
      <HeroSection />

      <!-- Footer Section -->
      <FooterSection />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from "@/Pages/masteradmin/Navbar.vue"

import FooterSection from "@/Pages/masteradmin/FooterSection.vue"
import { Head } from "@inertiajs/vue3"

// Props
const props = defineProps({
  canLogin: Boolean,
  canRegister: Boolean,
})

// Mobile sidebar state
const isMobileSidebarOpen = ref(false)

const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value
}

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false
}
</script>

<style scoped>
/* Component-specific styles if needed */
</style>
