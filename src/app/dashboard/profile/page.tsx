"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Calendar, MapPin, Award, Leaf, Flame, Droplet, Mountain, Trees, Sun, Zap, Bike, Check, Loader2, ChevronDown, Search, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/lib/contexts/ProfileContext";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan",
  "India", "Brazil", "South Africa", "Italy", "Spain", "Mexico", "Netherlands", "Sweden",
  "Switzerland", "New Zealand", "Singapore", "Norway", "Denmark", "Finland", "Ireland",
  "Argentina", "Chile", "Colombia", "South Korea", "United Arab Emirates", "Saudi Arabia",
  "Turkey", "Egypt", "Nigeria", "Kenya", "Thailand", "Vietnam", "Malaysia", "Indonesia",
  "Philippines", "Poland", "Austria", "Belgium", "Portugal", "Greece", "Czech Republic",
  "Hungary", "Romania", "Ukraine", "Israel", "Morocco", "Peru", "Venezuela"
].sort();

const AVATAR_ICONS = [
  { id: "leaf", icon: Leaf },
  { id: "flame", icon: Flame },
  { id: "droplet", icon: Droplet },
  { id: "mountain", icon: Mountain },
  { id: "trees", icon: Trees },
  { id: "sun", icon: Sun },
];

export default function ProfilePage() {
  const { profile, setProfile, isLoaded } = useProfile();
  
  const [draftProfile, setDraftProfile] = useState(profile);

  useEffect(() => {
    if (isLoaded) {
      setDraftProfile(profile);
    }
  }, [isLoaded, profile]);

  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrentIcon = AVATAR_ICONS.find(a => a.id === profile.avatar)?.icon || Leaf;
  const filteredCountries = COUNTRIES.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);
    setTimeout(() => {
      setProfile(draftProfile);
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gt-dark tracking-tight">My Profile</h1>
          <p className="text-gt-gray font-medium mt-1">Manage your public information and identity.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-gt-primary/20 to-gt-teal/10"></div>
            
            <div className="relative mt-8 flex flex-col items-center">
              
              {/* Avatar with curved text */}
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Static Premium Curved Text */}
                <div className="absolute inset-0 -m-1 rotate-[-90deg]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path id="curve" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" fill="transparent" />
                    <text className="text-[7.5px] font-bold fill-gt-gray opacity-60 tracking-[0.2em] uppercase">
                      <textPath href="#curve" startOffset="50%" textAnchor="middle">
                        Est. June 2026 • Founding Member
                      </textPath>
                    </text>
                  </svg>
                </div>

                <div className="relative w-28 h-28 bg-gt-bg rounded-full border border-gt-border shadow-xl flex items-center justify-center overflow-hidden z-10 transition-colors duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-gt-primary/90 to-gt-teal/90 flex items-center justify-center text-white backdrop-blur-md">
                    <CurrentIcon className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              
              {/* Premium Avatar Selector */}
              <div className="mt-8 mb-2 w-full bg-gt-bg rounded-2xl p-4 border border-gt-border">
                <p className="text-[10px] font-bold text-gt-gray uppercase tracking-widest text-center mb-3">Select Identity</p>
                <div className="flex justify-between items-center px-1">
                  {AVATAR_ICONS.map(({ id, icon: Icon }) => (
                    <button 
                      key={id} 
                      onClick={() => {
                        setDraftProfile({ ...draftProfile, avatar: id });
                        setProfile({ ...profile, avatar: id });
                      }} 
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        draftProfile.avatar === id 
                          ? 'bg-gt-primary text-white shadow-[0_4px_12px_rgba(20,110,69,0.3)] scale-110' 
                          : 'bg-white text-gt-gray hover:text-gt-primary hover:bg-gt-primary/5 border border-gt-border hover:scale-105 hover:border-gt-primary/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={draftProfile.avatar === id ? 2.5 : 2} />
                      {draftProfile.avatar === id && (
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-gt-bright rounded-full border-2 border-white flex items-center justify-center">
                          <Check className="w-2 h-2 text-gt-dark" strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <h2 className="text-2xl font-extrabold text-gt-dark mt-6 mb-2">{profile.firstName} {profile.lastName}</h2>
            </div>
          </div>

          {/* Environmental Badges */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border">
            <h3 className="text-lg font-bold text-gt-dark mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gt-bright" />
              Impact Badges
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="group relative bg-gradient-to-br from-gt-primary/5 to-gt-teal/5 rounded-2xl p-4 border border-gt-border hover:border-gt-primary/30 transition-all cursor-pointer overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all">
                  <Leaf className="w-24 h-24 text-gt-primary" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-gt-primary/10 flex items-center justify-center mb-3">
                  <Leaf className="w-5 h-5 text-gt-primary" />
                </div>
                <p className="font-bold text-gt-dark text-sm">Early Adopter</p>
                <p className="text-[10px] text-gt-gray font-medium uppercase mt-1">Founding Member</p>
              </div>

              <div className="group relative bg-gradient-to-br from-gt-teal/5 to-gt-bright/5 rounded-2xl p-4 border border-gt-border hover:border-gt-teal/30 transition-all cursor-pointer overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all">
                  <Bike className="w-24 h-24 text-gt-teal" />
                </div>
                <div className="w-10 h-10 rounded-xl bg-gt-teal/10 flex items-center justify-center mb-3">
                  <Bike className="w-5 h-5 text-gt-teal" />
                </div>
                <p className="font-bold text-gt-dark text-sm">Active Commuter</p>
                <p className="text-[10px] text-gt-gray font-medium uppercase mt-1">100km Cycled</p>
              </div>

              <div className="group relative bg-gradient-to-br from-gt-bright/5 to-gt-primary/5 rounded-2xl p-4 border border-gt-border hover:border-gt-bright/30 transition-all cursor-pointer overflow-hidden col-span-2">
                <div className="absolute -right-4 -top-8 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all">
                  <Zap className="w-32 h-32 text-gt-bright" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gt-bright/20 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-gt-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-gt-dark text-sm">Energy Saver Plus</p>
                    <p className="text-[10px] text-gt-gray font-medium uppercase mt-1">Reduced 50kg CO₂</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Forms & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Personal Information */}
          <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border">
            <h3 className="text-xl font-extrabold text-gt-dark mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">First Name</label>
                <input 
                  type="text" 
                  value={draftProfile.firstName}
                  onChange={e => setDraftProfile({...draftProfile, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Last Name</label>
                <input 
                  type="text" 
                  value={draftProfile.lastName}
                  onChange={e => setDraftProfile({...draftProfile, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={draftProfile.email}
                  onChange={e => setDraftProfile({...draftProfile, email: e.target.value})}
                  className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none" 
                />
              </div>
              <div className="space-y-2 md:col-span-2 relative">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Country</label>
                
                {/* Custom Premium Dropdown */}
                <div className="relative z-20" ref={dropdownRef}>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsCountryOpen(!isCountryOpen);
                      setSearchQuery("");
                    }}
                    className={`w-full px-4 py-3 bg-gt-bg border rounded-xl text-left font-medium transition-all focus:outline-none flex items-center justify-between
                      ${isCountryOpen ? 'border-gt-primary ring-2 ring-gt-primary/20 bg-white shadow-sm text-gt-dark' : 'border-gt-border hover:border-gt-primary/50 text-gt-dark'}`}
                  >
                    {draftProfile.country}
                    <ChevronDown className={`w-4 h-4 text-gt-gray transition-transform duration-300 ${isCountryOpen ? 'rotate-180 text-gt-primary' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isCountryOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 w-full mt-2 bg-white border border-gt-border rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] overflow-hidden z-20"
                      >
                        <div className="p-2 border-b border-gt-border bg-gt-bg/50">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gt-gray" />
                            <input 
                              autoFocus
                              type="text" 
                              placeholder="Search countries..." 
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-4 py-2 bg-white border border-gt-border rounded-lg text-sm text-gt-dark focus:outline-none focus:border-gt-primary focus:ring-1 focus:ring-gt-primary transition-all placeholder:text-gt-gray"
                            />
                          </div>
                        </div>
                        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gt-border scrollbar-track-transparent p-2 space-y-1">
                          {filteredCountries.length === 0 ? (
                            <div className="p-4 text-center text-sm text-gt-gray">No countries found</div>
                          ) : (
                            filteredCountries.map(c => (
                              <button
                                key={c}
                                type="button"
                                onClick={() => {
                                  setDraftProfile({ ...draftProfile, country: c });
                                  setIsCountryOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group
                                  ${draftProfile.country === c ? 'bg-gt-primary text-white shadow-md' : 'text-gt-dark hover:bg-gt-bg hover:text-gt-primary'}`}
                              >
                                {c}
                                {draftProfile.country === c && <Check className="w-4 h-4" />}
                              </button>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-gt-gray uppercase tracking-wider">Bio</label>
                <textarea rows={3} defaultValue="Passionate about sustainability and reducing my carbon footprint step by step." className="w-full px-4 py-3 bg-gt-bg border border-gt-border rounded-xl text-gt-dark font-medium focus:ring-2 focus:ring-gt-primary focus:border-gt-primary transition-all focus:outline-none resize-none"></textarea>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving || saved}
                className={`px-8 py-3 rounded-full font-bold transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center gap-2
                  ${saved 
                    ? 'bg-gt-primary text-white scale-105' 
                    : isSaving 
                      ? 'bg-gt-gray text-white opacity-80 cursor-not-allowed' 
                      : 'bg-gt-dark hover:bg-black text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]'
                  }
                `}
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                {saved && <Check className="w-4 h-4" />}
                {saved ? "Saved" : isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
