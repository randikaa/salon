"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Calendar as CalendarIcon, Clock, User, Scissors } from "lucide-react";

// Mock Data
const INCOMING_APPOINTMENTS = [
  { id: 1, client: "Emily Chen", service: "Balayage & Cut", date: "Today", time: "10:00 AM", status: "Confirmed", stylist: "Sarah" },
  { id: 2, client: "Marcus Johnson", service: "Precision Cut", date: "Today", time: "11:30 AM", status: "Pending", stylist: "David" },
  { id: 3, client: "Sarah Williams", service: "Spa Manicure", date: "Tomorrow", time: "1:00 PM", status: "Confirmed", stylist: "Lisa" },
  { id: 4, client: "Jessica Davis", service: "Signature Facial", date: "Tomorrow", time: "2:30 PM", status: "Confirmed", stylist: "Emma" },
  { id: 5, client: "Michael Brown", service: "Men's Styling", date: "Oct 24", time: "4:00 PM", status: "Cancelled", stylist: "David" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(INCOMING_APPOINTMENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.client.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          apt.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "All" || apt.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Confirmed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Appointments</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your schedule and bookings.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Booking
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search clients or services..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 transition-shadow"
          />
        </div>
        <div className="flex gap-2 bg-white p-1 rounded-xl border border-stone-200 overflow-x-auto hide-scrollbar">
          {["All", "Confirmed", "Pending", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                filter === status 
                  ? "bg-stone-100 text-neutral-900 shadow-sm" 
                  : "text-stone-500 hover:text-neutral-900 hover:bg-stone-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments Grid/List View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.map((apt, index) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(apt.status)}`}>
                {apt.status}
              </span>
              <button className="text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-neutral-900">
                •••
              </button>
            </div>
            
            <div className="mb-6 flex-1">
              <h3 className="text-lg font-bold text-neutral-900 mb-1">{apt.client}</h3>
              <div className="flex items-center text-sm text-stone-500 mb-2">
                <Scissors className="w-4 h-4 mr-2" />
                {apt.service}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">Date & Time</span>
                <div className="flex items-center text-sm text-neutral-900">
                  <CalendarIcon className="w-4 h-4 mr-1 text-stone-400" />
                  {apt.date}
                </div>
                <div className="flex items-center text-sm text-neutral-900 mt-1">
                  <Clock className="w-4 h-4 mr-1 text-stone-400" />
                  {apt.time}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">Stylist</span>
                <div className="flex items-center text-sm text-neutral-900">
                  <User className="w-4 h-4 mr-1 text-stone-400" />
                  {apt.stylist}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredAppointments.length === 0 && (
         <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 border-dashed">
            <CalendarIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900">No appointments found</h3>
            <p className="text-stone-500 mt-1">Try adjusting your filters or search query.</p>
         </div>
      )}
    </div>
  );
}
