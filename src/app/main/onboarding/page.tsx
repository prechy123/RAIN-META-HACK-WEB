"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthService } from "@/services/authService";
import { showErrorToast, showSuccessToast } from "@/libs/utils/showToast";
import AutoFillModal from "@/components/AutoFillModal";

import OnboardingSidebar from "@/components/onboarding/OnboardingSidebar";
import StepBasicInfo from "@/components/onboarding/StepBasicInfo";
import StepContact from "@/components/onboarding/StepContact";
import StepHours from "@/components/onboarding/StepHours";
import StepFAQ from "@/components/onboarding/StepFAQ";
import StepProducts from "@/components/onboarding/StepProducts";
import StepReview from "@/components/onboarding/StepReview";
import SetUpComplete from "@/components/onboarding/SetUpComplete";
import {
  type BusinessData,
  type FAQ,
  type Item,
  type Day,
  type HoursState,
  defaultHours,
  serializeOpenDays,
  serializeOpenHours,
} from "@/components/onboarding/types";
import { AxiosError } from "axios";
import {
  basicInfoSchema,
  contactSchema,
  hoursSchema,
  faqStepSchema,
  productsStepSchema,
  businessSchema,
  emailSchema,
  firstIssue,
  toFieldErrors,
} from "@/lib/validations";

const TOTAL_STEPS = 6;

const initialFormData: BusinessData = {
  email: "",
  password: "",
  business_id: "",
  businessName: "",
  businessDescription: "",
  businessCategory: "",
  extra_information: "",
  businessAddress: "",
  businessPhone: "",
  businessEmailAddress: "",
  businessWebsite: "",
  businessOpenHours: "",
  businessOpenDays: "",
  businessPicture: "",
  faqs: [],
  items: [],
};

export default function Onboarding() {
  const router = useRouter();
  const AUTH = useAuthService();

  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<"form" | "complete">("form");
  const [formData, setFormData] = useState<BusinessData>(initialFormData);
  const [hours, setHours] = useState<HoursState>(defaultHours);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoFillOpen, setAutoFillOpen] = useState(false);
  const [assignedPhone, setAssignedPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  // Load credentials + any saved draft; enforce that account step happened first.
  useEffect(() => {
    if (localStorage.getItem("businessData")) {
      router.replace("/main/dashboard");
      return;
    }
    const raw = sessionStorage.getItem("onboardingDraft");
    if (!raw) {
      router.replace("/main");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (!parsed.email || !parsed.password) {
        router.replace("/main");
        return;
      }
      const { hours: savedHours, ...rest } = parsed;
      setFormData((prev) => ({ ...prev, ...rest }));
      if (savedHours) setHours(savedHours);
      setReady(true);
    } catch {
      router.replace("/main");
    }
  }, [router]);

  // Keep the API string fields in sync with the structured hours editor.
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      businessOpenDays: serializeOpenDays(hours),
      businessOpenHours: serializeOpenHours(hours),
    }));
  }, [hours]);

  // Persist progress so a refresh resumes the flow.
  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem(
      "onboardingDraft",
      JSON.stringify({ ...formData, hours }),
    );
  }, [formData, hours, ready]);

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const handleInputChange = useCallback(
    (field: keyof BusinessData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      clearError(field);
    },
    [clearError],
  );

  const handleHoursChange = useCallback(
    (day: Day, patch: Partial<HoursState[Day]>) => {
      setHours((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
      clearError("_root");
    },
    [clearError],
  );

  const setFaqs = useCallback((faqs: FAQ[]) => {
    setFormData((prev) => ({ ...prev, faqs }));
  }, []);

  const setItems = useCallback((items: Item[]) => {
    setFormData((prev) => ({ ...prev, items }));
  }, []);

  const handleAutoFill = useCallback((extracted: Partial<BusinessData>) => {
    setFormData((prev) => ({
      ...prev,
      businessName: extracted.businessName || prev.businessName,
      businessDescription:
        extracted.businessDescription || prev.businessDescription,
      businessCategory: extracted.businessCategory || prev.businessCategory,
      extra_information: extracted.extra_information || prev.extra_information,
      businessAddress: extracted.businessAddress || prev.businessAddress,
      businessPhone: extracted.businessPhone || prev.businessPhone,
      businessEmailAddress:
        extracted.businessEmailAddress || prev.businessEmailAddress,
      businessWebsite: extracted.businessWebsite || prev.businessWebsite,
      faqs: extracted.faqs && extracted.faqs.length > 0 ? extracted.faqs : prev.faqs,
      items:
        extracted.items && extracted.items.length > 0
          ? extracted.items
          : prev.items,
    }));
    showSuccessToast("Business information extracted successfully!");
  }, []);

  const validateStep = useCallback((): boolean => {
    let result;
    switch (step) {
      case 1:
        result = basicInfoSchema.safeParse(formData);
        break;
      case 2:
        result = contactSchema.safeParse(formData);
        break;
      case 3:
        result = hoursSchema.safeParse(hours);
        break;
      case 4:
        result = faqStepSchema.safeParse(formData);
        break;
      case 5:
        result = productsStepSchema.safeParse(formData);
        break;
      default:
        return true;
    }
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      showErrorToast(firstIssue(result.error));
      return false;
    }
    setErrors({});
    return true;
  }, [step, formData, hours]);

  const nextStep = useCallback(() => {
    if (step < TOTAL_STEPS && validateStep()) setStep((s) => s + 1);
  }, [step, validateStep]);

  const prevStep = useCallback(() => {
    if (step > 1) {
      setErrors({});
      setStep((s) => s - 1);
    }
  }, [step]);

  const skipStep = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setErrors({});
      setStep((s) => s + 1);
    }
  }, [step]);

  const handleSubmit = useCallback(async () => {
    const emailCheck = emailSchema.safeParse(formData.email);
    if (!emailCheck.success) {
      const msg = firstIssue(emailCheck.error);
      setErrors((p) => ({ ...p, email: msg }));
      showErrorToast(msg);
      return;
    }
    const check = businessSchema.safeParse(formData);
    if (!check.success) {
      showErrorToast(firstIssue(check.error));
      return;
    }
    setSubmitError("");
    setIsSubmitting(true);
    try {
      // Backend expects item prices as strings.
      const res = await AUTH.register({
        ...formData,
        items: formData.items.map((it) => ({
          ...it,
          price: String(it.price),
        })),
      });
      if (res.message === "Business registered successfully") {
        localStorage.setItem("businessData", JSON.stringify(res.business));
        sessionStorage.removeItem("onboardingDraft");
        setAssignedPhone(res.business.businessPhone || formData.businessPhone);
        setPhase("complete");
      }
    } catch (e) {
      // The axios layer also shows a toast; keep a persistent banner on Review.
      const message =
        e instanceof AxiosError
          ? e.response?.data?.message
          : undefined;
      setSubmitError(message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [AUTH, formData]);

  const stepContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <StepBasicInfo
            data={formData}
            errors={errors}
            onChange={handleInputChange}
            onAutoFill={() => setAutoFillOpen(true)}
          />
        );
      case 2:
        return (
          <StepContact
            data={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        );
      case 3:
        return (
          <StepHours
            hours={hours}
            error={errors._root}
            onChange={handleHoursChange}
          />
        );
      case 4:
        return <StepFAQ faqs={formData.faqs} onChange={setFaqs} />;
      case 5:
        return <StepProducts items={formData.items} onChange={setItems} />;
      case 6:
        return (
          <StepReview
            data={formData}
            emailError={errors.email}
            submitError={submitError}
            onEdit={setStep}
            onEmailChange={(value) => handleInputChange("email", value)}
          />
        );
      default:
        return null;
    }
  }, [
    step,
    formData,
    hours,
    errors,
    submitError,
    handleInputChange,
    handleHoursChange,
    setFaqs,
    setItems,
  ]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-soft/40">
        <p className="text-ink-soft">Loading...</p>
      </div>
    );
  }

  if (phase === "complete") {
    return (
      <div className="min-h-screen bg-brand-soft/40">
        <TopBar />
        <SetUpComplete
          phoneNumber={assignedPhone}
          onGoToDashboard={() => router.push("/main/dashboard")}
        />
      </div>
    );
  }

  const showSkip = step === 4 || step === 5;

  return (
    <div className="min-h-screen bg-brand-soft/40 pb-12">
      <TopBar />

      <div className="mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            Welcome to AlatChat AI
          </h1>
          <p className="mt-1 text-ink-soft">
            Complete the 6 steps to get started
          </p>
        </div>

        {/* Step badge + skip row */}
        <div className="relative mt-6 flex items-center justify-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-ink/10 bg-white text-sm font-semibold text-ink shadow-sm">
            {step}/{TOTAL_STEPS}
          </span>
          {showSkip && (
            <button
              type="button"
              onClick={skipStep}
              className="absolute right-0 text-sm font-medium text-ink-soft hover:text-ink"
            >
              Skip
            </button>
          )}
        </div>

        {/* Card */}
        <div className="mt-4 grid gap-6 rounded-2xl bg-white p-5 shadow-[0_20px_60px_-30px_rgba(30,34,41,0.4)] sm:p-7 md:grid-cols-[260px_1fr]">
          <aside className="hidden md:block">
            <OnboardingSidebar currentStep={step} />
          </aside>

          <section className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                {stepContent}
              </motion.div>
            </AnimatePresence>

            {/* Footer buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  className="h-11 rounded-lg border-brand/40 px-8 font-semibold text-brand-ink hover:bg-brand-soft"
                >
                  Back
                </Button>
              ) : (
                <span />
              )}

              {step < TOTAL_STEPS ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="h-11 rounded-lg bg-brand px-10 font-semibold text-ink hover:bg-brand-hover"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-11 rounded-lg bg-brand px-10 font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
            </div>
          </section>
        </div>
      </div>

      <AutoFillModal
        isOpen={autoFillOpen}
        onClose={() => setAutoFillOpen(false)}
        onDataExtracted={handleAutoFill}
      />
    </div>
  );
}

function TopBar() {
  return (
    <div className="px-4 py-5 sm:px-8">
      <div className="inline-flex items-center gap-2">
        <Image
          src="/logo2.jpeg"
          alt="AlatChat AI"
          width={28}
          height={28}
          className="rounded-md"
        />
        <span className="text-sm font-bold tracking-tight text-ink">
          AlatChat AI
        </span>
      </div>
    </div>
  );
}
