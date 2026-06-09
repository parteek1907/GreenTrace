import React from 'react';
import { Leaf, Award, TrendingDown, Flag, Zap, QrCode } from 'lucide-react';
import { Theme } from './config';
import { ProfileData } from '@/lib/contexts/ProfileContext';

interface CardProps {
  theme: Theme;
  profile: ProfileData;
  quote: string;
}

// Organic Noise & Topography Background
const AestheticBackground = ({ theme }: { theme: Theme }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Noise */}
    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    {/* Topographic Lines */}
    <svg className={`absolute inset-0 w-full h-full opacity-10 ${theme.textPrimary}`} viewBox="0 0 400 800" preserveAspectRatio="none" fill="none">
      <path d="M-50 200 Q 150 150 250 300 T 450 250" stroke="currentColor" strokeWidth="1"/>
      <path d="M-50 250 Q 200 200 300 350 T 450 300" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <path d="M-50 300 Q 250 250 350 400 T 450 350" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
      <circle cx="250" cy="300" r="150" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="4 4" />
      <circle cx="250" cy="300" r="250" stroke="currentColor" strokeWidth="1" opacity="0.1" strokeDasharray="2 6" />
    </svg>
  </div>
);

// Type 1: Carbon Signature
export const CarbonSignatureCard = ({ theme, profile, quote }: CardProps) => (
  <div className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-8 overflow-hidden`}>
    <AestheticBackground theme={theme} />
    
    {/* Top Header */}
    <div className="relative z-10 flex justify-between items-start">
      <div>
        <p className={`text-[10px] font-extrabold tracking-[0.3em] uppercase ${theme.textSecondary}`}>Greentrace</p>
        <p className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-1 ${theme.accent}`}>ID: GT-82-A</p>
      </div>
      <QrCode className={`w-6 h-6 opacity-40 ${theme.textPrimary}`} />
    </div>

    {/* Main Content */}
    <div className="relative z-10 flex flex-col pt-8">
      <h2 className={`text-4xl font-extrabold tracking-tight leading-none mb-1 ${theme.textPrimary}`}>
        {profile.firstName}<br />{profile.lastName}
      </h2>
      <p className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-8 ${theme.textSecondary}`}>
        Carbon Signature
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl ${theme.glass} backdrop-blur-md`}>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Score</p>
          <p className={`text-3xl font-extrabold ${theme.accent}`}>82</p>
        </div>
        <div className={`p-4 rounded-2xl ${theme.glass} backdrop-blur-md`}>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Grade</p>
          <p className={`text-3xl font-extrabold ${theme.textPrimary}`}>A</p>
        </div>
        <div className={`col-span-2 p-4 rounded-2xl ${theme.glass} backdrop-blur-md flex items-center justify-between`}>
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Percentile</p>
            <p className={`text-xl font-bold ${theme.textPrimary}`}>Top 12%</p>
          </div>
          <Award className={`w-8 h-8 opacity-50 ${theme.accent}`} />
        </div>
      </div>
    </div>

    {/* Footer Quote */}
    <div className="relative z-10">
      <p className={`text-lg font-serif italic mb-6 leading-relaxed ${theme.textPrimary}`}>"{quote}"</p>
      <div className={`w-full h-px opacity-20 mb-4 bg-current ${theme.textPrimary}`}></div>
      <p className={`text-[9px] font-bold tracking-widest uppercase text-center ${theme.textSecondary}`}>greentrace.app</p>
    </div>
  </div>
);

// Type 2: Impact Snapshot
export const ImpactSnapshotCard = ({ theme, profile, quote }: CardProps) => (
  <div className={`relative w-full h-full bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-8 overflow-hidden`}>
    <AestheticBackground theme={theme} />
    
    <div className="relative z-10">
      <p className={`text-[10px] font-extrabold tracking-[0.3em] uppercase ${theme.textSecondary}`}>Impact Snapshot</p>
      <p className={`text-[8px] font-bold tracking-[0.2em] uppercase mt-1 ${theme.accent}`}>{profile.firstName} {profile.lastName}</p>
    </div>

    <div className="relative z-10 flex flex-col space-y-6">
      <div className={`p-6 rounded-[24px] ${theme.glass} backdrop-blur-md border-l-4 border-l-emerald-500`}>
        <TrendingDown className={`w-6 h-6 mb-3 ${theme.accent}`} />
        <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Saved This Year</p>
        <p className={`text-4xl font-extrabold tracking-tight ${theme.textPrimary}`}>486<span className="text-xl opacity-50">kg</span></p>
        <p className={`text-xs mt-2 font-medium ${theme.textSecondary}`}>Equivalent to planting 24 trees.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-2xl ${theme.glass} backdrop-blur-md`}>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Challenges</p>
          <p className={`text-2xl font-extrabold ${theme.textPrimary}`}>17</p>
        </div>
        <div className={`p-4 rounded-2xl ${theme.glass} backdrop-blur-md`}>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${theme.textSecondary}`}>Reduction</p>
          <p className={`text-2xl font-extrabold ${theme.accent}`}>11%</p>
        </div>
      </div>
    </div>

    <div className="relative z-10">
      <div className={`w-full h-px opacity-20 mb-4 bg-current ${theme.textPrimary}`}></div>
      <div className="flex justify-between items-center">
        <p className={`text-[9px] font-bold tracking-widest uppercase ${theme.textSecondary}`}>GT-82-A</p>
        <p className={`text-[9px] font-bold tracking-widest uppercase ${theme.textSecondary}`}>greentrace.app</p>
      </div>
    </div>
  </div>
);

// Exposing a generic Renderer
export const CardRenderer = ({ templateId, ...props }: CardProps & { templateId: string }) => {
  switch (templateId) {
    case 'signature': return <CarbonSignatureCard {...props} />;
    case 'snapshot': return <ImpactSnapshotCard {...props} />;
    // We will map others to signature for now as fallback
    default: return <CarbonSignatureCard {...props} />;
  }
};
