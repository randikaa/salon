"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

// Initial mock data
const INITIAL_SERVICES = [
  { id: 1, name: "Precision Cut & Style", category: "Hair Styling", price: "$65", duration: "60 min" },
  { id: 2, name: "Color & Highlights", category: "Hair Styling", price: "$120", duration: "120 min" },
  { id: 3, name: "Signature Facial", category: "Beauty & Wellness", price: "$95", duration: "60 min" },
  { id: 4, name: "Spa Manicure", category: "Nail Care", price: "$45", duration: "45 min" },
];

export default function ServicesManagement() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Services Management</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your salon&apos;s service menu and pricing.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col"
      >
        <div className="p-4 border-b border-stone-100 bg-stone-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition-shadow"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Service Name</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Category</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Duration</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Price (Starts at)</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="py-4 px-6 text-sm font-medium text-neutral-900">{service.name}</td>
                    <td className="py-4 px-6 text-sm text-neutral-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-500">{service.duration}</td>
                    <td className="py-4 px-6 text-sm font-medium text-neutral-900">{service.price}</td>
                    <td className="py-4 px-6 text-sm text-right space-x-2">
                      <button className="p-2 text-stone-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-stone-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50" title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-stone-500">
                    No services found matching &quot;{searchQuery}&quot;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
