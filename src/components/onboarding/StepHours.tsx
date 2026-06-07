import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DAYS, TIME_OPTIONS, type Day, type HoursState } from "./types";

interface StepHoursProps {
  hours: HoursState;
  error?: string;
  onChange: (day: Day, patch: Partial<HoursState[Day]>) => void;
}

function TimeSelect({
  value,
  onValueChange,
  disabled,
}: {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="h-9 w-28 rounded-md border-ink/15 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {TIME_OPTIONS.map((t) => (
          <SelectItem key={t} value={t}>
            {t}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function StepHours({ hours, error, onChange }: StepHoursProps) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold text-ink">Open days and hours</h3>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <div className="space-y-3">
        {DAYS.map((day) => {
          const dh = hours[day];
          return (
            <div
              key={day}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <div className="flex w-40 items-center gap-3">
                <Switch
                  checked={dh.open}
                  onCheckedChange={(open) => onChange(day, { open })}
                  className="data-[state=checked]:bg-brand"
                />
                <span className="text-[15px] text-ink">{day}</span>
              </div>

              {dh.open ? (
                <div className="flex items-center gap-2">
                  <TimeSelect
                    value={dh.from}
                    onValueChange={(from) => onChange(day, { from })}
                  />
                  <span className="text-sm text-ink-soft">TO</span>
                  <TimeSelect
                    value={dh.to}
                    onValueChange={(to) => onChange(day, { to })}
                  />
                </div>
              ) : (
                <span className={cn("text-sm font-medium text-ink-soft")}>
                  Closed
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
