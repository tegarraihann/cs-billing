<template>
  <span class="text-animate">
    <slot />
  </span>
</template>

<script setup>
// Komponen dummy untuk animasi teks
// Nanti bisa diganti dengan animasi asli
</script>

<style scoped>
.text-animate {
  display: inline-block;
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
