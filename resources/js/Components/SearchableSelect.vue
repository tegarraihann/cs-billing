<template>
  <div class="relative searchable-select-container" ref="dropdown">
    <div class="relative">
      <input
        ref="searchInput"
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        :class="inputClass"
        @focus="showOptions = true"
        @input="handleInput"
        @keydown="handleKeydown"
        autocomplete="off"
      />
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <!-- Options dropdown -->
    <div
      v-if="showOptions && filteredOptions.length > 0"
      class="searchable-select-dropdown absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-auto"
      style="z-index: 9999;"
    >
      <div
        v-for="(option, index) in filteredOptions"
        :key="option[valueField]"
        :class="[
          'px-3 py-2 cursor-pointer hover:bg-gray-100',
          selectedIndex === index ? 'bg-blue-100' : ''
        ]"
        @click="selectOption(option)"
        @mouseenter="selectedIndex = index"
      >
        <div class="font-medium text-gray-900">{{ option[labelField] }}</div>
        <div v-if="option[subLabelField]" class="text-sm text-gray-500">{{ option[subLabelField] }}</div>
      </div>
    </div>

    <!-- No results message -->
    <div
      v-if="showOptions && searchQuery && filteredOptions.length === 0"
      class="searchable-select-dropdown absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl"
      style="z-index: 9999;"
    >
      <div class="px-3 py-2 text-gray-500 text-center">
        Tidak ada hasil untuk "{{ searchQuery }}"
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Cari...'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  subLabelField: {
    type: String,
    default: 'subLabel'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  searchFields: {
    type: Array,
    default: () => ['label']
  },
  inputClass: {
    type: String,
    default: 'w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const searchQuery = ref('')
const showOptions = ref(false)
const selectedIndex = ref(-1)
const dropdown = ref(null)
const searchInput = ref(null)

// Find selected option and set search query
const selectedOption = computed(() => {
  return props.options.find(option => option[props.valueField] == props.modelValue)
})

// Set initial search query when component mounts or modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue && selectedOption.value) {
    searchQuery.value = selectedOption.value[props.labelField]
  } else {
    searchQuery.value = ''
  }
}, { immediate: true })

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return props.options
  }

  const query = searchQuery.value.toLowerCase()
  return props.options.filter(option => {
    return props.searchFields.some(field => {
      const value = option[field]
      return value && value.toString().toLowerCase().includes(query)
    })
  })
})

const handleInput = () => {
  showOptions.value = true
  selectedIndex.value = -1

  // Clear selection if search query doesn't match current selection
  if (selectedOption.value && searchQuery.value !== selectedOption.value[props.labelField]) {
    emit('update:modelValue', '')
    emit('select', null)
  }
}

const handleKeydown = (event) => {
  if (!showOptions.value) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredOptions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (selectedIndex.value >= 0 && filteredOptions.value[selectedIndex.value]) {
        selectOption(filteredOptions.value[selectedIndex.value])
      }
      break
    case 'Escape':
      showOptions.value = false
      selectedIndex.value = -1
      break
  }
}

const selectOption = (option) => {
  searchQuery.value = option[props.labelField]
  showOptions.value = false
  selectedIndex.value = -1

  emit('update:modelValue', option[props.valueField])
  emit('select', option)
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    showOptions.value = false
    selectedIndex.value = -1

    // Restore original value if no valid selection
    if (selectedOption.value) {
      searchQuery.value = selectedOption.value[props.labelField]
    } else {
      searchQuery.value = ''
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Method to focus the input
const focus = () => {
  searchInput.value?.focus()
}

defineExpose({
  focus
})
</script>

<style>
/* Ensure parent containers don't clip the dropdown */
.searchable-select-container {
  position: relative;
}

/* Make sure dropdown appears above all other elements */
.searchable-select-dropdown {
  position: absolute !important;
  z-index: 9999 !important;
  transform: translateZ(0);
}
</style>