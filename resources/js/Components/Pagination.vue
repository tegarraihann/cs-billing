<template>
  <nav v-if="data.last_page > 1" class="flex items-center justify-between">
    <!-- Mobile view -->
    <div class="flex flex-1 justify-between sm:hidden">
      <Link
        v-if="data.prev_page_url"
        :href="data.prev_page_url"
        class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-md hover:bg-sage-50 transition-colors"
      >
        Sebelumnya
      </Link>
      <div v-else class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-sage-400 bg-sage-100 border border-sage-300 rounded-md cursor-not-allowed">
        Sebelumnya
      </div>
      
      <Link
        v-if="data.next_page_url"
        :href="data.next_page_url"
        class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-md hover:bg-sage-50 transition-colors"
      >
        Selanjutnya
      </Link>
      <div v-else class="relative ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-sage-400 bg-sage-100 border border-sage-300 rounded-md cursor-not-allowed">
        Selanjutnya
      </div>
    </div>

    <!-- Desktop view -->
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-sage-700">
          Menampilkan
          <span class="font-medium">{{ data.from || 0 }}</span>
          sampai
          <span class="font-medium">{{ data.to || 0 }}</span>
          dari
          <span class="font-medium">{{ data.total || 0 }}</span>
          hasil
        </p>
      </div>
      <div>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <!-- Previous Page Link -->
          <Link
            v-if="data.prev_page_url"
            :href="data.prev_page_url"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-sage-300 bg-white text-sm font-medium text-sage-500 hover:bg-sage-50 transition-colors"
          >
            <span class="sr-only">Sebelumnya</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </Link>
          <div v-else class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-sage-300 bg-sage-100 text-sm font-medium text-sage-400 cursor-not-allowed">
            <span class="sr-only">Sebelumnya</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>

          <!-- Page Numbers -->
          <template v-for="page in pageNumbers" :key="page">
            <!-- Current Page -->
            <div
              v-if="page === data.current_page"
              class="relative inline-flex items-center px-4 py-2 border border-sage-500 bg-sage-600 text-sm font-medium text-white cursor-default"
            >
              {{ page }}
            </div>
            <div
              v-else-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 border border-sage-300 bg-white text-sm font-medium text-sage-500 cursor-default"
            >
              ...
            </div>
            <!-- Page Link -->
            <Link
              v-else
              :href="getPageUrl(page)"
              class="relative inline-flex items-center px-4 py-2 border border-sage-300 bg-white text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors"
            >
              {{ page }}
            </Link>
          </template>

          <!-- Next Page Link -->
          <Link
            v-if="data.next_page_url"
            :href="data.next_page_url"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-sage-300 bg-white text-sm font-medium text-sage-500 hover:bg-sage-50 transition-colors"
          >
            <span class="sr-only">Selanjutnya</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </Link>
          <div v-else class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-sage-300 bg-sage-100 text-sm font-medium text-sage-400 cursor-not-allowed">
            <span class="sr-only">Selanjutnya</span>
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </nav>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const pageNumbers = computed(() => {
  const pages = []
  const current = props.data.current_page
  const last = props.data.last_page
  
  // Always show first page
  if (last > 1) {
    pages.push(1)
  }
  
  // Add dots if there's a gap
  if (current > 4) {
    pages.push('...')
  }
  
  // Add pages around current page
  const start = Math.max(2, current - 2)
  const end = Math.min(last - 1, current + 2)
  
  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }
  
  // Add dots if there's a gap before last page
  if (current < last - 3) {
    pages.push('...')
  }
  
  // Always show last page
  if (last > 1 && !pages.includes(last)) {
    pages.push(last)
  }
  
  return pages
})

const getPageUrl = (page) => {
  const url = new URL(props.data.path, window.location.origin)
  const params = new URLSearchParams(window.location.search)
  
  if (page === 1) {
    params.delete('page')
  } else {
    params.set('page', page)
  }
  
  const queryString = params.toString()
  return `${url.pathname}${queryString ? '?' + queryString : ''}`
}
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-400 {
  color: #a8c49a;
}

.text-sage-500 {
  color: #9fb894;
}

.text-sage-700 {
  color: #7ba169;
}

.bg-sage-50 {
  background-color: #f4f6f3;
}

.bg-sage-100 {
  background-color: #e8ece6;
}

.bg-sage-600 {
  background-color: #8db580;
}

.border-sage-300 {
  border-color: #c0cdb8;
}

.border-sage-500 {
  border-color: #9fb894;
}

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
</style>
