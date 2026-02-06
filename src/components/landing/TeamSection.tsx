"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const teamMembers = [
  { name: "Giwa Ibrahim", role: "AI Engineer" },
  { name: "Giwa Ibrahim", role: "AI Engineer" },
  { name: "Giwa Ibrahim", role: "Full stack developer" },
  { name: "Giwa Ibrahim", role: "UI/UX designer" },
  { name: "Giwa Ibrahim", role: "Visual designer" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      duration: 0.6,
    },
  },
};

export function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Team Member
          </h2>
          <p className="text-xl text-gray-600">
            Meet the people behind Alatchat AI
          </p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={item}>
              <motion.div
                whileHover={{
                  y: -12,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <Card className="h-full shadow-md hover:shadow-xl transition-all duration-500">
                  <CardHeader className="">
                    <motion.div
                      className="w-full aspect-square bg-gray-300 rounded-lg mb-4 text-left"
                      whileHover={{
                        scale: 1.03,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        },
                      }}
                    ></motion.div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex  gap-3">
                    <motion.button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </motion.button>
                    <motion.button
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </motion.button>
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
