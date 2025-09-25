<template>
  <!-- This component runs silently in the background -->
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { router } from '@inertiajs/vue3'
import axios from 'axios'

// Timer configuration
const TIMER_DURATION = 10 * 60 * 1000 // 10 minutes in milliseconds
const EXTEND_INTERVAL = 2 * 60 * 1000  // Extend session every 2 minutes when active

let logoutTimer = null
let extendTimer = null
let lastActivity = Date.now()

// Activity tracking
const updateLastActivity = () => {
  lastActivity = Date.now()

  // Reset the logout timer
  resetLogoutTimer()

  // Start extending session if user is active
  if (!extendTimer) {
    startExtendTimer()
  }
}

// Reset the logout timer
const resetLogoutTimer = () => {
  if (logoutTimer) {
    clearTimeout(logoutTimer)
  }

  logoutTimer = setTimeout(() => {
    performAutoLogout()
  }, TIMER_DURATION)
}

// Start session extension timer
const startExtendTimer = () => {
  if (extendTimer) {
    clearInterval(extendTimer)
  }

  extendTimer = setInterval(() => {
    const timeSinceLastActivity = Date.now() - lastActivity

    // If user is still active (activity within last 2 minutes), extend session
    if (timeSinceLastActivity < EXTEND_INTERVAL) {
      extendSession()
    } else {
      // Stop extending if no activity
      clearInterval(extendTimer)
      extendTimer = null
    }
  }, EXTEND_INTERVAL)
}

// Extend session via API
const extendSession = async () => {
  try {
    await axios.post('/extend-session')
    console.log('Session extended due to user activity')
  } catch (error) {
    console.error('Failed to extend session:', error)
    // If extend fails, user might already be logged out
    if (error.response?.status === 401) {
      performAutoLogout()
    }
  }
}

// Perform auto logout
const performAutoLogout = () => {
  // Clear all timers
  if (logoutTimer) clearTimeout(logoutTimer)
  if (extendTimer) clearInterval(extendTimer)

  // Remove event listeners
  removeEventListeners()

  // Perform logout and redirect
  router.post('/logout', {}, {
    onSuccess: () => {
      router.visit('/login', {
        method: 'get',
        data: {},
        onSuccess: () => {
          // Show message after redirect
          setTimeout(() => {
            alert('Sesi berakhir karena tidak aktif')
          }, 100)
        }
      })
    },
    onError: () => {
      // Fallback: force redirect to login
      window.location.href = '/login?message=session_expired'
    }
  })
}

// Activity events to track
const activityEvents = [
  'mousedown',
  'mousemove',
  'keypress',
  'scroll',
  'touchstart',
  'click',
  'keydown'
]

// Add event listeners
const addEventListeners = () => {
  activityEvents.forEach(event => {
    document.addEventListener(event, updateLastActivity, { passive: true })
  })
}

// Remove event listeners
const removeEventListeners = () => {
  activityEvents.forEach(event => {
    document.removeEventListener(event, updateLastActivity)
  })
}

// Initialize component
onMounted(() => {
  console.log('AutoLogoutTimer: Initialized - 10 minute session timeout')

  // Set initial activity time
  updateLastActivity()

  // Start tracking user activity
  addEventListeners()

  // Start the initial logout timer
  resetLogoutTimer()
})

// Cleanup on unmount
onUnmounted(() => {
  console.log('AutoLogoutTimer: Cleaned up')

  // Clear timers
  if (logoutTimer) clearTimeout(logoutTimer)
  if (extendTimer) clearInterval(extendTimer)

  // Remove event listeners
  removeEventListeners()
})

// Handle page visibility change (when user switches tabs/minimizes)
const handleVisibilityChange = () => {
  if (!document.hidden) {
    // Page became visible, update activity
    updateLastActivity()
  }
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>