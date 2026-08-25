export default function Input({ label, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-tempo-muted dark:text-tempo-darkmuted font-medium mb-1.5 text-xs">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-xl bg-tempo-subtle dark:bg-tempo-darksubtle border border-tempo-border dark:border-tempo-darkborder text-sm text-tempo-text dark:text-white focus:outline-none focus:ring-2 focus:ring-tempo-text dark:focus:ring-white transition-ui ${className}`}
        {...props}
      />
    </div>
  );
}
