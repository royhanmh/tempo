import { formatTime } from "../../utils/time";

export default function TimerDisplay({ timer, size = "hero" }) {
  // clamp keeps digits readable on small screens without overflowing
  const sizes = {
    hero: "text-[clamp(3.5rem,18vw,9rem)]",
    card: "text-3xl",
    focus: "text-[clamp(3.5rem,16vw,8rem)]",
  };
  return (
    <div
      className={`${sizes[size]} font-mono-num font-bold tracking-tight text-tempo-text dark:text-white`}
    >
      {formatTime(timer.remainingTime)}
    </div>
  );
}
