"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

const trustPoints = [
  "Works inside WhatsApp",
  "No new app for customers",
  "Replies in seconds",
];

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the artwork only — keeps the copy steady.
  const artY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-28"
    >
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid-soft [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.8, ease }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Reply to every customer
            <br className="hidden sm:block" /> on WhatsApp,{" "}
            <span className="text-brand-ink">instantly</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.8, ease }}
            className="mt-6 text-lg leading-relaxed text-ink-soft"
          >
            AlatChat AI answers your customers the moment they message, even
            when you&apos;re busy, asleep, or offline. The questions it
            can&apos;t handle get sent straight to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.8, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              onClick={() => router.push("/main")}
              className="group h-12 rounded-full bg-brand px-7 text-base font-semibold text-ink shadow-sm transition-all duration-300 hover:bg-brand-hover hover:shadow-md"
            >
              Start free
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-ink/15 bg-white px-7 text-base font-semibold text-ink transition-colors hover:bg-ink/[0.03]"
            >
              <a href="#how-it-works">See how it works</a>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5"
          >
            {trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm font-medium text-ink-soft"
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-brand-soft text-brand-ink">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Artwork */}
        <motion.div
          style={{ y: artY }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="hero-glow relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Framed product preview */}
          <div className="relative z-10 overflow-hidden rounded-[26px] border border-ink/10 bg-white p-2 shadow-[0_30px_60px_-25px_rgba(30,34,41,0.35)]">
            <img
              src="/hero.png"
              alt="AlatChat AI replying to a customer on WhatsApp"
              className="aspect-[4/3] w-full rounded-[18px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
