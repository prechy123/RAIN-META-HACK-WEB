"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserPlus, ClipboardList, MessagesSquare } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Create your account",
    description: "Sign up and connect your business in a few simple steps.",
    icon: UserPlus,
  },
  {
    number: 2,
    title: "Add your details",
    description:
      "Tell AlatChat AI about your business so it can answer customers accurately.",
    icon: ClipboardList,
  },
  {
    number: 3,
    title: "Let it run",
    description:
      "Customers message you on WhatsApp while AlatChat AI replies automatically.",
    icon: MessagesSquare,
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 18,
    },
  },
};

export function HowItWorksSection() {
  const router = useRouter();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Up and running in three steps
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            No technical setup, no new app for your customers. You could be
            live before lunch.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
        >
          {/* Connector — sits at the vertical center of the medallions, behind them */}
          <div
            aria-hidden
            className="absolute left-[16.66%] right-[16.66%] top-10 z-0 hidden h-px border-t-2 border-dotted border-ink/15 md:block"
          />

          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <motion.div
                className="relative mb-7"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="flex size-20 items-center justify-center rounded-full bg-brand-soft text-brand-ink ring-8 ring-white">
                  <step.icon className="size-8" strokeWidth={1.75} />
                </div>
                <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full border-2 border-white bg-brand text-sm font-bold text-ink">
                  {step.number}
                </span>
              </motion.div>
              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 max-w-xs text-ink-soft">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            onClick={() => router.push("/main")}
            className="group h-12 rounded-full bg-brand px-7 text-base font-semibold text-ink shadow-sm transition-all duration-300 hover:bg-brand-hover hover:shadow-md"
          >
            Get started — it&apos;s free
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
