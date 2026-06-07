import { cn } from "@/lib/utils";

const baseInput =
  "h-11 rounded-lg border bg-white text-ink placeholder:text-ink-soft/60";
const baseTextarea =
  "min-h-24 rounded-lg border bg-white text-ink placeholder:text-ink-soft/60";

export const fieldInputClass = cn(baseInput, "border-ink/15");
export const fieldTextareaClass = cn(baseTextarea, "border-ink/15");

/** Input className that turns red when there's a validation error. */
export function inputClass(error?: string) {
  return cn(
    baseInput,
    error ? "border-red-400 focus-visible:border-red-400" : "border-ink/15",
  );
}

export function textareaClass(error?: string) {
  return cn(
    baseTextarea,
    error ? "border-red-400 focus-visible:border-red-400" : "border-ink/15",
  );
}

export function Field({
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-[15px] font-medium text-ink">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-500">{error}</p>
      ) : hint ? (
        <p className="text-xs text-ink-soft">{hint}</p>
      ) : null}
    </div>
  );
}
