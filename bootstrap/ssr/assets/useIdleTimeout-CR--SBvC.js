import { ref, onMounted, onUnmounted } from "vue";
import { router } from "@inertiajs/vue3";
import axios from "axios";
function useIdleTimeout({ idleMinutes = 10, warningSeconds = 30 } = {}) {
  const showIdleModal = ref(false);
  const idleCountdown = ref(0);
  const idleProcessing = ref(false);
  const IDLE_LIMIT = idleMinutes * 60 * 1e3;
  const COUNTDOWN_LIMIT = warningSeconds;
  const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
  let idleTimer = null;
  let countdownTimer = null;
  const fallbackRoutes = {
    login: "/login",
    logout: "/logout",
    "extend-session": "/extend-session"
  };
  const formatRoute = (name) => {
    if (window.route) {
      try {
        return window.route(name);
      } catch (_) {
      }
    }
    return fallbackRoutes[name] || "/";
  };
  const clearIdleTimers = () => {
    if (idleTimer) clearTimeout(idleTimer);
    if (countdownTimer) clearInterval(countdownTimer);
    idleTimer = null;
    countdownTimer = null;
  };
  const resetIdleTimer = () => {
    clearIdleTimers();
    showIdleModal.value = false;
    idleCountdown.value = 0;
    idleTimer = setTimeout(startIdleWarning, IDLE_LIMIT);
  };
  const startIdleWarning = () => {
    showIdleModal.value = true;
    idleCountdown.value = COUNTDOWN_LIMIT;
    countdownTimer = setInterval(() => {
      idleCountdown.value -= 1;
      if (idleCountdown.value <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
        forceLogout();
      }
    }, 1e3);
  };
  const stayLoggedIn = async () => {
    if (idleProcessing.value) return;
    idleProcessing.value = true;
    try {
      await axios.post(formatRoute("extend-session"));
      resetIdleTimer();
    } catch (_) {
      idleProcessing.value = false;
      forceLogout();
      return;
    }
    idleProcessing.value = false;
  };
  const forceLogout = () => {
    if (idleProcessing.value) return;
    idleProcessing.value = true;
    router.post(formatRoute("logout"), {}, {
      onFinish: () => {
        idleProcessing.value = false;
        window.location.href = formatRoute("login") || "/";
      }
    });
  };
  onMounted(() => {
    resetIdleTimer();
    activityEvents.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));
  });
  onUnmounted(() => {
    clearIdleTimers();
    activityEvents.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
  });
  return { showIdleModal, idleCountdown, idleProcessing, stayLoggedIn, forceLogout };
}
export {
  useIdleTimeout as u
};
