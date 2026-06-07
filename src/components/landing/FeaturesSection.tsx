"use client";

import { motion } from "framer-motion";
import { MessageSquare, Send, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: MessageSquare,
    title: "Automated customer replies",
    description:
      "AlatChat AI answers customer questions instantly on WhatsApp — even when you're busy or offline.",
  },
  {
    icon: Send,
    title: "Escalation to you",
    description:
      "When a question is too complex, AlatChat AI hands it straight to you so you can answer personally.",
  },
  {
    icon: BarChart3,
    title: "Analytics & productivity",
    description:
      "See customer activity, the questions people ask most, and how much AlatChat AI is doing for your business.",
  },
  {
    icon: "whatsapp",
    title: "Right inside WhatsApp",
    description:
      "No new app for your customers — every conversation happens where they already are.",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
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

export function FeaturesSection() {
  return (
    <section className="bg-[#fafbfb] py-20 md:py-28">
      <div className="container mx-auto px-5 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Everything you need to never miss a customer
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            AlatChat AI handles the conversations, flags what matters, and keeps
            you in control — all inside the app your customers already use.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item} className="flex">
              <Card className="group h-full w-full gap-0 rounded-2xl border-ink/[0.08] bg-white p-2 shadow-[0_1px_3px_rgba(30,34,41,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_18px_36px_-18px_rgba(30,34,41,0.25)]">
                <CardHeader className="px-4 pt-4">
                  <span className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand-ink transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
                    {feature.icon === "whatsapp" ? (
                      <svg
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    ) : (
                      <feature.icon className="size-5" />
                    )}
                  </span>
                  <CardTitle className="text-lg font-semibold text-ink">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-5 pt-2">
                  <CardDescription className="text-[15px] leading-relaxed text-ink-soft">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
