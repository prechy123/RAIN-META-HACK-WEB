import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, inputClass, textareaClass } from "./Field";
import type { BusinessData } from "./types";

interface StepBasicInfoProps {
  data: BusinessData;
  errors: Record<string, string>;
  onChange: (field: keyof BusinessData, value: string) => void;
  onAutoFill: () => void;
}

export default function StepBasicInfo({
  data,
  errors,
  onChange,
  onAutoFill,
}: StepBasicInfoProps) {
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onAutoFill}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand/50 bg-brand-soft/60 py-3.5 font-semibold text-ink transition-colors hover:bg-brand-soft"
      >
        <Sparkles className="size-5 text-brand-ink" />
        AUTO FILL WITH AI
      </button>
      <p className="text-center text-sm text-ink-soft">
        Let AI extract your business information from various sources.
      </p>

      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-ink/10" />
        <span className="text-sm font-medium text-ink-soft">Or</span>
        <span className="h-px flex-1 bg-ink/10" />
      </div>

      <h3 className="text-lg font-bold text-ink">Basic Business Info</h3>

      <Field label="Business Name" required error={errors.businessName}>
        <Input
          value={data.businessName}
          onChange={(e) => onChange("businessName", e.target.value)}
          placeholder="enter your business name"
          aria-invalid={!!errors.businessName}
          className={inputClass(errors.businessName)}
        />
      </Field>

      <Field
        label="Business description"
        required
        error={errors.businessDescription}
      >
        <Textarea
          value={data.businessDescription}
          onChange={(e) => onChange("businessDescription", e.target.value)}
          placeholder="Tell us a bit about what you do"
          aria-invalid={!!errors.businessDescription}
          className={textareaClass(errors.businessDescription)}
        />
      </Field>

      <Field label="Business Category" error={errors.businessCategory}>
        <Input
          value={data.businessCategory}
          onChange={(e) => onChange("businessCategory", e.target.value)}
          placeholder="e.g. Beauty & Skincare"
          className={inputClass(errors.businessCategory)}
        />
      </Field>

      <Field
        label="Extra Information"
        error={errors.extra_information}
        hint="Anything else the AI should know about your business."
      >
        <Textarea
          value={data.extra_information}
          onChange={(e) => onChange("extra_information", e.target.value)}
          placeholder="e.g. We use locally sourced ingredients..."
          className={textareaClass(errors.extra_information)}
        />
      </Field>
    </div>
  );
}
