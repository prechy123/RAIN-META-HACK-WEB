"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import AnimatedText from "@/components/AnimatedText";
import Particles from "@/components/Particles";
import MultilayerCardV_3 from "@/components/shared/CardLayer3";
import { Button_v2 } from "@/components/shared/Button";
import { Input, InputBlock } from "@/components/shared/TextInput";
import PasswordInput from "@/components/shared/PasswordInput";
import Link from "next/link";
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

      // Store business data in localStorage
      localStorage.setItem("businessData", JSON.stringify(response.business));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to sign in. Please try again."
      );
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, router]);

  // Memoize AnimatedText components to prevent re-renders
  const animatedTitle = useMemo(
    () => (
      <AnimatedText
        text="Welcome Back!"
        className="text-4xl"
        delay={100}
        duration={0.6}
      />
    ),
    []
  );

  const animatedSubtitle = useMemo(
    () => (
      <AnimatedText
        text="Sign in to view your business information"
        className="text-lg animate-pulse text-blue-600"
        delay={100}
        duration={0.6}
      />
    ),
    []
  );

  // Memoize Particles component to prevent re-renders
  const particlesBackground = useMemo(
    () => (
      <Particles
        className="z-10"
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={400}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    ),
    []
  );

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden z-10">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 flex-col">
        <div className="h-auto w-full sm:w-[600px] drop-shadow-lg bg-black p-8 rounded-3xl">
          {animatedTitle}
          {animatedSubtitle}

          <div className="mt-8">
            <div className="space-y-4">
              <InputBlock variant="neubrutalism" size="lg">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </InputBlock>
              <PasswordInput
                value={password}
                setValue={setPassword}
                placeholder="Enter your password"
                // disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500 rounded-lg">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <Button_v2
              onClick={handleSignIn}
              className="w-full"
              // disabled={isLoading || !email || !password}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button_v2>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/"
                  className="text-blue-600 hover:text-blue-500 underline"
                >
                  Register your business
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {particlesBackground}
    </div>
  );
}
