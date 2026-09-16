import { Maximize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

export default function ActiveTimer({ timer }) {
  const navigate = useNavigate();

  return (
    <section className="bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden transition-ui">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* live indicator: pulses only while the timer runs */}
          <span
            className={`w-2 h-2 rounded-full ${
              timer.status === "running"
                ? "bg-emerald-500 animate-pulse"
                : "bg-tempo-border dark:bg-tempo-darkborder"
            }`}
          ></span>
          <span className="text-xs font-mono font-bold tracking-wider text-tempo-muted dark:text-tempo-darkmuted uppercase">
            {timer.status === "running" ? "Running" : "Active Timer"}
          </span>
        </div>
        <button
          onClick={() => navigate(`/focus/${timer.id}`)}
          title="Focus Mode [F]"
          aria-label="Open focus mode"
          className="min-w-[44px] min-h-[44px] p-3.5 -m-1 rounded-full hover:bg-tempo-subtle dark:hover:bg-tempo-darksubtle text-tempo-muted dark:text-tempo-darkmuted hover:text-tempo-text transition-ui"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center text-center py-4">
        <div className="text-base font-semibold text-tempo-text dark:text-white mb-2">
          {timer.name}
        </div>

        <TimerDisplay timer={timer} size="hero" />

        <div className="flex items-center gap-2 text-xs text-tempo-muted dark:text-tempo-darkmuted mt-1 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{timer.category}</span>
          <span>•</span>
          <span>{Math.round(timer.duration / 60)} min session</span>
        </div>

        <div className="mt-8">
          <TimerControls timer={timer} />
        </div>
      </div>
    </section>
  );
}
