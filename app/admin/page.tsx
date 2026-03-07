"use client";

import { motion } from "framer-motion";
import { Users, CalendarCheck, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Appointments", value: "128", change: "+12%", icon: CalendarCheck },
    { name: "Active Clients", value: "842", change: "+5.4%", icon: Users },
    { name: "Revenue (Month)", value: "$24,500", change: "+18%", icon: TrendingUp },
    { name: "Services Performed", value: "312", change: "+2%", icon: Sparkles },
  ];

  const recentAppointments = [
    { id: 1, client: "Emily Chen", service: "Balayage & Cut", time: "10:00 AM", status: "Completed" },
    { id: 2, client: "Marcus Johnson", service: "Precision Cut", time: "11:30 AM", status: "In Progress" },
    { id: 3, client: "Sarah Williams", service: "Spa Manicure", time: "1:00 PM", status: "Upcoming" },
    { id: 4, client: "Jessica Davis", service: "Signature Facial", time: "2:30 PM", status: "Upcoming" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Overview</h1>
        <p className="text-sm text-neutral-500 mt-1">Here&apos;s what&apos;s happening at Luxe Salon today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
            </div>
            <h3 className="text-3xl font-bold text-neutral-900">{stat.value}</h3>
            <p className="text-sm text-neutral-500 font-medium mt-1">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Appointments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-neutral-900">Today&apos;s Schedule</h2>
          <button className="text-sm font-medium text-stone-600 hover:text-neutral-900">View Full Schedule &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Client</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Service</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Time</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {recentAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-neutral-900">{apt.client}</td>
                  <td className="py-4 px-6 text-sm text-neutral-500">{apt.service}</td>
                  <td className="py-4 px-6 text-sm text-neutral-900">{apt.time}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      apt.status === "Completed" ? "bg-emerald-100 text-emerald-800" :
                      apt.status === "In Progress" ? "bg-blue-100 text-blue-800" :
                      "bg-stone-100 text-stone-800"
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
