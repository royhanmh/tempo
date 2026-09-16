import { Play, Pause, RotateCcw, Trash2 } from "lucide-react";
import { useTimerStore } from "../../store/timerStore";

export default function TimerControls({ timer, size = "hero" }) {
  const { startTimer, pauseTimer, resetTimer, removeTimer } = useTimerStore();
  const running = timer.status === "running";

  if (size === "card") {
    // 44px minimum touch target
    return (
      <div className="flex items-center justify-center min-w-[44px] min-h-[44px]">
        {running ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              pauseTimer(timer.id);
            }}
            aria-label={`Pause ${timer.name}`}
            className="w-9 h-9 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg flex items-center justify-center shadow-sm"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              startTimer(timer.id);
            }}
            aria-label={`Start ${timer.name}`}
            className="w-9 h-9 rounded-full bg-tempo-subtle dark:bg-tempo-darksubtle hover:bg-tempo-text hover:text-white dark:hover:bg-white dark:hover:text-tempo-text flex items-center justify-center transition-ui"
          >
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => resetTimer(timer.id)}
        title="Reset [R]"
        aria-label="Reset timer"
        className={
          size === "focus"
            ? "min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder flex items-center justify-center text-tempo-text dark:text-gray-200 hover:bg-tempo-subtle dark:hover:bg-tempo-darksubtle transition-ui shadow-sm"
            : "min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder flex items-center justify-center text-tempo-text dark:text-gray-200 hover:bg-tempo-border dark:hover:bg-tempo-darkborder transition-ui"
        }
      >
        <RotateCcw className="w-5 h-5" />
      </button>

      {running ? (
        <button
          onClick={() => pauseTimer(timer.id)}
          title="Pause [Space]"
          aria-label="Pause timer"
          className="min-w-[44px] min-h-[44px] w-16 h-16 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg flex items-center justify-center shadow-md hover:scale-105 transition-ui"
        >
          <Pause className="w-7 h-7 fill-current" />
        </button>
      ) : (
        <button
          onClick={() => startTimer(timer.id)}
          title="Start [Space]"
          aria-label="Start timer"
          className="min-w-[44px] min-h-[44px] w-16 h-16 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg flex items-center justify-center shadow-md hover:scale-105 transition-ui"
        >
          <Play className="w-7 h-7 fill-current ml-1" />
        </button>
      )}

      <button
        onClick={() => removeTimer(timer.id)}
        title="Delete"
        aria-label="Delete timer"
        className={
          size === "focus"
            ? "min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder flex items-center justify-center text-tempo-muted dark:text-tempo-darkmuted hover:text-red-500 hover:bg-tempo-subtle dark:hover:bg-tempo-darksubtle transition-ui shadow-sm"
            : "min-w-[44px] min-h-[44px] w-12 h-12 rounded-full bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder flex items-center justify-center text-tempo-muted dark:text-tempo-darkmuted hover:text-red-500 hover:bg-tempo-border dark:hover:bg-tempo-darkborder transition-ui"
        }
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
