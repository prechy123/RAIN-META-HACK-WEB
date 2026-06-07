import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import clipboard from "@/libs/utils/clipboard";

const WHATS_NEXT = [
  "Share this number with your customers",
  "AI will handle incoming automatically",
  "You can take over any conversation when needed",
  "Monitor all conversations from dashboard",
];

export default function SetUpComplete({
  phoneNumber,
  onGoToDashboard,
}: {
  phoneNumber: string;
  onGoToDashboard: () => void;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="rounded-3xl bg-white p-8 shadow-[0_20px_60px_-30px_rgba(30,34,41,0.45)]">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
            <Check className="size-8 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-ink">Set Up Complete</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Your AlatChat AI account is ready. Here&apos;s your dedicated
            business phone number
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-brand/30 bg-brand-soft/40 p-6 text-center">
          <p className="text-ink-soft">Your assigned phone number</p>
          <p className="mt-1 text-3xl font-bold text-ink">
            {phoneNumber || "—"}
          </p>
          <Button
            type="button"
            onClick={() => phoneNumber && clipboard(phoneNumber)}
            className="mt-4 rounded-lg bg-brand px-10 font-semibold text-ink hover:bg-brand-hover"
          >
            Copy
          </Button>
        </div>

        <div className="mt-6 rounded-2xl border border-ink/10 p-5">
          <p className="font-semibold text-ink">What&apos;s next?</p>
          <ul className="mt-3 space-y-2.5">
            {WHATS_NEXT.map((item) => (
              <li key={item} className="flex items-center gap-3 text-ink-soft">
                <Circle className="size-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          type="button"
          onClick={onGoToDashboard}
          className="mt-6 h-12 w-full rounded-xl bg-brand text-base font-semibold text-ink hover:bg-brand-hover"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
