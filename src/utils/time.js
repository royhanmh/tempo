// Formats total seconds to HH:MM:SS or MM:SS
export const formatTime = (totalSeconds) => {
  const secs = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  const pad = (num) => String(num).padStart(2, "0");
  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return `${pad(minutes)}:${pad(seconds)}`;
};

// Percentage remaining for countdowns
export const calculateProgress = (timer) => {
  if (timer.type === "stopwatch") return 100;
  if (!timer.duration || timer.duration <= 0) return 0;
  const remaining =
    timer.remainingTime !== undefined ? timer.remainingTime : timer.duration;
  return Math.min(100, Math.max(0, (remaining / timer.duration) * 100));
};

export const formatTimestamp = (isoString) => {
  if (!isoString) return "";
  return new Date(isoString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
