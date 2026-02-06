"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Premium",
    price: "$XX",
    period: "Per month",
    features: [
      "Free plan",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
    ],
    isPopular: false,
    isPremium: true,
  },
  {
    name: "FREE",
    price: "$0",
    period: "Per month",
    features: [
      "Free plan",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
    ],
    isPopular: true,
    isPremium: false,
  },
  {
    name: "Premium",
    price: "$XX",
    period: "Per month",
    features: [
      "Free plan",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
      "AI automatic response",
    ],
    isPopular: false,
    isPremium: true,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
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

export function PricingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Pricing
          </h2>
          <p className="text-xl text-gray-600">Choose a plan that suits you</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} variants={item}>
              <motion.div
                whileHover={{
                  y: plan.isPopular ? -16 : -12,
                  scale: plan.isPopular ? 1.02 : 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <Card
                  className={`h-full border-2 ${plan.isPopular ? "border-[#7DD3C0]" : "border-gray-200"} shadow-md hover:shadow-${plan.isPopular ? "2xl" : "xl"} transition-all duration-500 relative overflow-hidden`}
                >
                  {plan.isPopular && (
                    <motion.div
                      className="absolute top-0 right-0 bg-[#7DD3C0] text-gray-900 px-4 py-1 text-sm font-semibold rounded-bl-lg"
                      initial={{ x: 100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.3,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Popular
                    </motion.div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl mb-2">{plan.name}</CardTitle>
                    <motion.div
                      className="text-5xl font-bold mb-2"
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        },
                      }}
                    >
                      {plan.price}
                    </motion.div>
                    <CardDescription>{plan.period}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.4 + featureIndex * 0.05,
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex items-center gap-3"
                        >
                          <Check className="w-5 h-5 text-gray-900 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <motion.div
                      className="w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {plan.isPremium ? (
                        <Button
                          variant="outline"
                          className="w-full border-[#7DD3C0] text-[#7DD3C0] hover:bg-[#7DD3C0] hover:text-gray-900 font-semibold transition-all duration-300"
                        >
                          Get Started
                        </Button>
                      ) : (
                        <Button className="w-full bg-[#7DD3C0] hover:bg-[#6BC2AF] text-gray-900 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                          Get Started
                        </Button>
                      )}
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
