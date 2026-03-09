"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, Scissors, Sparkles, Droplets } from "lucide-react";

export function Contact() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  
  // Form data
  const [formData, setFormData] = useState({ name: "", lastName: "", email: "", phone: "", message: "" });

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date();
    date.setDate(1); // Set to beginning of month to avoid overflow issues
    return date;
  });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize today's date

  const services = [
    { id: "hair-styling", label: "Hair Styling & Color", icon: Scissors, duration: "60-120 min" },
    { id: "beauty-wellness", label: "Beauty & Wellness", icon: Sparkles, duration: "45-90 min" },
    { id: "nail-care", label: "Nail Care", icon: Droplets, duration: "30-60 min" },
  ];

  // Calendar calculations
  const daysInMonth = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  }, [currentMonth]);

  const firstDayOfMonth = useMemo(() => {
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  }, [currentMonth]);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Time slots calculations
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    const day = selectedDate.getDay();
    if (day === 0) return []; // Sunday closed

    const times = [];
    const startHour = 9;
    const endHour = day === 6 ? 18 : 20; // Sat 6pm, Weekdays 8pm

    for (let i = startHour; i < endHour; i++) {
      const ampm = i >= 12 ? 'PM' : 'AM';
      const hour12 = i > 12 ? i - 12 : (i === 0 ? 12 : i);
      // Only round hours and half hours
      times.push(`${hour12}:00 ${ampm}`);
      if (i !== endHour - 1) { // Maybe no 7:30 appointment if close is 8pm
        times.push(`${hour12}:30 ${ampm}`);
      }
    }
    return times;
  }, [selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final submission, move to success step 5
      setStep(5);
    }
  };

  const canProceed = () => {
    if (step === 1) return !!selectedService;
    if (step === 2) return !!selectedDate && !!selectedTime;
    if (step === 3) return formData.name && formData.lastName && formData.email && formData.phone;
    return true;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-stone-900 text-white relative flex flex-col items-center overflow-hidden">
      {/* Aesthetic decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-800/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neutral-800/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-stone-400 uppercase block">Book Appointment</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Reserve Your Time</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          
          {/* Interactive Booking Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 bg-stone-800/50 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-stone-700/50 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]"
          >
            {/* Step Indicator */}
            {step < 5 && (
              <div className="flex items-center justify-between mb-8 px-2 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-stone-700 -z-10" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-300 -z-10 transition-all duration-500 ease-in-out" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                {[1, 2, 3].map((num) => (
                  <div 
                    key={num} 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                      step >= num ? 'bg-white text-stone-900 shadow-lg mask-glow' : 'bg-stone-800 text-stone-400 border border-stone-600'
                    }`}
                  >
                    {step > num ? <CheckCircle2 className="w-5 h-5 text-stone-900" /> : num}
                  </div>
                ))}
              </div>
            )}

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence mode="wait">
                {/* Step 1: Services */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Select Service</h3>
                      <p className="text-stone-400 text-sm">Choose the experience you desire today.</p>
                    </div>
                    <div className="grid gap-4">
                      {services.map((svc) => (
                        <div 
                          key={svc.id} 
                          onClick={() => setSelectedService(svc.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                            selectedService === svc.id ? 'bg-white/10 border-white text-white' : 'bg-stone-900/40 border-stone-700/50 text-stone-300 hover:bg-stone-800/80 hover:border-stone-500'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            selectedService === svc.id ? 'bg-white text-stone-900' : 'bg-stone-800 text-stone-400'
                          }`}>
                            <svc.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{svc.label}</h4>
                            <p className="text-sm opacity-70">{svc.duration}</p>
                          </div>
                          {selectedService === svc.id && <CheckCircle2 className="w-6 h-6 ml-auto text-white" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">Date & Time</h3>
                      <p className="text-stone-400 text-sm">Select when you would like to visit us.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Calendar side */}
                      <div>
                        <div className="flex items-center justify-between mb-4 bg-stone-900/50 p-3 rounded-xl border border-stone-700">
                          <button onClick={handlePrevMonth} className="p-1 hover:bg-stone-700 rounded-lg transition"><ChevronLeft className="w-5 h-5"/></button>
                          <span className="font-medium text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                          <button onClick={handleNextMonth} className="p-1 hover:bg-stone-700 rounded-lg transition"><ChevronRight className="w-5 h-5"/></button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {dayNames.map(day => <span key={day} className="text-xs font-semibold text-stone-500 py-2">{day}</span>)}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                            <div key={`empty-${i}`} className="p-2" />
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
                            const isPast = date < today;
                            const isSunday = date.getDay() === 0;
                            const isSelected = selectedDate?.toDateString() === date.toDateString();
                            const disabled = isPast || isSunday;
                            
                            return (
                              <button 
                                key={`day-${i}`}
                                disabled={disabled}
                                onClick={() => { setSelectedDate(date); setSelectedTime(""); }}
                                className={`p-2 rounded-xl text-sm font-medium transition-all ${
                                  isSelected 
                                    ? 'bg-white text-stone-900 shadow-md ring-2 ring-white/50 ring-offset-2 ring-offset-stone-900 font-bold' 
                                    : disabled 
                                      ? 'text-stone-600 cursor-not-allowed opacity-50' 
                                      : 'text-stone-300 hover:bg-stone-700/50 hover:text-white cursor-pointer hover:scale-105'
                                }`}
                              >
                                {i + 1}
                              </button>
                            );
                          })}
                        </div>
                        <div className="mt-4 flex gap-4 justify-center text-xs text-stone-500">
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white"></div> Selected</div>
                          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full border border-stone-500"></div> Available</div>
                        </div>
                      </div>

                      {/* Time slots side */}
                      <div className="md:border-l border-stone-700/50 md:pl-8">
                        <h4 className="font-medium text-stone-300 mb-4 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> 
                          {selectedDate ? selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
                        </h4>
                        
                        {!selectedDate ? (
                          <div className="h-48 flex items-center justify-center text-stone-500 text-sm italic border border-dashed border-stone-700 rounded-xl bg-stone-900/20">
                            Please select a date first
                          </div>
                        ) : availableTimes.length === 0 ? (
                          <div className="h-48 flex items-center justify-center text-stone-500 text-sm border border-stone-700 rounded-xl bg-stone-900/50">
                            No available times for this day
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2 h-64 overflow-y-auto custom-scrollbar pr-2">
                            {availableTimes.map((time) => (
                                <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 px-2 rounded-xl text-sm font-medium transition-all ${
                                  selectedTime === time 
                                    ? 'bg-white text-stone-900 shadow-md transform scale-[1.02]' 
                                    : 'bg-stone-900/60 border border-stone-700/50 text-stone-300 hover:bg-stone-700/50 hover:border-stone-500'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                     <div>
                      <h3 className="text-2xl font-semibold mb-2">Your Details</h3>
                      <p className="text-stone-400 text-sm">Almost there. How should we contact you?</p>
                    </div>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-stone-300">First Name</label>
                          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all shadow-inner" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-stone-300">Last Name</label>
                          <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all shadow-inner" placeholder="Enter your last name" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-stone-300">Email Address</label>
                          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all shadow-inner" placeholder="hello@example.com" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-sm font-medium text-stone-300">Phone Number</label>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all shadow-inner" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2">
                        <label className="text-sm font-medium text-stone-300">Additional Notes (Optional)</label>
                        <textarea rows={3} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3.5 text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all resize-none shadow-inner" placeholder="Any special requests or details?" />
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 5 && (
                  <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full space-y-6 py-12">
                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-bold">Booking Confirmed!</h3>
                    <p className="text-stone-400 text-lg max-w-md">
                      Thank you, {formData.name}. Your appointment for <span className="text-white font-medium">{services.find(s => s.id === selectedService)?.label}</span> on <span className="text-white font-medium">{selectedDate?.toLocaleDateString()} at {selectedTime}</span> has been successfully booked. We&apos;ve sent a confirmation to your email.
                    </p>
                    <button onClick={() => { setStep(1); setSelectedService(""); setSelectedDate(null); setSelectedTime(""); setFormData({name: "", lastName: "", email: "", phone: "", message: ""}); }} className="mt-8 px-8 py-3 rounded-xl border border-stone-600 hover:bg-stone-800 transition-colors font-medium">
                      Book Another Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-700/50">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-stone-600 bg-stone-800/30 font-medium hover:bg-stone-800 transition-colors">
                    Back
                  </button>
                ) : (
                  <div />
                )}
                <button 
                  onClick={handleSubmit} 
                  disabled={!canProceed()}
                  className="px-8 py-3 rounded-xl bg-white text-stone-900 font-medium hover:bg-stone-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {step === 3 ? "Confirm Booking" : "Next Step"}
                </button>
              </div>
            )}
          </motion.div>

          {/* Salon Details Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-10 lg:pl-6"
          >
            <div>
              <h3 className="text-3xl font-serif mb-6 leading-tight">Salon Seven Zee Main</h3>
              <p className="text-stone-400 leading-relaxed font-light text-lg mb-8">
                Located in the heart of the luxury district, our flagship salon offers an oasis of calm and premier services for our discerning clients.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800/60 border border-stone-700/50 flex shrink-0 items-center justify-center text-stone-300 backdrop-blur-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1 text-white">Location</h4>
                  <p className="text-stone-400 leading-relaxed">123 Beauty Lane, Suite 100<br/>Style City, SC 12345</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800/60 border border-stone-700/50 flex shrink-0 items-center justify-center text-stone-300 backdrop-blur-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1 text-white">Contact</h4>
                  <p className="text-stone-400 mb-1">+1 (555) 123-4567</p>
                  <p className="text-stone-400 text-sm">contact@salonsevenzee.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-stone-800/60 border border-stone-700/50 flex shrink-0 items-center justify-center text-stone-300 backdrop-blur-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="font-medium text-lg mb-3 text-white">Hours</h4>
                  <ul className="text-stone-400 flex flex-col gap-2.5">
                    <li className="flex justify-between items-center py-1.5 border-b border-stone-800/50">
                      <span>Mon - Fri</span> 
                      <span className="font-medium text-white px-3 py-1 bg-stone-800/50 rounded-lg text-sm">9:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center py-1.5 border-b border-stone-800/50">
                      <span>Saturday</span> 
                      <span className="font-medium text-white px-3 py-1 bg-stone-800/50 rounded-lg text-sm">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center py-1.5">
                      <span>Sunday</span> 
                      <span className="font-medium text-stone-500 uppercase text-xs tracking-wider">Closed</span>
                    </li>
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
