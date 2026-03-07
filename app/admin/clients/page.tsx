"use client";

import { useState } from "react";
import { Plus, Search, Mail, Phone, MoreVertical, Calendar } from "lucide-react";

// Mock Data
const INITIAL_CLIENTS = [
  { id: 1, name: "Emily Chen", email: "emily.c@example.com", phone: "(555) 123-4567", lastVisit: "Oct 12, 2023", totalVisits: 14, status: "Active" },
  { id: 2, name: "Marcus Johnson", email: "marcus.j@example.com", phone: "(555) 987-6543", lastVisit: "Sep 28, 2023", totalVisits: 8, status: "Active" },
  { id: 3, name: "Sarah Williams", email: "sarah.w@example.com", phone: "(555) 456-7890", lastVisit: "Oct 20, 2023", totalVisits: 22, status: "VIP" },
  { id: 4, name: "Jessica Davis", email: "jess.d@example.com", phone: "(555) 234-5678", lastVisit: "Aug 15, 2023", totalVisits: 3, status: "Inactive" },
  { id: 5, name: "Michael Brown", email: "mike.b@example.com", phone: "(555) 876-5432", lastVisit: "Oct 05, 2023", totalVisits: 11, status: "Active" },
];

export default function ClientsPage() {
  const [clients] = useState(INITIAL_CLIENTS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Clients directory</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your client base and view their history.</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search clients by name, email or phone..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-300 transition-shadow"
            />
          </div>
          <div className="text-sm text-stone-500 font-medium whitespace-nowrap">
            Total Clients: <span className="text-neutral-900">{filteredClients.length}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Client Name</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Contact Info</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Last Visit</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Visits</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-stone-50 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xs mr-3">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 space-y-1">
                      <div className="flex items-center text-xs text-stone-500">
                        <Mail className="w-3.5 h-3.5 mr-1.5" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-xs text-stone-500">
                        <Phone className="w-3.5 h-3.5 mr-1.5" />
                        {client.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-stone-500">
                       <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 text-stone-400" />
                        {client.lastVisit}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-neutral-900">{client.totalVisits}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        client.status === 'VIP' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                        client.status === 'Active' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <button className="p-2 text-stone-400 hover:text-neutral-900 transition-colors rounded-lg hover:bg-stone-200">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="text-stone-300 mb-2 flex justify-center"><Search className="w-8 h-8" /></div>
                    <p className="text-sm text-stone-500">No clients found matching &quot;{searchQuery}&quot;</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
