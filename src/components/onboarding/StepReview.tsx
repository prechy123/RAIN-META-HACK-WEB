import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  MessageCircleQuestion,
  Boxes,
  Pencil,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { inputClass } from "./Field";
import type { BusinessData } from "./types";

interface StepReviewProps {
  data: BusinessData;
  emailError?: string;
  submitError?: string;
  onEdit: (step: number) => void;
  onEmailChange: (value: string) => void;
}

function ReviewCard({
  icon: Icon,
  title,
  step,
  onEdit,
  children,
}: {
  icon: React.ElementType;
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink/10 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="size-5 text-ink-soft" />
          <h4 className="font-semibold text-ink">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-sm font-medium text-brand-ink hover:underline"
        >
          <Pencil className="size-4" />
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="font-medium text-ink">{value || "—"}</p>
    </div>
  );
}

export default function StepReview({
  data,
  emailError,
  submitError,
  onEdit,
  onEmailChange,
}: StepReviewProps) {
  const emailTaken = /already registered/i.test(submitError ?? "");

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-ink">Review &amp; Submit</h3>
        <p className="text-sm text-ink-soft">
          Review your information before you submit
        </p>
      </div>

      {submitError && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-600">
          <p className="font-medium">{submitError}</p>
          {emailTaken && (
            <p className="mt-1 text-red-600/90">
              Change the email below, or{" "}
              <Link href="/main/signin" className="font-semibold underline">
                log in
              </Link>{" "}
              with this email instead.
            </p>
          )}
        </div>
      )}

      <div className="rounded-xl border border-ink/10 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Mail className="size-5 text-ink-soft" />
          <h4 className="font-semibold text-ink">Account email</h4>
        </div>
        <Input
          type="email"
          value={data.email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="enter your email"
          aria-invalid={!!emailError || emailTaken}
          className={inputClass(
            emailError || (emailTaken ? submitError : undefined),
          )}
        />
        {emailError && <p className="mt-1 text-xs text-red-500">{emailError}</p>}
      </div>

      <ReviewCard icon={Store} title="Business Information" step={1} onEdit={onEdit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Detail label="Business Name" value={data.businessName} />
          <Detail label="Category" value={data.businessCategory} />
        </div>
        <div className="mt-4">
          <Detail label="Description" value={data.businessDescription} />
        </div>
      </ReviewCard>

      <ReviewCard
        icon={MapPin}
        title="Contact Information"
        step={2}
        onEdit={onEdit}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Detail label="Address" value={data.businessAddress} />
          <Detail label="Phone number" value={data.businessPhone} />
          <Detail label="Email" value={data.businessEmailAddress} />
          <Detail label="Website" value={data.businessWebsite} />
        </div>
      </ReviewCard>

      <ReviewCard icon={Clock} title="Business Hours" step={3} onEdit={onEdit}>
        <div className="space-y-3">
          <Detail label="Open days" value={data.businessOpenDays} />
          <Detail label="Hours" value={data.businessOpenHours} />
        </div>
      </ReviewCard>

      <ReviewCard
        icon={MessageCircleQuestion}
        title="FAQ"
        step={4}
        onEdit={onEdit}
      >
        {data.faqs.length === 0 ? (
          <p className="text-sm text-ink-soft">No FAQs added</p>
        ) : (
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <div key={i}>
                <p className="font-medium text-ink">{faq.question}</p>
                <p className="text-sm text-ink-soft">{faq.answer}</p>
              </div>
            ))}
          </div>
        )}
      </ReviewCard>

      <ReviewCard
        icon={Boxes}
        title="Products & Services"
        step={5}
        onEdit={onEdit}
      >
        {data.items.length === 0 ? (
          <p className="text-sm text-ink-soft">No products added</p>
        ) : (
          <div className="space-y-3">
            {data.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{item.name}</p>
                  {item.description && (
                    <p className="text-sm text-ink-soft">{item.description}</p>
                  )}
                </div>
                <span className="shrink-0 font-medium text-brand-ink">
                  ₦{item.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </ReviewCard>
    </div>
  );
}
