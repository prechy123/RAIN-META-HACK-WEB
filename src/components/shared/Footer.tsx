"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

const productLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Chat bot", href: "/main/chatbot" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact us", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function LinkColumn({
  title,
  links,
  delay,
}: {
  title: string;
  links: { name: string; href: string }[];
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease }}
    >
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
        {title}
      </h3>
      <ul className="space-y-3.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-[15px] text-white/65 transition-colors hover:text-brand"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  const pathName = usePathname();
  if (pathName.startsWith("/main/chatbot")) {
    return null; // Don't render the footer on the chatbot page
  }

  return (
    <footer className="bg-white px-4 py-10">
      <div className="container relative mx-auto overflow-hidden rounded-3xl bg-ink px-6 py-12 text-white sm:px-10 md:py-14 lg:px-14">
        {/* Ambient brand glow */}
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-brand/15 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.3fr] lg:gap-12">
          {/* Brand & socials */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight"
              aria-label="AlatChat AI home"
            >
              <span className="text-white">Alat</span>
              <span className="text-brand">Chat</span>
              <span className="text-white/45"> AI</span>
            </Link>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-white/55">
              Work more, chat less, grow faster. AI that replies to your
              customers on WhatsApp — day or night.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-brand hover:text-ink hover:ring-brand"
                  aria-label={social.name}
                >
                  <social.icon className="size-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <LinkColumn title="Product" links={productLinks} delay={0.1} />
          <LinkColumn title="Company" links={companyLinks} delay={0.15} />

          {/* Contact */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
          >
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
              Get in touch
            </h3>
            <a
              href="mailto:info@alatchat.com"
              className="group inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2.5 text-[15px] text-white/80 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Mail className="size-[18px] text-brand" />
              <span>info@alatchat.com</span>
              <ArrowUpRight className="size-4 text-white/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
            </a>
            <p className="mt-4 text-sm text-white/45">
              We usually reply within a few hours.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-7 text-sm text-white/45 sm:flex-row sm:justify-between"
        >
          <p>© 2026 AlatChat AI · All rights reserved</p>
          <div className="flex items-center gap-5">
            <Link href="/terms" className="transition-colors hover:text-brand">
              Terms
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/privacy" className="transition-colors hover:text-brand">
              Privacy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
