"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  invalid?: boolean;
}

export default function PasswordField({
  value,
  onChange,
  placeholder = "enter your Password",
  id,
  disabled,
  invalid,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          "h-12 rounded-xl border pr-11",
          invalid ? "border-red-400 focus-visible:border-red-400" : "border-ink/15",
        )}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft transition-colors hover:text-ink"
      >
        {show ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
      </button>
    </div>
  );
}
