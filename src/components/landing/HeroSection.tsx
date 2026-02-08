"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden mt-12 md:mt-20 h-[600px] md:h-[900px]"
    >
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-black m-4 mx-4 md:m-10 md:mx-20 rounded-[20px] md:rounded-[40px] overflow-hidden"
      >
        {/* Placeholder for hero image */}
        <img
          src="/hero.png"
          alt="Hero Image"
          className="w-full h-full object-cover opacity-30 "
        />
      </motion.div>
      <div className="relative z-10 container mx-auto px-4 md:px-16 py-12 md:py-20 lg:py-32">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            Boost Your Business With AI Powered Whatsapp Automation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8"
          >
            AlatChat AI Helps Artisans and small business respond to customers
            instantly on whatsapp, even when you&apos;re busy or offline
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Button
              size="lg"
              className="bg-[#7DD3C0] hover:bg-[#6BC2AF] text-gray-900 font-semibold px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-8 md:mt-20"
              onClick={() => router.push("/main")}
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
