"use client";

import React, { useState } from 'react';
import { Leaf, Orbit, LayoutDashboard, Flag, Monitor, Play, X, LineChart } from 'lucide-react';

const UIMockup = ({ type }: { type: 'dashboard' | 'carbon-twin' | 'challenges' }) => {
  return (
    <div className="w-full aspect-[4/3] bg-gt-surface rounded-xl border border-gt-border overflow-hidden flex flex-col shadow-sm">
      <div className="h-6 bg-gt-bg border-b border-gt-border flex items-center px-3 gap-1.5 shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400"></div>
        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
      </div>
      <div className="flex-1 p-3 flex gap-3">
        <div className="w-1/4 h-full border-r border-gt-border flex flex-col gap-2 pr-3">
          <div className="w-full h-3 bg-gt-border rounded-md"></div>
          <div className="w-3/4 h-2 bg-gt-bg rounded-md"></div>
          <div className="w-5/6 h-2 bg-gt-bg rounded-md"></div>
        </div>
        <div className="w-3/4 h-full flex flex-col gap-3">
          {type === 'dashboard' && (
            <>
              <div className="w-full h-1/3 bg-gt-primary/10 rounded-lg border border-gt-primary/20 flex items-center justify-center">
                <LineChart className="w-6 h-6 text-gt-primary opacity-50" />
              </div>
              <div className="flex gap-2 flex-1">
                <div className="w-1/2 h-full bg-gt-bg rounded-lg border border-gt-border"></div>
                <div className="w-1/2 h-full bg-gt-bg rounded-lg border border-gt-border"></div>
              </div>
            </>
          )}
          {type === 'carbon-twin' && (
            <>
              <div className="w-full flex-1 bg-gradient-to-br from-gt-primary/20 to-gt-teal/10 rounded-lg border border-gt-primary/30 flex items-center justify-center relative overflow-hidden">
                <Orbit className="w-12 h-12 text-gt-primary opacity-30" />
              </div>
            </>
          )}
          {type === 'challenges' && (
            <>
              <div className="w-full h-8 bg-gt-bg rounded-md border border-gt-border"></div>
              <div className="w-full h-16 bg-gt-primary/5 rounded-lg border border-gt-primary/20 flex items-center px-3 gap-3">
                <div className="w-8 h-8 rounded-full bg-gt-primary/20"></div>
                <div className="flex-1 h-2 bg-gt-primary/20 rounded-full">
                  <div className="w-2/3 h-full bg-gt-primary rounded-full"></div>
                </div>
              </div>
              <div className="flex gap-2 flex-1">
                <div className="w-full h-full bg-gt-bg rounded-lg border border-gt-border"></div>
                <div className="w-full h-full bg-gt-bg rounded-lg border border-gt-border"></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MobileExperience() {
  return (
    <>
      {/* 100% Native CSS Animations - Guaranteed to run on all mobile browsers */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSpore {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { transform: translateY(-20px) scale(2); opacity: 1; }
          80% { transform: translateY(-60px) scale(2); opacity: 1; }
          100% { transform: translateY(-80px) scale(0); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        @keyframes drawPath {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 1.2s cubic-bezier(0.21, 0.47, 0.32, 0.98) forwards;
        }
        .trail-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawPath 4s ease-in-out forwards;
        }
        /* Pure CSS Modal support */
        #preview:target {
          display: flex;
        }
      `}} />

      <div className="relative w-full min-h-screen bg-gt-bg flex flex-col font-sans pb-12 overflow-x-hidden">
        
        {/* CSS Only Particles */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[{l: 10, t: 20, d: 0, du: 5}, {l: 80, t: 15, d: 1, du: 6}, {l: 40, t: 50, d: 2, du: 7}, {l: 70, t: 60, d: 0.5, du: 4.5}, {l: 20, t: 80, d: 3, du: 8}, {l: 90, t: 85, d: 1.5, du: 5.5}, {l: 50, t: 30, d: 4, du: 6}, {l: 30, t: 70, d: 2.5, du: 7.5}].map((spore, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gt-primary/30 rounded-full blur-[1px]"
              style={{ 
                left: `${spore.l}%`, 
                top: `${spore.t}%`,
                animation: `floatSpore ${spore.du}s linear ${spore.d}s infinite`
              }}
            />
          ))}
        </div>
        
        <header className="relative z-20 w-full pt-10 pb-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 fade-in-up">
            <Leaf className="w-6 h-6 text-gt-primary" strokeWidth={2} />
            <span className="text-lg font-black tracking-widest text-gt-dark uppercase">Greentrace</span>
          </div>
        </header>

        <main className="relative z-10 flex-1 flex flex-col items-center text-center px-6 mt-6">
          
          <div className="w-full fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gt-dark tracking-tighter leading-[1.1] mb-6">
              The trail continues<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gt-primary to-gt-teal font-serif italic font-medium">
                on a larger canvas.
              </span>
            </h1>
          </div>

          <div className="max-w-[340px] mx-auto space-y-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p className="text-[15px] font-medium text-gt-dark leading-relaxed">
              Greentrace is designed around immersive Carbon Twin simulations, sustainability analytics, interactive dashboards, and environmental forecasting.
            </p>
            <p className="text-sm font-medium text-gt-gray leading-relaxed">
              To deliver the best possible experience, Greentrace is currently available on desktop and laptop devices.
            </p>
          </div>

          {/* SVG Trail - CSS Only */}
          <div className="relative w-full h-[30vh] min-h-[250px] flex justify-center items-end overflow-hidden perspective-[1000px] mt-8 mb-4">
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gt-bg via-transparent to-gt-bg z-10"></div>
            
            <div 
              className="absolute top-10 w-64 h-64 bg-gt-primary/20 rounded-full blur-[100px]"
              style={{ animation: 'pulseGlow 8s ease-in-out infinite' }}
            />

            <svg className="absolute bottom-0 w-full h-full overflow-visible" viewBox="0 0 400 400" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trailGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#146E45" stopOpacity="0" />
                  <stop offset="50%" stopColor="#146E45" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#90B816" stopOpacity="1" />
                </linearGradient>
              </defs>

              <path 
                d="M -100 400 Q 200 300 150 150 T 200 0" 
                fill="none" 
                stroke="url(#trailGradient)" 
                strokeWidth="2"
                className="trail-path"
              />
              
              <circle r="4" fill="#90B816" style={{ filter: "drop-shadow(0 0 8px rgba(144,184,22,0.8))" }}>
                <animateMotion dur="8s" repeatCount="indefinite" path="M -100 400 Q 200 300 150 150 T 200 0" />
              </circle>
            </svg>
          </div>

          <div className="w-full max-w-[320px] flex flex-col gap-3 mb-16 relative z-30 fade-in-up" style={{ animationDelay: '0.6s' }}>
            <a 
              href="#preview"
              className="w-full py-4 bg-gt-dark text-white rounded-2xl font-bold flex items-center justify-center gap-2 px-6 shadow-[0_8px_20px_rgba(0,0,0,0.15)] active:scale-95 transition-transform"
            >
              <Play className="w-4 h-4 fill-current" />
              See What Awaits
            </a>
          </div>

          <div className="w-full max-w-[340px] mb-20 text-left">
            <div className="fade-in-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-sm font-extrabold text-gt-dark uppercase tracking-widest mb-6 border-b border-gt-border pb-3">
                What Awaits Beyond The Trail
              </h2>
            </div>

            <div className="space-y-4 relative">
              <div className="absolute top-0 bottom-0 left-[22px] w-px bg-gradient-to-b from-gt-border via-gt-primary/30 to-gt-border -z-10"></div>
              
              <div className="bg-white rounded-2xl p-4 border border-gt-border shadow-sm flex gap-4 items-start fade-in-up" style={{ animationDelay: '1.0s' }}>
                <div className="w-11 h-11 rounded-xl bg-gt-bg border border-gt-border flex items-center justify-center shrink-0">
                  <Orbit className="w-5 h-5 text-gt-primary" />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gt-dark text-sm">Carbon Twin Simulator</h3>
                  <p className="text-[13px] font-medium text-gt-gray leading-snug mt-1">Simulate future lifestyle changes.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gt-border shadow-sm flex gap-4 items-start fade-in-up" style={{ animationDelay: '1.1s' }}>
                <div className="w-11 h-11 rounded-xl bg-gt-bg border border-gt-border flex items-center justify-center shrink-0">
                  <LayoutDashboard className="w-5 h-5 text-gt-teal" />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gt-dark text-sm">Environmental Dashboard</h3>
                  <p className="text-[13px] font-medium text-gt-gray leading-snug mt-1">Understand your complete impact.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-gt-border shadow-sm flex gap-4 items-start fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="w-11 h-11 rounded-xl bg-gt-bg border border-gt-border flex items-center justify-center shrink-0">
                  <Flag className="w-5 h-5 text-gt-bright" />
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-gt-dark text-sm">Sustainability Challenges</h3>
                  <p className="text-[13px] font-medium text-gt-gray leading-snug mt-1">Build measurable environmental habits.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[340px] mb-20 text-left bg-gt-primary/5 rounded-3xl p-6 border border-gt-primary/10 fade-in-up" style={{ animationDelay: '1.4s' }}>
            <h2 className="text-sm font-extrabold text-gt-primary uppercase tracking-widest mb-6">
              Why a Larger Screen?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gt-primary mt-1.5 shrink-0" />
                <p className="text-sm font-medium text-gt-dark">Interactive Carbon Twin Simulations</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gt-teal mt-1.5 shrink-0" />
                <p className="text-sm font-medium text-gt-dark">Advanced Sustainability Analytics</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gt-bright mt-1.5 shrink-0" />
                <p className="text-sm font-medium text-gt-dark">Detailed Environmental Insights</p>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[340px] text-center pb-12 fade-in-up" style={{ animationDelay: '1.6s' }}>
            <div className="bg-white rounded-3xl p-8 border border-gt-border shadow-sm">
              <Monitor className="w-8 h-8 text-gt-dark mx-auto mb-4 opacity-80" />
              <h2 className="text-xl font-extrabold text-gt-dark mb-3">Continue on Desktop</h2>
              <p className="text-sm font-medium text-gt-gray leading-relaxed">
                Open this website from any desktop or laptop browser to access the complete Greentrace experience.
              </p>
            </div>
            <p className="text-xs font-bold text-gt-dark tracking-widest uppercase mt-12 mb-2">
              We'll be here when you're ready.
            </p>
            <p className="text-[10px] font-bold text-gt-gray uppercase tracking-[0.2em]">
              Greentrace • Environmental Intelligence
            </p>
          </div>

        </main>

        {/* Pure CSS Modal - Zero Javascript Required */}
        <div id="preview" className="fixed inset-0 z-50 items-center justify-center p-4 hidden">
          <a 
            href="#"
            className="absolute inset-0 bg-gt-dark/80 backdrop-blur-md cursor-default"
            aria-label="Close modal"
          />
          <div className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] fade-in-up">
            <div className="p-4 border-b border-gt-border flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-extrabold text-gt-dark">Platform Preview</h3>
              <a href="#" className="p-2 rounded-full hover:bg-gt-bg text-gt-gray transition-colors flex items-center justify-center">
                <X className="w-5 h-5" />
              </a>
            </div>
            <div className="overflow-y-auto p-6 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-gt-primary" />
                  <h4 className="font-bold text-gt-dark text-sm uppercase tracking-wider">Carbon Twin</h4>
                </div>
                <UIMockup type="carbon-twin" />
                <p className="text-xs text-gt-gray font-medium">Simulate future lifestyle changes instantly.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-gt-teal" />
                  <h4 className="font-bold text-gt-dark text-sm uppercase tracking-wider">Intelligence Dashboard</h4>
                </div>
                <UIMockup type="dashboard" />
                <p className="text-xs text-gt-gray font-medium">Understand your complete environmental impact.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-gt-bright" />
                  <h4 className="font-bold text-gt-dark text-sm uppercase tracking-wider">Sustainability Challenges</h4>
                </div>
                <UIMockup type="challenges" />
                <p className="text-xs text-gt-gray font-medium">Build measurable habits and track your progress.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
