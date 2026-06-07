"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/#" },
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Chat bot", href: "/main/chatbot" },
  { name: "Login", href: "/main/signin" },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Wordmark() {
  return (
    <span className="text-xl font-extrabold tracking-tight">
      <span className="text-ink">Alat</span>
      <span className="text-brand-ink">Chat</span>
      <span className="text-ink/40"> AI</span>
    </span>
  );
}

export function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || isMobileMenuOpen
          ? "border-b border-ink/[0.07] bg-white/80 backdrop-blur-md shadow-[0_1px_20px_-12px_rgba(30,34,41,0.5)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container mx-auto px-5 md:px-8 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Link href="/" className="inline-flex items-center" aria-label="AlatChat AI home">
              <Wordmark />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="hidden items-center gap-9 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 rounded-full bg-brand transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </motion.nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="hidden lg:block"
          >
            <Button
              onClick={() => router.push("/main")}
              className="h-10 rounded-full bg-brand px-5 font-semibold text-ink shadow-sm transition-all duration-300 hover:bg-brand-hover hover:shadow-md"
            >
              Get started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-ink transition-colors hover:bg-ink/5 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X className="size-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu className="size-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t border-ink/[0.07] bg-white/95 backdrop-blur-md lg:hidden"
          >
            <nav className="container mx-auto flex flex-col gap-1 px-5 py-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-2.5 font-medium text-ink-soft transition-colors hover:bg-brand-soft hover:text-brand-ink"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.05, ease }}
                className="px-1 pt-3"
              >
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/main");
                  }}
                  className="h-11 w-full rounded-full bg-brand font-semibold text-ink shadow-sm hover:bg-brand-hover"
                >
                  Get started
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
