import { useState } from "react";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import {
  Laptop,
  BookOpen,
  Dumbbell,
  Utensils,
  Gamepad2,
  Coffee,
  Timer,
  ChevronDown,
  Check,
} from "lucide-react";
import { useTimerStore } from "../../store/timerStore";

const ICONS = [
  { id: "laptop", el: <Laptop className="w-4 h-4" /> },
  { id: "book-open", el: <BookOpen className="w-4 h-4" /> },
  { id: "dumbbell", el: <Dumbbell className="w-4 h-4" /> },
  { id: "utensils", el: <Utensils className="w-4 h-4" /> },
  { id: "gamepad-2", el: <Gamepad2 className="w-4 h-4" /> },
  { id: "coffee", el: <Coffee className="w-4 h-4" /> },
  { id: "timer", el: <Timer className="w-4 h-4" /> },
];

const ACCENT_OPTIONS = [
  { value: "green", label: "Emerald Green", color: "bg-emerald-500" },
  { value: "orange", label: "Warm Orange", color: "bg-orange-500" },
  { value: "red", label: "Coral Red", color: "bg-red-500" },
  { value: "purple", label: "Soft Purple", color: "bg-purple-500" },
  { value: "blue", label: "Ocean Blue", color: "bg-blue-500" },
];

function ColorSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = ACCENT_OPTIONS.find((o) => o.value === value);

  return (
    <div className="relative">
      {open && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full px-3 py-2 rounded-xl bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder text-xs text-tempo-text dark:text-white focus:outline-none flex items-center justify-between gap-2 transition-ui hover:border-tempo-muted/50"
      >
        <span className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full shrink-0 ${selected.color}`} />
          {selected.label}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-50 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Color Accent"
          className="absolute z-20 mt-1 w-full rounded-xl bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder shadow-lg py-1 overflow-hidden"
        >
          {ACCENT_OPTIONS.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition-ui ${
                  o.value === value
                    ? "font-semibold text-tempo-text dark:text-white bg-tempo-subtle dark:bg-tempo-darksubtle"
                    : "text-tempo-text dark:text-white hover:bg-tempo-subtle dark:hover:bg-tempo-darksubtle"
                }`}
              >
                <span className={`w-3 h-3 rounded-full shrink-0 ${o.color}`} />
                <span className="flex-1">{o.label}</span>
                {o.value === value && <Check className="w-3.5 h-3.5 opacity-60" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CreateTimerModal({ onClose }) {
  const createTimer = useTimerStore((s) => s.createTimer);
  const [name, setName] = useState("");
  const [type, setType] = useState("countdown");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("30");
  const [seconds, setSeconds] = useState("");
  const [icon, setIcon] = useState("laptop");
  const [category, setCategory] = useState("Focus");
  const [accent, setAccent] = useState("green");

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSecs =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0);
    if (type === "countdown" && totalSecs <= 0) return;
    createTimer({
      name:
        name.trim() ||
        (type === "countdown"
          ? `${parseInt(minutes) || 0}m Session`
          : "Stopwatch"),
      type,
      duration: totalSecs,
      icon,
      category,
      accent,
    });
    onClose();
  };

  return (
    <Modal title="Create New Timer" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <Input
          label="Name"
          type="text"
          placeholder="e.g. Morning Workout, Deep Work..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <div>
          <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5">
            Type
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-tempo-subtle dark:bg-tempo-darksubtle rounded-xl border border-tempo-border dark:border-tempo-darkborder">
            {["countdown", "stopwatch"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2 rounded-lg font-semibold capitalize transition-ui ${
                  type === t
                    ? "bg-white dark:bg-tempo-darkcard text-tempo-text dark:text-white shadow-sm"
                    : "text-tempo-muted dark:text-tempo-darkmuted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {type === "countdown" && (
          <div>
            <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5">
              Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "hr", value: hours, set: setHours, max: 23 },
                { label: "min", value: minutes, set: setMinutes, max: 59 },
                { label: "sec", value: seconds, set: setSeconds, max: 59 },
              ].map((f) => (
                <div
                  key={f.label}
                  className="bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder rounded-xl p-2 text-center"
                >
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max={f.max}
                    placeholder="0"
                    value={f.value}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, String(f.max).length);
                      f.set(v);
                    }}
                    aria-label={`Duration ${f.label}`}
                    className="w-full bg-transparent text-center font-mono-num font-bold text-base focus:outline-none text-tempo-text dark:text-white appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] [-moz-appearance:textfield]"
                  />
                  <span className="text-[10px] text-tempo-muted dark:text-tempo-darkmuted block uppercase">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5">
            Icon
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {ICONS.map((ic) => (
              <button
                key={ic.id}
                type="button"
                onClick={() => setIcon(ic.id)}
                aria-label={`Icon ${ic.id}`}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-ui ${
                  icon === ic.id
                    ? "bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg border-transparent"
                    : "bg-tempo-subtle dark:bg-tempo-darksubtle border-tempo-border dark:border-tempo-darkborder text-tempo-muted dark:text-tempo-darkmuted"
                }`}
              >
                {ic.el}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder text-xs text-tempo-text dark:text-white focus:outline-none"
            >
              {["Focus", "Study", "Fitness", "Cooking", "Gaming", "Rest"].map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </select>
          </div>
          <div>
            <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5">
              Color Accent
            </label>
            <ColorSelect value={accent} onChange={setAccent} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-tempo-border dark:border-tempo-darkborder">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-tempo-border dark:border-tempo-darkborder text-tempo-muted dark:text-tempo-darkmuted font-semibold hover:text-tempo-text dark:hover:text-white transition-ui"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-tempo-text text-tempo-bg dark:bg-white dark:text-tempo-darkbg font-semibold hover:opacity-90 transition-ui"
          >
            Create Timer
          </button>
        </div>
      </form>
    </Modal>
  );
}
