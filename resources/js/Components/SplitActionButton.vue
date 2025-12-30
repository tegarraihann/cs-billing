<template>
  <div ref="root" class="relative inline-flex">
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-l-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled"
      @click="handlePrimary"
    >
      <component v-if="icon" :is="icon" class="w-4 h-4 mr-2" />
      {{ label }}
    </button>
    <button
      type="button"
      class="inline-flex items-center px-2 py-2 bg-sage-600 border border-transparent rounded-r-md font-semibold text-xs text-white hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="disabled || items.length === 0"
      @click="toggleMenu"
    >
      <ChevronDown class="w-4 h-4" />
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
    >
      <div class="py-1">
        <button
          v-for="(item, index) in items"
          :key="index"
          type="button"
          class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="item.disabled"
          @click="handleItem(item)"
        >
          <component v-if="item.icon" :is="item.icon" class="w-4 h-4 mr-2" />
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { router } from '@inertiajs/vue3'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: [Object, Function],
    default: null
  },
  onClick: {
    type: Function,
    default: null
  },
  href: {
    type: [String, Object],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    default: () => []
  }
})

const open = ref(false)
const root = ref(null)

const handlePrimary = () => {
  if (props.disabled) return
  if (props.items.length > 0) {
    toggleMenu()
    return
  }
  if (typeof props.onClick === 'function') {
    props.onClick()
    return
  }
  if (props.href) {
    router.visit(props.href)
  }
}

const handleItem = (item) => {
  if (item.disabled) return
  if (typeof item.onClick === 'function') {
    item.onClick()
  } else if (item.href) {
    router.visit(item.href)
  }
  open.value = false
}

const toggleMenu = () => {
  if (props.disabled || props.items.length === 0) return
  open.value = !open.value
}

const handleClickOutside = (event) => {
  if (!root.value) return
  if (!root.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.bg-sage-900 { background-color: #5a7a51; }
.hover\:bg-sage-50:hover { background-color: #f4f6f3; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
</style>
