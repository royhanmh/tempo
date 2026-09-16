import { useMemo, useRef, useState, useEffect } from "react";
import {
  Search,
  Plus,
  Timer as TimerIcon,
  LayoutGrid,
  History,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { useTimerStore } from "../store/timerStore";
import { playAudioSound } from "../utils/sound";
import { formatTime, formatTimestamp } from "../utils/time";
import ActiveTimer from "../components/timer/ActiveTimer";
import TimerCard from "../components/timer/TimerCard";
import CreateTimerModal from "../components/timer/CreateTimerModal";
import { THEMES } from "../utils/themes";

const NAV = [
  { id: "timers", label: "Timers", icon: TimerIcon },
  { id: "templates", label: "Templates", icon: LayoutGrid },
  { id: "history", label: "History", icon: History },
  { id: "settings", label: "Settings", icon: Settings },
];

const SOUND_PROFILES = [
  { id: "bell", label: "Nordic Bell" },
  { id: "digital", label: "Digital Beep" },
  { id: "chime", label: "Glass Chime" },
  { id: "woodblock", label: "Woodblock" },
  { id: "marimba", label: "Marimba" },
  { id: "siren", label: "Alarm Siren" },
  { id: "mute", label: "Mute" },
];

export default function Home() {
  const {
    timers,
    activeTimerId,
    templates,
    createFromTemplate,
    history,
    clearHistory,
    theme,
    setTheme,
    soundProfile,
    setSoundProfile,
  } = useTimerStore();

  const [activeNav, setActiveNav] = useState("timers");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const searchInputRef = useRef(null);

  const handleSoundSelect = (snd) => {
    setSoundProfile(snd.id);
    if (snd.id !== "mute") playAudioSound("completion", snd.id);
  };

  const activeTimer = useMemo(
    () => timers.find((t) => t.id === activeTimerId) || timers[0] || null,
    [timers, activeTimerId],
  );

  const filteredTimers = useMemo(
    () =>
      timers.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [timers, searchQuery],
  );

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const open = () => setIsCreateOpen(true);
    window.addEventListener("tempo:new-timer", open);
    return () => window.removeEventListener("tempo:new-timer", open);
  }, []);

  return (
    <div className="min-h-screen bg-tempo-bg dark:bg-tempo-darkbg text-tempo-text dark:text-gray-100 flex flex-col md:flex-row font-sans transition-colors">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg px-4 py-2.5 rounded-2xl shadow-lg text-xs font-medium font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toast}</span>
        </div>
      )}

      <aside className="hidden md:flex md:w-56 border-r border-tempo-border dark:border-tempo-darkborder bg-tempo-card dark:bg-tempo-darkcard flex-col justify-between p-6 shrink-0 sticky top-0 h-screen">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-tempo-text dark:bg-white text-tempo-bg dark:text-tempo-darkbg font-bold text-sm flex items-center justify-center font-mono">
              t
            </div>
            <span className="text-xl font-bold tracking-tight">tempo</span>
          </div>

          <nav className="space-y-1.5">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-ui ${
                  activeNav === item.id
                    ? "bg-tempo-subtle dark:bg-tempo-darksubtle text-tempo-text dark:text-white font-semibold"
                    : "text-tempo-muted dark:text-tempo-darkmuted hover:bg-tempo-subtle/50 dark:hover:bg-tempo-darksubtle/50 hover:text-tempo-text dark:hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-6 sm:py-8 space-y-8 pb-24 md:pb-8">
        <header className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                What are you timing?
              </h1>
              <p className="text-sm text-tempo-muted dark:text-tempo-darkmuted mt-0.5">
                Focus on what matters.
              </p>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 shrink-0 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg font-semibold text-xs shadow-sm hover:opacity-90 transition-ui"
            >
              <Plus className="w-4 h-4" />
              <span>New Timer</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-tempo-muted dark:text-tempo-darkmuted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search timers..."
              aria-label="Search timers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2.5 text-xs rounded-full bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder focus:outline-none focus:ring-2 focus:ring-tempo-text dark:focus:ring-white transition-ui"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-tempo-muted dark:text-tempo-darkmuted px-1 rounded bg-tempo-subtle dark:bg-tempo-darksubtle">
              /
            </span>
          </div>
        </header>

        {activeNav === "timers" && (
          <div className="space-y-8">
            {activeTimer ? (
              <>
                <ActiveTimer timer={activeTimer} />

                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold tracking-tight">
                      Your Timers
                    </h2>
                    <span className="text-xs font-mono text-tempo-muted dark:text-tempo-darkmuted">
                      {filteredTimers.length} total
                    </span>
                  </div>

                  {filteredTimers.length === 0 ? (
                    <div className="p-12 text-center rounded-3xl border border-dashed border-tempo-border dark:border-tempo-darkborder bg-tempo-card dark:bg-tempo-darkcard">
                      <p className="text-sm text-tempo-muted dark:text-tempo-darkmuted">
                        No timers match your search.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredTimers.map((timer) => (
                        <TimerCard key={timer.id} timer={timer} />
                      ))}
                    </div>
                  )}
                </section>
              </>
            ) : (
              <div className="p-12 sm:p-16 text-center rounded-3xl border border-dashed border-tempo-border dark:border-tempo-darkborder bg-tempo-card dark:bg-tempo-darkcard">
                <p className="text-sm font-semibold text-tempo-text dark:text-white">
                  No timers yet
                </p>
                <p className="text-sm text-tempo-muted dark:text-tempo-darkmuted mt-1">
                  Create your first timer to start tracking.
                </p>
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg font-semibold text-xs shadow-sm hover:opacity-90 transition-ui"
                >
                  <Plus className="w-4 h-4" />
                  Create Timer
                </button>
              </div>
            )}
          </div>
        )}

        {activeNav === "templates" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Preset Templates
              </h2>
              <p className="text-xs text-tempo-muted dark:text-tempo-darkmuted mt-1">
                Quickly instantiate ready-to-go timed sessions.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  className="p-5 rounded-2xl bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder flex items-center justify-between hover:border-tempo-muted transition-ui shadow-sm"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{tpl.name}</h4>
                    <span className="text-xs font-mono text-tempo-muted dark:text-tempo-darkmuted">
                      {formatTime(tpl.duration)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      createFromTemplate(tpl);
                      setActiveNav("timers");
                      triggerToast(`Created "${tpl.name}"`);
                    }}
                    className="px-5 py-2.5 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg text-xs font-semibold hover:opacity-90 transition-ui"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeNav === "history" && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">
                  Session History
                </h2>
                <p className="text-xs text-tempo-muted dark:text-tempo-darkmuted mt-1">
                  Logged records of completed sessions.
                </p>
              </div>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-xs font-mono text-tempo-muted dark:text-tempo-darkmuted hover:text-red-500"
                >
                  Clear Log
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-dashed border-tempo-border dark:border-tempo-darkborder bg-tempo-card dark:bg-tempo-darkcard">
                <p className="text-sm text-tempo-muted dark:text-tempo-darkmuted">
                  No completed sessions logged yet.
                </p>
              </div>
            ) : (
              <div className="bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder rounded-2xl divide-y divide-tempo-border dark:divide-tempo-darkborder shadow-sm">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="font-semibold text-tempo-text dark:text-white">
                        {item.name}
                      </span>
                      <span className="text-tempo-muted dark:text-tempo-darkmuted">
                        ({item.category})
                      </span>
                    </div>
                    <div className="flex items-center gap-4 font-mono text-tempo-muted dark:text-tempo-darkmuted">
                      <span>{formatTime(item.duration)}</span>
                      <span>{formatTimestamp(item.completedAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeNav === "settings" && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                Appearance & Preferences
              </h2>
              <p className="text-xs text-tempo-muted dark:text-tempo-darkmuted mt-1">
                Tailor the visual theme and audio feedback.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder space-y-4 shadow-sm">
              <h3 id="app-theme-label" className="text-sm font-semibold">
                Theme
              </h3>
              <div
                role="radiogroup"
                aria-labelledby="app-theme-label"
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {THEMES.map((th) => (
                  <label key={th.id}>
                    <input
                      type="radio"
                      name="app-theme"
                      value={th.id}
                      checked={theme === th.id}
                      onChange={() => setTheme(th.id)}
                      className="sr-only peer"
                    />
                    <span
                      className={`flex flex-col gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-ui peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-tempo-text dark:peer-focus-visible:ring-white dark:peer-focus-visible:ring-offset-tempo-darkbg ${
                        theme === th.id
                          ? "border-transparent ring-2 ring-tempo-text dark:ring-white bg-tempo-subtle dark:bg-tempo-darksubtle"
                          : "border-tempo-border dark:border-tempo-darkborder hover:border-tempo-muted dark:hover:border-tempo-darkmuted"
                      }`}
                    >
                      <span className="flex h-10 rounded-lg overflow-hidden border border-black/10">
                        <span
                          style={{ background: th.swatch.bg }}
                          className="flex-1"
                        />
                        <span
                          style={{ background: th.swatch.card }}
                          className="flex-1"
                        />
                        <span
                          style={{ background: th.swatch.text }}
                          className="flex-1"
                        />
                      </span>
                      <span
                        className={`text-xs ${
                          theme === th.id
                            ? "font-semibold text-tempo-text dark:text-white"
                            : "font-medium text-tempo-muted dark:text-tempo-darkmuted"
                        }`}
                      >
                        {th.label}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder space-y-4 shadow-sm">
              <h3 id="sound-profile-label" className="text-sm font-semibold">
                Sound Profile
              </h3>
              <div
                role="radiogroup"
                aria-labelledby="sound-profile-label"
                className="flex flex-wrap gap-3"
              >
                {SOUND_PROFILES.map((snd) => (
                  <label key={snd.id}>
                    <input
                      type="radio"
                      name="sound-profile"
                      value={snd.id}
                      checked={soundProfile === snd.id}
                      onChange={() => handleSoundSelect(snd)}
                      className="sr-only peer"
                    />
                    <span
                      className={`flex items-center justify-center min-h-11 px-4 py-2 rounded-xl text-xs font-medium border cursor-pointer select-none transition-ui peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-tempo-text dark:peer-focus-visible:ring-white dark:peer-focus-visible:ring-offset-tempo-darkbg ${
                        soundProfile === snd.id
                          ? "bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg border-transparent"
                          : "bg-tempo-subtle dark:bg-tempo-darksubtle border-tempo-border dark:border-tempo-darkborder text-tempo-muted dark:text-tempo-darkmuted hover:text-tempo-text dark:hover:text-white"
                      }`}
                    >
                      {snd.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-tempo-card dark:bg-tempo-darkcard border-t border-tempo-border dark:border-tempo-darkborder flex items-center justify-around py-2 z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {NAV.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveNav(item.id)}
            aria-label={item.label}
            className={`flex flex-col items-center justify-center gap-1 min-w-16 min-h-12 transition-ui ${
              activeNav === item.id
                ? "text-tempo-text dark:text-white font-bold"
                : "text-tempo-muted dark:text-tempo-darkmuted"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {isCreateOpen && (
        <CreateTimerModal onClose={() => setIsCreateOpen(false)} />
      )}
    </div>
  );
}
