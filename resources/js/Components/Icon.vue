<template>
  <!-- Dummy Icon Component -->
  <span class="icon" :style="{ fontSize: size + 'px', color }">
    {{ name }}
  </span>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: "⭐", // default icon text
  },
  size: {
    type: Number,
    default: 20,
  },
  color: {
    type: String,
    default: "#333",
  },
});
</script>

<style scoped>
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
