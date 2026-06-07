"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBusiness } from "@/providers/BusinessProvider";
import { showErrorToast } from "@/libs/utils/showToast";
import {
  Field,
  fieldInputClass,
  fieldTextareaClass,
} from "@/components/onboarding/Field";
import { cn } from "@/lib/utils";

type Tab = "business" | "account";

export default function SettingsPage() {
  const { business, updateBusiness } = useBusiness();
  const [tab, setTab] = useState<Tab>("business");
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    businessName: business.businessName ?? "",
    businessCategory: business.businessCategory ?? "",
    businessDescription: business.businessDescription ?? "",
    businessAddress: business.businessAddress ?? "",
    businessPhone: business.businessPhone ?? "",
    businessEmailAddress: business.businessEmailAddress ?? "",
  });
  const [email, setEmail] = useState(business.email ?? "");
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showErrorToast("Please select an image file");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      showErrorToast("Logo must be smaller than 3MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () =>
      updateBusiness({ businessPicture: reader.result as string }, "Logo updated");
    reader.readAsDataURL(file);
  };

  const saveBusiness = async () => {
    setSaving(true);
    await updateBusiness(form, "Settings updated");
    setSaving(false);
  };

  const saveAccount = async () => {
    setSaving(true);
    await updateBusiness({ email }, "Account updated");
    setSaving(false);
  };

  const initial = business.businessName?.trim()?.[0]?.toUpperCase() || "B";

  return (
    <div className="px-1 sm:px-2">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
        {/* Tabs */}
        <div className="mb-6 flex gap-6 border-b border-ink/10">
          {(["business", "account"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "-mb-px border-b-2 pb-2 text-[15px] font-medium transition-colors",
                tab === t
                  ? "border-brand text-ink"
                  : "border-transparent text-ink-soft hover:text-ink",
              )}
            >
              {t === "business" ? "Business Settings" : "Account Settings"}
            </button>
          ))}
        </div>

        {tab === "business" ? (
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex flex-wrap items-center gap-5">
              <div className="relative">
                {business.businessPicture ? (
                  <div
                    className="size-20 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${business.businessPicture})` }}
                  />
                ) : (
                  <div className="flex size-20 items-center justify-center rounded-full bg-ink text-2xl font-semibold text-white">
                    {initial}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Change logo"
                  className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-brand text-ink shadow"
                >
                  <Camera className="size-4" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoFile}
                  className="hidden"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileRef.current?.click()}
                className="rounded-lg border-ink/20 px-6 font-medium text-ink"
              >
                Add Logo
              </Button>
              {business.businessPicture && (
                <button
                  type="button"
                  onClick={() =>
                    updateBusiness({ businessPicture: "" }, "Logo removed")
                  }
                  className="text-[15px] font-medium text-ink underline"
                >
                  Remove Logo
                </button>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-ink">
                Basic Business Info
              </h3>
              <div className="space-y-5">
                <Field label="Business Name">
                  <Input
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                    className={fieldInputClass}
                  />
                </Field>
                <Field label="Business Category">
                  <Input
                    value={form.businessCategory}
                    onChange={(e) => set("businessCategory", e.target.value)}
                    className={fieldInputClass}
                  />
                </Field>
                <Field label="Business description">
                  <Textarea
                    value={form.businessDescription}
                    onChange={(e) => set("businessDescription", e.target.value)}
                    className={fieldTextareaClass}
                  />
                </Field>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-ink">Contact Details</h3>
              <div className="space-y-5">
                <Field label="Business Address or Yardcode">
                  <Input
                    value={form.businessAddress}
                    onChange={(e) => set("businessAddress", e.target.value)}
                    className={fieldInputClass}
                  />
                </Field>
                <Field label="Business Phone number">
                  <Input
                    value={form.businessPhone}
                    onChange={(e) => set("businessPhone", e.target.value)}
                    className={fieldInputClass}
                  />
                </Field>
                <Field label="Business Email">
                  <Input
                    type="email"
                    value={form.businessEmailAddress}
                    onChange={(e) =>
                      set("businessEmailAddress", e.target.value)
                    }
                    className={fieldInputClass}
                  />
                </Field>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={saveBusiness}
                disabled={saving}
                className="h-11 rounded-lg bg-brand px-8 font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl space-y-5">
            <Field label="Account Email">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldInputClass}
              />
            </Field>
            <Field label="WhatsApp business number">
              <Input
                value={business.businessPhone ?? ""}
                disabled
                className={cn(fieldInputClass, "bg-ink/5")}
              />
            </Field>
            <div className="flex justify-end">
              <Button
                type="button"
                onClick={saveAccount}
                disabled={saving}
                className="h-11 rounded-lg bg-brand px-8 font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
