"use client";

import { useState } from "react";
import { Save, Bell, Shield, User, Store } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your salon preferences and account settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="lg:w-64 flex-shrink-0 space-y-1">
          {[
            { id: "general", label: "General", icon: Store },
            { id: "account", label: "Account", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
            { id: "security", label: "Security", icon: Shield },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                activeTab === tab.id
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-100 hover:text-neutral-900"
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? "text-white" : "text-stone-400"}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === "general" && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-neutral-900">Salon Details</h2>
                  <p className="text-sm text-stone-500">Update your public facing salon information.</p>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Salon Name</label>
                    <input type="text" defaultValue="Salon Seven Zee" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-900">Phone Number</label>
                    <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-neutral-900">Contact Email</label>
                    <input type="email" defaultValue="contact@salonsevenzee.com" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-neutral-900">Address</label>
                    <textarea rows={3} defaultValue="123 Beauty Lane, Suite 100\nStyle City, SC 12345" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm resize-none" />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end">
                  <button className="inline-flex items-center px-6 py-2.5 bg-neutral-900 text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "general" && (
             <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-12 text-center">
                 <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                    {activeTab === 'account' && <User className="w-8 h-8" />}
                    {activeTab === 'notifications' && <Bell className="w-8 h-8" />}
                    {activeTab === 'security' && <Shield className="w-8 h-8" />}
                 </div>
                 <h2 className="text-lg font-bold text-neutral-900 capitalize">{activeTab} Settings</h2>
                 <p className="text-stone-500 mt-2">This module is currently in development. You will be able to manage your {activeTab} preferences here soon.</p>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
