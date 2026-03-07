"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Scissors } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
  { href: "/admin/login", label: "Admin Login" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "flex items-center gap-2 text-2xl font-bold tracking-tighter group transition-colors duration-300",
            scrolled ? "text-neutral-900" : "text-white"
          )}
        >
          <Scissors className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
          <span>Luxe Salon</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-end items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                scrolled ? "text-neutral-600 hover:text-neutral-900" : "text-stone-300 hover:text-white"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                scrolled ? "bg-neutral-900" : "bg-white"
              )} />
            </Link>
          ))}
          <Link
            href="#contact"
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-medium transition-colors",
              scrolled 
                ? "bg-neutral-900 text-white hover:bg-neutral-800" 
                : "bg-white text-neutral-900 hover:bg-stone-200"
            )}
          >
            Book Appointment
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className={cn(
            "md:hidden transition-colors",
            scrolled ? "text-neutral-900" : "text-white"
          )}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-6 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-neutral-600 hover:text-neutral-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 rounded-full bg-neutral-900 text-white font-medium w-max inline-block mt-4"
            >
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
