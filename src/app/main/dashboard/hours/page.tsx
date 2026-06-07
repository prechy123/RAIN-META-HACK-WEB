"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StepHours from "@/components/onboarding/StepHours";
import { useBusiness } from "@/providers/BusinessProvider";
import {
  parseHours,
  serializeOpenDays,
  serializeOpenHours,
  type Day,
  type HoursState,
} from "@/components/onboarding/types";

export default function HoursPage() {
  const { business, updateBusiness } = useBusiness();
  const [hours, setHours] = useState<HoursState>(() =>
    parseHours(business.businessOpenDays, business.businessOpenHours),
  );
  const [saving, setSaving] = useState(false);

  const handleChange = (day: Day, patch: Partial<HoursState[Day]>) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateBusiness(
      {
        businessOpenDays: serializeOpenDays(hours),
        businessOpenHours: serializeOpenHours(hours),
      },
      "Business hours updated",
    );
    setSaving(false);
  };

  return (
    <div className="px-1 sm:px-2">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        <StepHours hours={hours} onChange={handleChange} />
        <div className="mt-8 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="h-11 rounded-lg bg-brand px-8 font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
