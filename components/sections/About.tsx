"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-stone-50 text-neutral-900 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] w-full rounded-2xl overflow-hidden bg-neutral-200"
          >
            <Image 
              src="/about-image.png" 
              alt="Luxurious salon interior" 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-stone-900/10 mix-blend-multiply" />
            
            {/* Aesthetic overlay badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -right-8 w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl z-10 flex-col rotate-12"
            >
              <span className="text-4xl font-serif text-neutral-900 leading-none">10+</span>
              <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider text-center px-4 mt-1">Years Experience</span>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-bold tracking-widest text-stone-500 uppercase mb-4 block">Our Philosophy</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Artistry in every detail. <br/>
                <span className="font-serif italic font-normal text-stone-600">Confidence in every look.</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-neutral-600 leading-relaxed font-light">
              <p>
                Founded in 2014, Salon Seven Zee was born from a simple belief: that everyone deserves to feel extraordinary. Our space is designed to be a sanctuary away from the hustle, where you can relax, recharge, and rediscover your personal style.
              </p>
              <p>
                Our team of master stylists and aestheticians are constantly refining their craft, bringing you the latest techniques and trends from around the world. We don&apos;t just follow trends—we tailor them to complement your unique features and lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-stone-200">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Premium Products</h4>
                <p className="text-neutral-500 text-sm">We exclusively use high-end, cruelty-free professional brands.</p>
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Expert Team</h4>
                <p className="text-neutral-500 text-sm">Award-winning stylists with continuous global education.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
