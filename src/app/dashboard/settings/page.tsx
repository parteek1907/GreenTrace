import React from "react";
import { Bell, Shield, Lock, Globe, Smartphone, Sliders, Moon, Cloud, Check } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gt-dark tracking-tight">Account Settings</h1>
        <p className="text-gt-gray font-medium mt-1">Manage your preferences, security, and app experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gt-primary/10 text-gt-primary font-bold transition-colors">
            <Sliders className="w-5 h-5" />
            Preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gt-gray hover:text-gt-dark hover:bg-white font-bold transition-colors">
            <Bell className="w-5 h-5" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gt-gray hover:text-gt-dark hover:bg-white font-bold transition-colors">
            <Shield className="w-5 h-5" />
            Security
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gt-gray hover:text-gt-dark hover:bg-white font-bold transition-colors">
            <Cloud className="w-5 h-5" />
            Data & Privacy
          </button>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Theme Settings */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gt-bg flex items-center justify-center shrink-0">
                <Moon className="w-5 h-5 text-gt-primary" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gt-dark">Theme Preference</h3>
                <p className="text-sm font-medium text-gt-gray">Choose how GreenTrace looks to you.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Light Mode */}
              <div className="border-2 border-gt-primary rounded-2xl p-4 bg-gt-bg relative cursor-pointer">
                <div className="absolute top-3 right-3 w-5 h-5 bg-gt-primary rounded-full flex items-center justify-center text-white">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div className="w-full h-24 bg-white rounded-lg border border-gt-border mb-3 shadow-sm flex flex-col p-2 gap-2">
                  <div className="w-full h-3 bg-gt-bg rounded"></div>
                  <div className="w-2/3 h-3 bg-gt-bg rounded"></div>
                </div>
                <p className="text-center font-bold text-gt-dark">Light</p>
              </div>
              {/* Dark Mode */}
              <div className="border border-gt-border hover:border-gt-primary/50 rounded-2xl p-4 bg-gt-bg cursor-pointer transition-colors group">
                <div className="w-full h-24 bg-[#1a1a1a] rounded-lg border border-gt-border mb-3 shadow-sm flex flex-col p-2 gap-2">
                  <div className="w-full h-3 bg-white/10 rounded"></div>
                  <div className="w-2/3 h-3 bg-white/10 rounded"></div>
                </div>
                <p className="text-center font-bold text-gt-gray group-hover:text-gt-dark transition-colors">Dark</p>
              </div>
              {/* System Mode */}
              <div className="border border-gt-border hover:border-gt-primary/50 rounded-2xl p-4 bg-gt-bg cursor-pointer transition-colors group">
                <div className="w-full h-24 bg-gradient-to-r from-white to-[#1a1a1a] rounded-lg border border-gt-border mb-3 shadow-sm flex flex-col p-2 gap-2">
                  <div className="w-full h-3 bg-gt-gray/30 rounded"></div>
                  <div className="w-2/3 h-3 bg-gt-gray/30 rounded"></div>
                </div>
                <p className="text-center font-bold text-gt-gray group-hover:text-gt-dark transition-colors">System</p>
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gt-bg flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5 text-gt-primary" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gt-dark">Regional & Units</h3>
                <p className="text-sm font-medium text-gt-gray">Set your location and preferred units of measurement.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Currency</label>
                <select className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none appearance-none cursor-pointer">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Measurement Unit</label>
                <select className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none appearance-none cursor-pointer">
                  <option>Metric (kg, km)</option>
                  <option>Imperial (lbs, miles)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Push Notifications Toggle Example */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gt-bg flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-gt-primary" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gt-dark">App Behavior</h3>
                <p className="text-sm font-medium text-gt-gray">Control how the dashboard interacts with you.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gt-bg rounded-2xl border border-gt-border">
                <div>
                  <p className="font-bold text-gt-dark">Daily Reminder</p>
                  <p className="text-xs font-medium text-gt-gray mt-0.5">Get a push notification to log your daily emissions.</p>
                </div>
                {/* Custom Toggle Switch */}
                <div className="w-12 h-6 bg-gt-primary rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gt-bg rounded-2xl border border-gt-border">
                <div>
                  <p className="font-bold text-gt-dark">Weekly Summary Email</p>
                  <p className="text-xs font-medium text-gt-gray mt-0.5">Receive a detailed breakdown of your weekly progress.</p>
                </div>
                {/* Custom Toggle Switch */}
                <div className="w-12 h-6 bg-gt-border rounded-full relative cursor-pointer">
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gt-border flex justify-end">
              <button className="bg-gt-dark hover:bg-black text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md">
                Save Preferences
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
