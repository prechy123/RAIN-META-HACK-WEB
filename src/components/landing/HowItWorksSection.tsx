"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Register",
    description: "Sign up and connect your business in a few simple steps",
    icon: (
      <div className="w-20 h-20 rounded-full bg-[#7DD3C0]">
        <svg
          className="w-full h-full p-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
    ),
  },
  {
    number: 2,
    title: "Complete SetUp",
    description:
      "Provide your business information so the AI Can answer customers correctly",
    icon: (
      <div className="w-20 h-20 rounded-full bg-[#7DD3C0] flex items-center justify-center">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    ),
  },
  {
    number: 3,
    title: "Utilize App",
    description:
      "Customers Chat you on Whatsapp while Alat Chat Ai responds automatically",
    icon: (
      <div className="w-20 h-20 rounded-full bg-[#7DD3C0] flex items-center justify-center">
        <svg
          className="w-10 h-10 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4"
          />
        </svg>
      </div>
    ),
  },
];

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
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold text-center mb-20 text-gray-900"
        >
          HOW IT WORKS
        </motion.h2>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={item} className="relative">
              <div className="flex flex-col items-center text-center">
                <motion.div
                  className="w-8 h-8 rounded-full bg-[#7DD3C0] flex items-center justify-center mb-8 font-bold text-gray-900"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  {step.number}
                </motion.div>
                <motion.div
                  className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 border-4 border-gray-100"
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {/* Dotted Line Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 left-1/2 w-full h-0.5 border-t-2 border-dotted border-gray-300"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              size="lg"
              className="bg-[#7DD3C0] hover:bg-[#6BC2AF] text-gray-900 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
