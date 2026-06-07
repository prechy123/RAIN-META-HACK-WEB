"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthShell from "@/components/auth/AuthShell";
import PasswordField from "@/components/auth/PasswordField";
import { useAuthService } from "@/services/authService";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthService();

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await login({ email, password });
      localStorage.setItem("businessData", JSON.stringify(response.business));
      router.push("/main/dashboard");
    } catch (err) {
      setError("Failed to sign in. Please try again.");
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, router]);

  return (
    <AuthShell panelHeadline="Your AI assistant is ready to help">
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-3xl font-bold text-ink">Log in</h1>
        <p className="mt-1 text-sm text-ink-soft">Welcome back to AlatChat AI</p>

        <form
          className="mt-7 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              disabled={isLoading}
              className="h-12 rounded-xl border border-ink/15"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <PasswordField
              id="password"
              value={password}
              onChange={setPassword}
              placeholder="enter your Password"
              disabled={isLoading}
            />
            <div className="text-right">
              <Link
                href="#"
                className="text-sm font-medium text-brand-ink hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full rounded-xl bg-brand text-base font-semibold text-ink hover:bg-brand-hover disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-soft">
          Don&apos;t have an account yet?{" "}
          <Link href="/main" className="font-semibold text-brand-ink">
            Sign up
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
