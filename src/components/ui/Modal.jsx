import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-tempo-card dark:bg-tempo-darkcard border border-tempo-border dark:border-tempo-darkborder rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b border-tempo-border dark:border-tempo-darkborder pb-4">
          <h3 className="text-base font-bold text-tempo-text dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-11 h-11 rounded-full bg-tempo-subtle dark:bg-tempo-darksubtle flex items-center justify-center text-tempo-muted dark:text-tempo-darkmuted hover:text-tempo-text dark:hover:text-white transition-ui"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
