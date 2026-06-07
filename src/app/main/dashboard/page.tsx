"use client";

import { useMemo } from "react";
import { Copy, MessageCircleQuestion, Boxes, Clock, Bot, MailWarning } from "lucide-react";
import { useBusiness } from "@/providers/BusinessProvider";
import { parseHours, DAYS } from "@/components/onboarding/types";
import clipboard from "@/libs/utils/clipboard";

function timeToMinutes(value: string): number | null {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  let hour = parseInt(match[1], 10) % 12;
  if (/pm/i.test(match[3])) hour += 12;
  return hour * 60 + parseInt(match[2], 10);
}

export default function DashboardOverview() {
  const { business } = useBusiness();

  const profileCompletion = useMemo(() => {
    const checks = [
      business.businessName,
      business.businessDescription,
      business.businessCategory,
      business.businessAddress,
      business.businessPhone,
      business.businessEmailAddress,
      business.businessWebsite,
      business.businessOpenHours,
      business.extra_information,
      business.faqs?.length ? "y" : "",
      business.items?.length ? "y" : "",
    ];
    const filled = checks.filter((c) => c && String(c).trim()).length;
    return Math.round((filled / checks.length) * 100);
  }, [business]);

  const todayHours = useMemo(() => {
    const hours = parseHours(business.businessOpenDays, business.businessOpenHours);
    const today = DAYS[new Date().getDay()];
    const dh = hours[today];
    if (!dh?.open) return { label: "Closed", status: "Closed today" };
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    const from = timeToMinutes(dh.from);
    const to = timeToMinutes(dh.to);
    const open = from !== null && to !== null && now >= from && now <= to;
    return {
      label: `${dh.from} - ${dh.to}`,
      status: open ? "Currently Open" : "Closed now",
    };
  }, [business]);

  return (
    <div className="space-y-6 px-1 sm:px-2">
      {/* WhatsApp number */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
        <span>Your whatsapp business number</span>
        <span className="font-semibold text-ink">
          {business.businessPhone || "—"}
        </span>
        {business.businessPhone && (
          <button
            type="button"
            onClick={() => clipboard(business.businessPhone)}
            aria-label="Copy number"
            className="text-ink-soft hover:text-ink"
          >
            <Copy className="size-4" />
          </button>
        )}
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold text-ink">Business Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Profile completion (tall) */}
          <div className="rounded-2xl border border-ink/10 bg-white p-5 lg:row-span-2">
            <p className="text-3xl font-bold text-ink">{profileCompletion}%</p>
            <p className="mt-1 font-medium text-ink">Profile Completion</p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-brand transition-all"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Complete your profile for better AI responses
            </p>
          </div>

          <StatCard
            icon={MessageCircleQuestion}
            value={`${business.faqs?.length ?? 0}`}
            unit="questions"
            title="Active FAQs"
            subtitle="Helping AI answer common queries"
          />
          <StatCard
            icon={Boxes}
            value={`${business.items?.length ?? 0}`}
            unit="items"
            title="Products and Services"
            subtitle="Available for customers to inquire about"
          />
          <StatCard
            icon={Clock}
            value={todayHours.label}
            title="Today's Business Hour"
            subtitle={todayHours.status}
          />
          <StatCard
            icon={Bot}
            value="0"
            unit="responses"
            title="AI Messages Handled"
            subtitle="Messages AI handled"
          />
          <StatCard
            icon={MailWarning}
            value="0"
            unit="Need attention"
            title="Pending messages"
            subtitle="require manual response from you"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-5">
          <p className="font-semibold text-ink">Pending messages</p>
          <div className="flex min-h-28 flex-col items-center justify-center text-center">
            <p className="text-ink-soft">No pending messages</p>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-5">
          <p className="font-semibold text-ink">AI suggestions</p>
          <div className="flex min-h-28 flex-col items-center justify-center text-center">
            <p className="text-ink-soft">No suggestions yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  unit,
  title,
  subtitle,
}: {
  icon: React.ElementType;
  value: string;
  unit?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5">
      <Icon className="size-5 text-brand-ink" />
      <p className="mt-2 text-xl font-bold text-ink">
        {value}{" "}
        {unit && <span className="text-sm font-normal text-ink-soft">{unit}</span>}
      </p>
      <p className="mt-1 font-medium text-ink">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>
    </div>
  );
}
