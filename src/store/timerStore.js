import { create } from "zustand";
import { persist } from "zustand/middleware";
import { playAudioSound } from "../utils/sound";

export const DEFAULT_TEMPLATES = [
  {
    id: "tpl-1",
    name: "Deep Work",
    duration: 5400,
    type: "countdown",
    icon: "laptop",
    category: "Focus",
    accent: "green",
  },
  {
    id: "tpl-2",
    name: "Study Session",
    duration: 2700,
    type: "countdown",
    icon: "book-open",
    category: "Study",
    accent: "green",
  },
  {
    id: "tpl-3",
    name: "Gym Rest",
    duration: 120,
    type: "countdown",
    icon: "dumbbell",
    category: "Fitness",
    accent: "orange",
  },
  {
    id: "tpl-4",
    name: "Power Nap",
    duration: 1200,
    type: "countdown",
    icon: "moon",
    category: "Rest",
    accent: "blue",
  },
  {
    id: "tpl-5",
    name: "Cooking Pasta",
    duration: 480,
    type: "countdown",
    icon: "utensils",
    category: "Cooking",
    accent: "red",
  },
  {
    id: "tpl-6",
    name: "Gaming Session",
    duration: 5400,
    type: "stopwatch",
    icon: "gamepad-2",
    category: "Gaming",
    accent: "purple",
  },
];

const INITIAL_TIMERS = [
  {
    id: "timer-1",
    name: "Deep Work",
    icon: "laptop",
    type: "countdown",
    status: "idle",
    duration: 3134,
    remainingTime: 3134,
    endTime: null,
    startTime: null,
    accumulatedTime: 0,
    category: "Focus",
    accent: "green",
    createdAt: new Date().toISOString(),
  },
];

export const useTimerStore = create(
  persist(
    (set, get) => ({
      timers: INITIAL_TIMERS,
      activeTimerId: "timer-1",
      templates: DEFAULT_TEMPLATES,
      history: [],
      theme: "light",
      soundProfile: "bell",

      setTheme: (theme) => set({ theme }),
      setSoundProfile: (soundProfile) => set({ soundProfile }),
      setActiveTimerId: (id) => set({ activeTimerId: id }),

      createTimer: (data) => {
        const id = "timer-" + Date.now();
        const created = {
          id,
          name: data.name || "Untitled Timer",
          icon: data.icon || "timer",
          type: data.type,
          status: "idle",
          duration: data.type === "countdown" ? data.duration : 0,
          remainingTime: data.type === "countdown" ? data.duration : 0,
          endTime: null,
          startTime: null,
          accumulatedTime: 0,
          category: data.category || "Focus",
          accent: data.accent || "green",
          createdAt: new Date().toISOString(),
        };
        set((s) => ({ timers: [created, ...s.timers], activeTimerId: id }));
        return created;
      },

      createFromTemplate: (tpl) =>
        get().createTimer({
          name: tpl.name,
          duration: tpl.duration,
          type: tpl.type,
          icon: tpl.icon,
          category: tpl.category,
          accent: tpl.accent,
        }),

      removeTimer: (id) =>
        set((s) => {
          const filtered = s.timers.filter((t) => t.id !== id);
          return {
            timers: filtered,
            activeTimerId:
              s.activeTimerId === id
                ? (filtered[0]?.id ?? null)
                : s.activeTimerId,
          };
        }),

      startTimer: (id) => {
        playAudioSound("tick");
        const now = Date.now();
        set((s) => ({
          timers: s.timers.map((t) => {
            if (t.id !== id) return t;
            if (t.type === "countdown") {
              const remaining =
                t.status === "completed" || t.remainingTime <= 0
                  ? t.duration
                  : t.remainingTime;
              return {
                ...t,
                status: "running",
                remainingTime: remaining,
                endTime: now + remaining * 1000,
                startTime: now,
              };
            }
            return { ...t, status: "running", startTime: now };
          }),
        }));
      },

      pauseTimer: (id) => {
        playAudioSound("tick");
        const now = Date.now();
        set((s) => ({
          timers: s.timers.map((t) => {
            if (t.id !== id) return t;
            if (t.type === "countdown") {
              const remaining = t.endTime
                ? Math.max(0, Math.ceil((t.endTime - now) / 1000))
                : t.remainingTime;
              return {
                ...t,
                status: "paused",
                remainingTime: remaining,
                endTime: null,
              };
            }
            const newlyElapsed = t.startTime ? now - t.startTime : 0;
            return {
              ...t,
              status: "paused",
              accumulatedTime: (t.accumulatedTime || 0) + newlyElapsed,
              startTime: null,
            };
          }),
        }));
      },

      resetTimer: (id) => {
        playAudioSound("tick");
        set((s) => ({
          timers: s.timers.map((t) =>
            t.id !== id
              ? t
              : {
                  ...t,
                  status: "idle",
                  remainingTime: t.type === "countdown" ? t.duration : 0,
                  endTime: null,
                  startTime: null,
                  accumulatedTime: 0,
                },
          ),
        }));
      },

      // Called by engine tick when a countdown finishes
      completeTimer: (id) => {
        const t = get().timers.find((x) => x.id === id);
        if (!t) return;
        set((s) => ({
          timers: s.timers.map((x) =>
            x.id === id
              ? { ...x, status: "completed", remainingTime: 0, endTime: null }
              : x,
          ),
          history: [
            {
              id: "h-" + Date.now(),
              name: t.name,
              duration: t.duration,
              completedAt: new Date().toISOString(),
              icon: t.icon,
              category: t.category,
            },
            ...s.history,
          ],
        }));
      },

      clearHistory: () => set({ history: [] }),
    }),
    { name: "tempo-timers" },
  ),
);
