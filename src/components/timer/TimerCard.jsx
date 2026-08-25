import { Timer as TimerIcon } from "lucide-react";
import { useTimerStore } from "../../store/timerStore";
import { formatTime } from "../../utils/time";
import TimerControls from "./TimerControls";

// User-assigned category colors (data, not decoration): the user picks one
// per timer to tell categories apart at a glance. The app never assigns one.
const ACCENTS = {
  green: "border-l-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/10",
  orange: "border-l-orange-500 bg-orange-50/30 dark:bg-orange-950/10",
  red: "border-l-red-500 bg-red-50/30 dark:bg-red-950/10",
  purple: "border-l-purple-500 bg-purple-50/30 dark:bg-purple-950/10",
  blue: "border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/10",
};

export default function TimerCard({ timer }) {
  const { activeTimerId, setActiveTimerId } = useTimerStore();
  const isSelected = timer.id === activeTimerId;
  // Cards are uniform by design: they are peers in a grid. Hierarchy lives in
  // the hero ActiveTimer card above, which carries size and focus.

  return (
    <div
      onClick={() => setActiveTimerId(timer.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setActiveTimerId(timer.id)}
      aria-label={`Select ${timer.name}`}
      className={`p-5 rounded-2xl bg-tempo-card dark:bg-tempo-darkcard border border-l-4 transition-ui cursor-pointer flex flex-col justify-between space-y-4 shadow-sm ${
        ACCENTS[timer.accent || "green"]
      } ${
        isSelected
          ? "ring-2 ring-tempo-text dark:ring-white border-tempo-border dark:border-tempo-darkborder"
          : "border-tempo-border dark:border-tempo-darkborder hover:border-tempo-muted"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TimerIcon className="w-4 h-4 text-tempo-muted dark:text-tempo-darkmuted" />
          <span className="text-xs font-semibold truncate text-tempo-text dark:text-white">
            {timer.name}
          </span>
        </div>
        <div className="text-3xl font-mono-num font-bold tracking-tight text-tempo-text dark:text-white">
          {formatTime(timer.remainingTime)}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-[10px] font-mono text-tempo-muted dark:text-tempo-darkmuted uppercase">
          {timer.type}
        </span>
        <TimerControls timer={timer} size="card" />
      </div>
    </div>
  );
}
