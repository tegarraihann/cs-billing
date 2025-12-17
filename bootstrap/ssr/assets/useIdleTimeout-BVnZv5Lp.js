import { ref, onMounted, onUnmounted } from "vue";
import { router } from "@inertiajs/vue3";
function useIdleTimeout({ idleMinutes = 10, warningSeconds = 30 } = {}) {
  const showIdleModal = ref(false);
  const idleCountdown = ref(0);
  const idleProcessing = ref(false);
  const IDLE_LIMIT = idleMinutes * 60 * 1e3;
  const COUNTDOWN_LIMIT = warningSeconds;
  const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
  let idleTimer = null;
  let countdownTimer = null;
  const formatRoute = (name) => window.route ? window.route(name) : "/";
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
  const stayLoggedIn = () => {
    resetIdleTimer();
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
