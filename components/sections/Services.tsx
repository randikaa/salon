"use client";

import { motion } from "framer-motion";
import { Sparkles, Scissors, SprayCanIcon as Spray, Droplet } from "lucide-react";

const services = [
  {
    category: "Hair Styling",
    icon: Scissors,
    items: [
      { name: "Precision Cut & Style", price: "from $65", description: "Personalized consultation, wash, cut, and signature blowout." },
      { name: "Color & Highlights", price: "from $120", description: "Full color, balayage, or foil highlights with premium gloss." },
      { name: "Keratin Treatment", price: "from $250", description: "Frizz reduction and smoothing treatment lasting up to 12 weeks." },
    ]
  },
  {
    category: "Beauty & Wellness",
    icon: Sparkles,
    items: [
      { name: "Signature Facial", price: "from $95", description: "Customized 60-minute facial using botanical extracts and deep hydration." },
      { name: "Lash Extensions", price: "from $150", description: "Classic, hybrid, or volume sets tailored to your eye shape." },
      { name: "Brow Lamination", price: "from $75", description: "Includes shaping, tinting, and setting for fuller-looking brows." },
    ]
  },
  {
    category: "Nail Care",
    icon: Droplet,
    items: [
      { name: "Spa Manicure", price: "from $45", description: "Detailed cuticle work, exfoliation, massage, and polish." },
      { name: "Gel Extensions", price: "from $85", description: "Sculpted gel extensions with custom shape and design." },
      { name: "Luxury Pedicure", price: "from $65", description: "Soak, scrub, masque, extended massage, and perfect polish." },
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white text-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-stone-500 uppercase block"
          >
            Curated Experiences
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            Our Service Menu
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-500 font-light"
          >
            Tailored treatments designed to elevate your personal aesthetic and provide ultimate relaxation.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {services.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div key={section.category} variants={itemAnim} className="space-y-8">
                <div className="flex items-center gap-4 pb-4 border-b border-stone-200">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif">{section.category}</h3>
                </div>

                <div className="space-y-8">
                  {section.items.map((item) => (
                    <div key={item.name} className="group cursor-pointer">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-lg font-medium text-neutral-900 group-hover:text-stone-600 transition-colors">{item.name}</h4>
                        <div className="flex-1 border-b border-dotted border-stone-300 mx-4" />
                        <span className="text-neutral-900 font-medium">{item.price}</span>
                      </div>
                      <p className="text-sm text-neutral-500 font-light pr-12 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-colors hover:shadow-lg hover:shadow-neutral-900/20"
          >
            Book Your Consultation
          </a>
        </motion.div>

      </div>
    </section>
  );
}
