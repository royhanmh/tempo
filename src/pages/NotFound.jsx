import { Link } from "react-router-dom";
import { TimerOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-tempo-bg dark:bg-tempo-darkbg text-tempo-text dark:text-gray-100 flex items-center justify-center px-4 transition-colors">
      <div className="text-center max-w-sm w-full">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder flex items-center justify-center shadow-sm mb-6">
          <TimerOff className="w-7 h-7 text-tempo-muted dark:text-tempo-darkmuted" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          Page not found
        </h1>
        <p className="text-sm text-tempo-muted dark:text-tempo-darkmuted mb-8">
          This page doesn't exist or was moved. Your timers are safe and
          running.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center min-h-11 px-6 py-2 rounded-xl text-sm font-medium bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg shadow-sm transition-ui hover:opacity-90"
        >
          Back to Timers
        </Link>
      </div>
    </div>
  );
}
