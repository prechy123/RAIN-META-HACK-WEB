import {
  Store,
  MapPin,
  Clock,
  MessageCircleQuestion,
  Boxes,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const SIDEBAR_STEPS = [
  { id: 1, label: "Basic Business info", icon: Store },
  { id: 2, label: "Contact details", icon: MapPin },
  { id: 3, label: "Business Hours", icon: Clock },
  { id: 4, label: "FAQ", icon: MessageCircleQuestion },
  { id: 5, label: "Products & Services", icon: Boxes },
  { id: 6, label: "Review and submit", icon: Send },
] as const;

export default function OnboardingSidebar({
  currentStep,
}: {
  currentStep: number;
}) {
  return (
    <div className="flex flex-col">
      {SIDEBAR_STEPS.map((step, i) => {
        const Icon = step.icon;
        const completed = step.id < currentStep;
        const active = step.id === currentStep;
        const isLast = i === SIDEBAR_STEPS.length - 1;

        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  completed && "border-brand bg-brand text-white",
                  active && "border-brand bg-white text-brand-ink",
                  !completed && !active && "border-ink/15 bg-white text-ink-soft",
                )}
              >
                <Icon className="size-5" />
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "my-1 w-0.5 flex-1",
                    completed ? "bg-brand" : "bg-ink/10",
                  )}
                  style={{ minHeight: 32 }}
                />
              )}
            </div>
            <div
              className={cn(
                "pt-2.5 text-[15px]",
                active || completed
                  ? "font-semibold text-ink"
                  : "text-ink-soft",
              )}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
