import { ssrRenderAttrs } from "vue/server-renderer";
import { onMounted, onUnmounted, useSSRContext } from "vue";
import { router } from "@inertiajs/vue3";
import axios from "axios";
const TIMER_DURATION = 10 * 60 * 1e3;
const EXTEND_INTERVAL = 2 * 60 * 1e3;
const _sfc_main = {
  __name: "AutoLogoutTimer",
  __ssrInlineRender: true,
  setup(__props) {
    let logoutTimer = null;
    let extendTimer = null;
    let lastActivity = Date.now();
    const updateLastActivity = () => {
      lastActivity = Date.now();
      resetLogoutTimer();
      if (!extendTimer) {
        startExtendTimer();
      }
    };
    const resetLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      logoutTimer = setTimeout(() => {
        performAutoLogout();
      }, TIMER_DURATION);
    };
    const startExtendTimer = () => {
      if (extendTimer) {
        clearInterval(extendTimer);
      }
      extendTimer = setInterval(() => {
        const timeSinceLastActivity = Date.now() - lastActivity;
        if (timeSinceLastActivity < EXTEND_INTERVAL) {
          extendSession();
        } else {
          clearInterval(extendTimer);
          extendTimer = null;
        }
      }, EXTEND_INTERVAL);
    };
    const extendSession = async () => {
      var _a;
      try {
        await axios.post("/extend-session");
        console.log("Session extended due to user activity");
      } catch (error) {
        console.error("Failed to extend session:", error);
        if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
          performAutoLogout();
        }
      }
    };
    const performAutoLogout = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      if (extendTimer) clearInterval(extendTimer);
      removeEventListeners();
      router.post("/logout", {}, {
        onSuccess: () => {
          router.visit("/login", {
            method: "get",
            data: {},
            onSuccess: () => {
              setTimeout(() => {
                alert("Sesi berakhir karena tidak aktif");
              }, 100);
            }
          });
        },
        onError: () => {
          window.location.href = "/login?message=session_expired";
        }
      });
    };
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
      "keydown"
    ];
    const addEventListeners = () => {
      activityEvents.forEach((event) => {
        document.addEventListener(event, updateLastActivity, { passive: true });
      });
    };
    const removeEventListeners = () => {
      activityEvents.forEach((event) => {
        document.removeEventListener(event, updateLastActivity);
      });
    };
    onMounted(() => {
      console.log("AutoLogoutTimer: Initialized - 10 minute session timeout");
      updateLastActivity();
      addEventListeners();
      resetLogoutTimer();
    });
    onUnmounted(() => {
      console.log("AutoLogoutTimer: Cleaned up");
      if (logoutTimer) clearTimeout(logoutTimer);
      if (extendTimer) clearInterval(extendTimer);
      removeEventListeners();
    });
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateLastActivity();
      }
    };
    onMounted(() => {
      document.addEventListener("visibilitychange", handleVisibilityChange);
    });
    onUnmounted(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AutoLogoutTimer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
