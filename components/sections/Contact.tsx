"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-900 text-white relative flex flex-col items-center">
      {/* Aesthetic decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-800/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-stone-400 uppercase block">Visit Us</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Reserve Your Time</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-stone-800/50 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-stone-700/50"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-stone-300">First Name</label>
                  <input type="text" id="name" className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-stone-300">Last Name</label>
                  <input type="text" id="lastName" className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-stone-300">Email Address</label>
                <input type="email" id="email" className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all" placeholder="jane@example.com" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-stone-300">Service Interest</label>
                <select id="service" className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all appearance-none cursor-pointer">
                  <option value="" className="bg-stone-800">Select a service</option>
                  <option value="hair" className="bg-stone-800">Hair Styling & Color</option>
                  <option value="beauty" className="bg-stone-800">Beauty & Wellness</option>
                  <option value="nails" className="bg-stone-800">Nail Care</option>
                  <option value="other" className="bg-stone-800">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-stone-300">Message (Optional)</label>
                <textarea id="message" rows={4} className="w-full bg-stone-900/50 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none" placeholder="Any specific requests or preferred stylist?" />
              </div>

              <button type="submit" className="w-full bg-white text-stone-900 font-medium py-4 rounded-xl hover:bg-stone-200 transition-colors">
                Request Appointment
              </button>
            </form>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12 lg:pl-8"
          >
            <div>
              <h3 className="text-3xl font-serif mb-6">Luxe Salon Main</h3>
              <p className="text-stone-400 leading-relaxed font-light text-lg mb-8">
                Located in the heart of the luxury district, our flagship salon offers an oasis of calm and premier services for our discerning clients.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex flex-shrink-0 items-center justify-center text-stone-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Location</h4>
                  <p className="text-stone-400">123 Beauty Lane, Suite 100<br/>Style City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex flex-shrink-0 items-center justify-center text-stone-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Phone</h4>
                  <p className="text-stone-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800 flex flex-shrink-0 items-center justify-center text-stone-300">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Hours</h4>
                  <ul className="text-stone-400 space-y-1">
                    <li className="flex justify-between w-48"><span>Mon - Fri:</span> <span>9am - 8pm</span></li>
                    <li className="flex justify-between w-48"><span>Saturday:</span> <span>9am - 6pm</span></li>
                    <li className="flex justify-between w-48"><span>Sunday:</span> <span>Closed</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
