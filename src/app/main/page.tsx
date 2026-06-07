"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthShell from "@/components/auth/AuthShell";
import PasswordField from "@/components/auth/PasswordField";
import { showErrorToast } from "@/libs/utils/showToast";
import {
  createAccountSchema,
  firstIssue,
  toFieldErrors,
} from "@/lib/validations";
import { cn } from "@/lib/utils";

export default function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // If already onboarded, skip straight to the dashboard.
  useEffect(() => {
    if (localStorage.getItem("businessData")) {
      router.push("/main/dashboard");
    }
  }, [router]);

  const handleGetStarted = useCallback(() => {
    const result = createAccountSchema.safeParse({
      email,
      password,
      confirmPassword,
    });
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      showErrorToast(firstIssue(result.error));
      return;
    }
    setErrors({});

    // The signup API takes credentials + business data together, so we carry the
    // credentials into the onboarding flow and register at the final step.
    sessionStorage.setItem(
      "onboardingDraft",
      JSON.stringify({ email, password }),
    );
    router.push("/main/onboarding");
  }, [email, password, confirmPassword, router]);

  return (
    <AuthShell panelHeadline="Automate Customer's Chat and Stay Productive">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-3xl font-bold text-ink">Create Account</h1>
        <p className="mt-1 text-sm text-ink-soft">Sign up to get started</p>

        <form
          className="mt-7 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleGetStarted();
          }}
        >
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((p) => ({ ...p, email: "" }));
              }}
              placeholder="enter your email"
              aria-invalid={!!errors.email}
              className={cn(
                "h-12 rounded-xl border",
                errors.email
                  ? "border-red-400 focus-visible:border-red-400"
                  : "border-ink/15",
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <PasswordField
              id="password"
              value={password}
              onChange={(v) => {
                setPassword(v);
                setErrors((p) => ({ ...p, password: "" }));
              }}
              placeholder="enter your Password"
              invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirm" className="text-sm font-medium text-ink">
              Password
            </label>
            <PasswordField
              id="confirm"
              value={confirmPassword}
              onChange={(v) => {
                setConfirmPassword(v);
                setErrors((p) => ({ ...p, confirmPassword: "" }));
              }}
              placeholder="re enter your Password"
              invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-xl bg-brand text-base font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
          >
            Get Started
          </Button>
        </form>



        <p className="mt-6 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link href="/main/signin" className="font-semibold text-brand-ink">
            Log in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
