import { useEffect } from "react";
import { useTimerStore } from "../store/timerStore";
import { playAudioSound } from "../utils/sound";

// Global engine tick: derives displayed time from timestamps.
// Mounted once in App. Accurate across refresh & background throttling.
export function useTimerEngine(onComplete) {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const state = useTimerStore.getState();
      const { timers, soundProfile } = state;

      let completedId = null;

      const next = timers.map((t) => {
        if (t.status !== "running") return t;

        if (t.type === "countdown" && t.endTime) {
          const secondsLeft = Math.max(0, Math.ceil((t.endTime - now) / 1000));
          if (secondsLeft <= 0) {
            completedId = t.id;
            return {
              ...t,
              status: "completed",
              remainingTime: 0,
              endTime: null,
            };
          }
          if (secondsLeft !== t.remainingTime)
            return { ...t, remainingTime: secondsLeft };
        } else if (t.type === "stopwatch" && t.startTime) {
          const elapsed = Math.floor(
            (now - t.startTime + (t.accumulatedTime || 0)) / 1000,
          );
          if (elapsed !== t.remainingTime)
            return { ...t, remainingTime: elapsed };
        }
        return t;
      });

      if (completedId) {
        if (soundProfile !== "mute") playAudioSound("completion", soundProfile);
        state.completeTimer(completedId);
        onComplete?.(timers.find((t) => t.id === completedId));
      } else if (next.some((t, i) => t !== timers[i])) {
        useTimerStore.setState({ timers: next });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);
}
