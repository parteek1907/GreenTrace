"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Check, Loader2, ArrowLeft, ShieldAlert, Trash2, Heart, Wind } from "lucide-react";
import { useProfile } from "@/lib/contexts/ProfileContext";
import { TOP_BAR_ILLUSTRATIONS, IllustrationBanner } from "@/components/dashboard/IllustrationBanner";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage() {
  const { profile, setProfile } = useProfile();
  const router = useRouter();
  
  const [topBarIllustration, setTopBarIllustration] = useState(profile.topBarIllustration);
  const [activeTab, setActiveTab] = useState<"appearance" | "account">("appearance");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isHoveringStay, setIsHoveringStay] = useState(false);

  // Sync state if profile loads asynchronously
  useEffect(() => {
    setTopBarIllustration(profile.topBarIllustration);
  }, [profile]);

  const handleSelectIllustration = (id: string) => {
    setTopBarIllustration(id);
    setProfile({ ...profile, topBarIllustration: id });
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
        
        {/* Back Navigation */}
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gt-gray hover:text-gt-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-gt-dark tracking-tight">Settings</h1>
          <p className="text-gt-gray font-medium mt-1">Customize your dashboard experience and manage your account.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <button 
              onClick={() => setActiveTab("appearance")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === "appearance" 
                  ? "bg-gt-primary/10 text-gt-primary shadow-sm" 
                  : "text-gt-gray hover:bg-gt-bg hover:text-gt-dark"
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              Appearance
            </button>
            <button 
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === "account" 
                  ? "bg-red-50 text-red-600 shadow-sm" 
                  : "text-gt-gray hover:bg-gt-bg hover:text-gt-dark"
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              Account
            </button>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            
            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 shadow-sm border border-gt-border relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-gt-bg flex items-center justify-center shrink-0 border border-gt-border shadow-inner">
                    <ImageIcon className="w-6 h-6 text-gt-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-gt-dark">Top Bar Illustration</h3>
                    <p className="text-sm font-medium text-gt-gray">Select an aesthetic banner for your dashboard.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {TOP_BAR_ILLUSTRATIONS.map((ill) => {
                    const isSelected = topBarIllustration === ill.id;
                    return (
                      <button
                        key={ill.id}
                        onClick={() => handleSelectIllustration(ill.id)}
                        className={`group relative flex flex-col p-3 rounded-2xl border-2 transition-all duration-300 text-left ${isSelected ? "border-gt-primary bg-gt-primary/5 shadow-md" : "border-gt-border hover:border-gt-primary/40"}`}
                      >
                        <div className="relative w-full h-16 rounded-xl overflow-hidden mb-3">
                            <IllustrationBanner id={ill.id} className="w-full h-full" />
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                <Check className="w-3.5 h-3.5 text-gt-primary stroke-[3]" />
                              </div>
                            )}
                        </div>
                        <span className={`font-bold px-2 ${isSelected ? "text-gt-dark" : "text-gt-gray group-hover:text-gt-dark"}`}>
                          {ill.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] p-8 shadow-sm border border-red-100 relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100 shadow-inner">
                    <ShieldAlert className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-red-600">Danger Zone</h3>
                    <p className="text-sm font-medium text-gt-gray">Irreversible account actions.</p>
                  </div>
                </div>

                <div className="border border-red-100 rounded-2xl p-6 bg-red-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div>
                    <h4 className="font-extrabold text-gt-dark text-lg mb-1">Delete Account</h4>
                    <p className="text-sm font-medium text-gt-gray max-w-sm">
                      Permanently remove your personal data, carbon offset history, and all dashboard settings. This action cannot be undone.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="shrink-0 bg-white border-2 border-red-200 text-red-600 hover:bg-red-600 hover:border-red-600 hover:text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      {/* Storytelling Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F3EDE4]"
          >
            {/* Interactive Atmospheric Background */}
            <motion.div 
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHoveringStay ? 1 : 0.05 }}
            >
              {/* Vibrant Life (When hovering stay) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[radial-gradient(circle,_#146E45_0%,_transparent_70%)] opacity-30 blur-[80px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-[radial-gradient(circle,_#C7EA46_0%,_transparent_70%)] opacity-40 blur-[40px]" />
            </motion.div>

            {/* Fading Spark (When not hovering stay) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ opacity: isHoveringStay ? 0 : 1 }}
              transition={{ duration: 1 }}
            >
              {/* Falling leaves/embers */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -50, x: 0, opacity: 0 }}
                  animate={{ 
                    y: 200, 
                    x: Math.sin(i) * 50,
                    opacity: [0, 0.4, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: 6 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: i * 1.5,
                    ease: "linear"
                  }}
                  className="absolute"
                >
                  <Wind className="w-3 h-3 text-gt-dark/10" />
                </motion.div>
              ))}
            </motion.div>

            {/* Modal Content */}
            <div className="relative z-10 max-w-lg w-full px-6 flex flex-col items-center text-center">
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8"
              >
                <h2 className="text-4xl md:text-5xl font-serif text-gt-dark tracking-tight mb-6">
                  Are you sure you want to let your trace fade?
                </h2>
                <p className="text-lg text-gt-gray font-medium leading-relaxed max-w-md mx-auto">
                  Every positive choice you've made, every kilogram of CO₂ saved, and the community you've built will be forgotten.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-col items-center gap-6 w-full mt-8"
              >
                <button
                  onMouseEnter={() => setIsHoveringStay(true)}
                  onMouseLeave={() => setIsHoveringStay(false)}
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full max-w-xs group relative overflow-hidden rounded-2xl bg-white shadow-sm border border-gt-border hover:border-gt-primary/30 transition-all duration-500"
                >
                  <div className="px-8 py-4 flex items-center justify-center gap-3">
                    <Heart className="w-5 h-5 text-gt-gray group-hover:text-gt-primary transition-colors duration-500" />
                    <span className="font-extrabold text-gt-dark text-lg tracking-wide group-hover:text-gt-primary transition-colors duration-500">I want to stay</span>
                  </div>
                  {/* Hover light sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gt-primary/5 to-transparent pointer-events-none" />
                </button>

                <button
                  onClick={() => {
                    // Force a navigation to landing page
                    router.push("/");
                  }}
                  className="text-sm font-medium text-gt-gray hover:text-red-500 transition-colors duration-300 pb-1 border-b border-transparent hover:border-red-500/30"
                >
                  Yes, erase my GreenTrace
                </button>
              </motion.div>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
