"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white">
      {/* Background with an aesthetic gradient or image simulation */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950/90 z-10" />
        {/* Placeholder for an actual background image using a simple aesthetic CSS pattern */}
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-500/30 via-neutral-900 to-neutral-950" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block text-sm md:text-base font-semibold tracking-widest uppercase text-stone-300 mb-6 font-serif">
            Welcome to the height of luxury
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]">
            Define Your <span className="italic font-light text-stone-300">Signature</span> Style
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Experience exceptional beauty services in an environment crafted for your ultimate relaxation and transformation.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="group relative px-8 py-4 bg-white text-neutral-950 rounded-full font-medium inline-flex items-center gap-2 overflow-hidden transition-all hover:pr-12"
            >
              <span className="relative z-10">Book Appointment</span>
              <ArrowRight className="w-4 h-4 absolute right-4 opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-neutral-950 z-10" />
            </a>
            <a
              href="#services"
              className="px-8 py-4 text-white hover:text-stone-300 font-medium transition-colors inline-block"
            >
              Explore Services
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neutral-500 to-transparent" />
      </motion.div>
    </section>
  );
}
