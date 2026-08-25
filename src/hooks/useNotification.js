import { useCallback } from "react";

// Browser notification on timer completion (permission-gated, graceful).
export function useNotification() {
  const requestPermission = useCallback(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const notify = useCallback((title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(title, { body });
      } catch {
        /* ignore */
      }
    }
  }, []);

  return { requestPermission, notify };
}
