"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

const productLinks = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
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

export function Footer() {
  const pathName = usePathname()
  if (pathName.startsWith("/main/chatbot")) {
    return null; // Don't render the footer on the chatbot page
  }
  return (
    <footer className=" bg-white py-10">
      <div className="container mx-auto px-4 bg-[#2B2E33] text-white py-12 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Tagline Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Link href="/" className="inline-block">
              AlatChat AI
            </Link>
            <p className="text-gray-300 text-lg font-medium">
              Work more, Chat less, Grow faster
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border-2 border-gray-400 hover:border-[#7DD3C0] flex items-center justify-center transition-colors group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-[#7DD3C0] transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-[#7DD3C0] text-xl font-semibold mb-6">
              Product
            </h3>
            <ul className="space-y-4">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#7DD3C0] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-[#7DD3C0] text-xl font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#7DD3C0] transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-[#7DD3C0] text-xl font-semibold mb-6">
              Contact us
            </h3>
            <a
              href="mailto:info@alatchat.com"
              className="flex items-center gap-3 text-gray-300 hover:text-[#7DD3C0] transition-colors group"
            >
              <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>info@alatchat.com</span>
            </a>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-600"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              Copyright © 2026 AlatChat AI
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>All rights reserved</span>
              <Link
                href="/terms"
                className="hover:text-[#7DD3C0] transition-colors"
              >
                Terms and conditions
              </Link>
              <span>|</span>
              <Link
                href="/privacy"
                className="hover:text-[#7DD3C0] transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
