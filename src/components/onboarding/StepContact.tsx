import { Input } from "@/components/ui/input";
import { Field, inputClass } from "./Field";
import type { BusinessData } from "./types";

interface StepContactProps {
  data: BusinessData;
  errors: Record<string, string>;
  onChange: (field: keyof BusinessData, value: string) => void;
}

export default function StepContact({
  data,
  errors,
  onChange,
}: StepContactProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-ink">Contact Details</h3>

      <Field
        label="Business Address or Yardcode"
        required
        error={errors.businessAddress}
      >
        <Input
          value={data.businessAddress}
          onChange={(e) => onChange("businessAddress", e.target.value)}
          placeholder="enter your business address"
          aria-invalid={!!errors.businessAddress}
          className={inputClass(errors.businessAddress)}
        />
      </Field>

      <Field
        label="Business Phone number"
        required
        error={errors.businessPhone}
      >
        <Input
          value={data.businessPhone}
          onChange={(e) => onChange("businessPhone", e.target.value)}
          placeholder="enter your phone number"
          aria-invalid={!!errors.businessPhone}
          className={inputClass(errors.businessPhone)}
        />
      </Field>

      <Field
        label="Business Email"
        required
        error={errors.businessEmailAddress}
      >
        <Input
          type="email"
          value={data.businessEmailAddress}
          onChange={(e) => onChange("businessEmailAddress", e.target.value)}
          placeholder="enter your business email"
          aria-invalid={!!errors.businessEmailAddress}
          className={inputClass(errors.businessEmailAddress)}
        />
      </Field>

      <Field label="Business Website" error={errors.businessWebsite}>
        <Input
          value={data.businessWebsite}
          onChange={(e) => onChange("businessWebsite", e.target.value)}
          placeholder="https://your-website.com"
          aria-invalid={!!errors.businessWebsite}
          className={inputClass(errors.businessWebsite)}
        />
      </Field>
    </div>
  );
}
