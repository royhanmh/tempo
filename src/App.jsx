import { useCallback, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Focus from "./pages/Focus";
import NotFound from "./pages/NotFound";
import { useTimerStore } from "./store/timerStore";
import { useTimerEngine } from "./hooks/useTimerEngine";
import { useNotification } from "./hooks/useNotification";
import { THEMES } from "./utils/themes";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify, requestPermission } = useNotification();
  const theme = useTimerStore((s) => s.theme);

  const handleComplete = useCallback(
    (timer) => {
      if (!timer) return;
      notify("Timer Complete", `${timer.name} has finished.`);
    },
    [notify],
  );

  useTimerEngine(handleComplete);

  // Request notification permission on first interaction
  useEffect(() => {
    const handler = () => {
      requestPermission();
      window.removeEventListener("pointerdown", handler);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, [requestPermission]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      const store = useTimerStore.getState();
      const active =
        store.timers.find((t) => t.id === store.activeTimerId) ||
        store.timers[0];

      if (e.key === "/") {
        e.preventDefault();
        document.querySelector('input[aria-label="Search timers"]')?.focus();
      } else if (e.code === "Space") {
        e.preventDefault();
        if (!active) return;
        active.status === "running"
          ? store.pauseTimer(active.id)
          : store.startTimer(active.id);
      } else if (e.key.toLowerCase() === "r") {
        if (active) store.resetTimer(active.id);
      } else if (e.key.toLowerCase() === "f") {
        location.pathname.startsWith("/focus")
          ? navigate("/")
          : active && navigate(`/focus/${active.id}`);
      } else if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        // Open create modal via custom event (Home listens)
        window.dispatchEvent(new CustomEvent("tempo:new-timer"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, location.pathname]);

  // Apply theme class to <html> on every route; unknown ids fall back to light
  useEffect(() => {
    const meta = THEMES.find((t) => t.id === theme) || THEMES[0];
    const root = document.documentElement;
    root.classList.toggle("dark", meta.isDark);
    root.classList.toggle("light", !meta.isDark);
    THEMES.forEach((t) => root.classList.remove(`theme-${t.id}`));
    if (!["light", "dark"].includes(meta.id))
      root.classList.add(`theme-${meta.id}`);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/focus/:id" element={<Focus />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
