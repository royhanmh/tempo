import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { formatTime, calculateProgress } from "../utils/time";
import TimerControls from "../components/timer/TimerControls";

export default function Focus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const timers = useTimerStore((s) => s.timers);
  const timer = timers.find((t) => t.id === id) || timers[0];

  useEffect(() => {
    document.title = timer ? `${timer.name} · Tempo` : "Tempo";
    return () => {
      document.title = "Tempo — Personal Timer Workspace";
    };
  }, [timer]);

  if (!timer) {
    return (
      <div className="min-h-screen bg-tempo-bg dark:bg-tempo-darkbg flex items-center justify-center">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-full bg-tempo-card border border-tempo-border text-sm"
        >
          No timer found — go back
        </button>
      </div>
    );
  }

  const progress = calculateProgress(timer);
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-tempo-bg dark:bg-tempo-darkbg text-tempo-text dark:text-gray-100 flex flex-col justify-between p-6 sm:p-12 transition-colors">
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder text-sm font-medium hover:bg-tempo-subtle dark:hover:bg-tempo-darksubtle shadow-sm transition-ui"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Focus Mode</span>
        </button>

        <span className="text-xs font-mono uppercase tracking-widest text-tempo-muted dark:text-tempo-darkmuted px-3 py-1 bg-tempo-subtle dark:bg-tempo-darksubtle rounded-full">
          Distraction Free
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center my-8 text-center">
        <div className="relative flex items-center justify-center my-6 w-full max-w-[20rem] sm:max-w-[24rem] aspect-square">
          <svg
            className="w-full h-full"
            role="img"
            aria-label={`${Math.round(progress)}% remaining`}
          >
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-tempo-subtle dark:stroke-tempo-darksubtle"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-tempo-text dark:stroke-gray-100 progress-ring-circle"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <span className="text-sm font-semibold tracking-wide uppercase text-tempo-muted dark:text-tempo-darkmuted mb-2">
              {timer.name}
            </span>
            {/* smaller step for HH:MM:SS so 8 digits never overflow the ring */}
            <h1
              className={`font-mono-num font-bold tracking-tight my-1 text-tempo-text dark:text-white ${
                formatTime(timer.remainingTime).length > 5
                  ? "text-[clamp(1.75rem,6.5vw,3rem)]"
                  : "text-[clamp(2.75rem,10vw,4.5rem)]"
              }`}
            >
              {formatTime(timer.remainingTime)}
            </h1>
            <span className="text-xs font-mono text-tempo-muted dark:text-tempo-darkmuted uppercase tracking-wider mt-2">
              {timer.type === "countdown"
                ? `${Math.round(100 - progress)}% elapsed`
                : "Stopwatch"}
            </span>
          </div>
        </div>

        <TimerControls timer={timer} size="focus" />
      </div>

      <div className="text-center text-xs text-tempo-muted dark:text-tempo-darkmuted font-mono">
        [SPACE] START/PAUSE &nbsp;•&nbsp; [R] RESET &nbsp;•&nbsp; [F] EXIT FOCUS
      </div>
    </div>
  );
}
