import React from 'react';
import { Leaf, Award, TrendingDown, Flag, Zap, QrCode, Sparkles, Globe2, Activity } from 'lucide-react';
import { Theme, THEMES } from './config';
import { ProfileData } from '@/lib/contexts/ProfileContext';
import { CarbonScore, MonthlyDataPoint } from '@/types/carbon';
import { formatCO2 } from '@/lib/utils/formatters';

interface CardProps {
  theme: Theme;
  profile: ProfileData;
  quote: string;
  carbonScore: CarbonScore;
  rank: { name: string; description: string };
  monthlyData: MonthlyDataPoint[];
}

// Professional Image Processing Engine
const AestheticBackground = ({ theme }: { theme: Theme }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#050505]">
    {/* Base High-Res Image Layer */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
      style={{ backgroundImage: `url(${theme.image})` }}
    />
    
    {/* Heavy Blur Layer */}
    <div className={`absolute inset-0 ${theme.blur}`} />

    {/* Deep Tint Overlay (e.g. dark forest green over the blurred image) */}
    <div className={`absolute inset-0 ${theme.overlay} mix-blend-multiply`} />

    {/* Light Particle Glows & Gradients */}
    <div className={`absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-40 blur-[120px] rounded-full mix-blend-screen bg-gradient-to-br ${theme.gradient}`}></div>
    
    {/* Topographic Flow Lines */}
    <svg className={`absolute inset-0 w-full h-full opacity-20 ${theme.accent}`} viewBox="0 0 1080 1920" preserveAspectRatio="none" fill="none">
      <path d="M-200 400 Q 300 300 500 800 T 1280 600" stroke="currentColor" strokeWidth="4" opacity="0.4"/>
      <path d="M-200 500 Q 400 400 600 900 T 1280 700" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
      <path d="M-200 600 Q 500 500 700 1000 T 1280 800" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
      <circle cx="500" cy="800" r="400" stroke="currentColor" strokeWidth="2" opacity="0.1" strokeDasharray="10 20" />
      <circle cx="500" cy="800" r="600" stroke="currentColor" strokeWidth="1" opacity="0.05" strokeDasharray="5 15" />
    </svg>

    {/* Premium Noise Grain */}
    <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

    {/* Ambient Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] opacity-90"></div>
  </div>
);

const PremiumBadge = ({ label, theme, icon: Icon = Award }: { label: string; theme: Theme, icon?: React.ElementType }) => (
  <div className={`px-6 py-4 rounded-full ${theme.glass} border border-current/20 backdrop-blur-2xl flex items-center gap-3 ${theme.textPrimary} shadow-2xl`}>
    <Icon className={`w-6 h-6 ${theme.accent}`} strokeWidth={2.5} />
    <span className="text-[18px] font-black tracking-widest uppercase">{label}</span>
  </div>
);

// Type 1: Carbon Signature (Luxury Identity Card)
export const CarbonSignatureCard = ({ theme, profile, quote, carbonScore, rank, monthlyData }: CardProps) => (
  <div className={`relative w-[1080px] h-[1920px] flex flex-col justify-between p-16 overflow-hidden`}>
    <AestheticBackground theme={theme} />
    
    {/* Header */}
    <div className="relative z-10 flex justify-between items-start">
      <div className="space-y-3">
        <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${theme.glass} border border-current/10 backdrop-blur-xl`}>
          <Globe2 className={`w-5 h-5 ${theme.accent}`} />
          <span className={`text-[14px] font-black tracking-[0.4em] uppercase ${theme.textSecondary}`}>Greentrace</span>
        </div>
        <p className={`text-[18px] font-black tracking-[0.5em] uppercase ${theme.textPrimary}`}>Signature: GT-{carbonScore.score}-A</p>
      </div>
      <QrCode className={`w-20 h-20 ${theme.accent} opacity-50`} strokeWidth={1.5} />
    </div>

    {/* Middle: Massive Hero */}
    <div className="relative z-10 flex flex-col justify-center flex-1 py-16">
      <p className={`text-2xl font-black tracking-[0.5em] uppercase mb-8 ${theme.textSecondary}`}>
        {rank.name}
      </p>
      <h2 className={`text-[96px] font-black tracking-tighter leading-[0.9] mb-16 ${theme.textPrimary} drop-shadow-2xl`}>
        {profile.firstName}<br />{profile.lastName}
      </h2>

      {/* Hero Metrics */}
      <div className="flex items-center gap-10 mb-16 relative group">
        <div className={`absolute -inset-10 bg-gradient-to-r ${theme.gradient} opacity-30 blur-[100px] mix-blend-screen rounded-full`}></div>
        
        <div className="flex flex-col">
          <p className={`text-2xl font-bold tracking-[0.3em] uppercase ${theme.textSecondary} mb-2`}>Grade</p>
          <span className={`relative text-[160px] font-black leading-none tracking-tighter ${theme.accent}`} style={{ textShadow: '0 40px 80px rgba(0,0,0,0.6)' }}>
            {carbonScore.grade}
          </span>
        </div>
        
        <div className="w-[2px] h-32 bg-white/10 mx-4"></div>

        <div className="flex flex-col">
          <p className={`text-2xl font-bold tracking-[0.3em] uppercase ${theme.textSecondary} mb-2`}>Score</p>
          <span className={`text-[120px] font-black leading-none ${theme.textPrimary} tracking-tighter drop-shadow-2xl`}>
            {carbonScore.score}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-4">
        <PremiumBadge label={`Top ${100 - carbonScore.percentile}% Globally`} theme={theme} icon={Globe2} />
        <PremiumBadge label={rank.name} theme={theme} icon={Award} />
      </div>
    </div>

    {/* Footer: Storytelling */}
    <div className="relative z-10 pt-16 border-t-[1.5px] border-white/10">
      <p className={`text-[42px] font-serif italic mb-12 leading-relaxed ${theme.textPrimary} opacity-95 drop-shadow-2xl`}>"{quote}"</p>
      <div className="flex justify-between items-end">
        <p className={`text-[16px] font-black tracking-[0.5em] uppercase ${theme.textSecondary}`}>greentrace.app</p>
        <div className={`p-4 rounded-full ${theme.glass} backdrop-blur-2xl`}>
          <Leaf className={`w-8 h-8 ${theme.accent}`} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  </div>
);

// Type 2: Impact Snapshot (Massive Visualizer)
export const ImpactSnapshotCard = ({ theme, profile, quote, carbonScore, rank, monthlyData }: CardProps) => {
  const currentMonth = monthlyData[monthlyData.length - 1];
  const prevMonth = monthlyData[monthlyData.length - 2];
  const monthlyReduction = prevMonth && currentMonth ? prevMonth.totalKg - currentMonth.totalKg : 0;
  const reductionPct = prevMonth && prevMonth.totalKg > 0 ? (monthlyReduction / prevMonth.totalKg) * 100 : 0;
  const treesPlanted = Math.max(0, Math.round(monthlyReduction / 22));

  return (
    <div className={`relative w-[1080px] h-[1920px] flex flex-col justify-between p-16 overflow-hidden`}>
      <AestheticBackground theme={theme} />
      
      <div className="relative z-10">
        <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${theme.glass} border border-current/10 backdrop-blur-xl mb-4`}>
          <Activity className={`w-5 h-5 ${theme.accent}`} />
          <span className={`text-[14px] font-black tracking-[0.4em] uppercase ${theme.textSecondary}`}>Impact Snapshot</span>
        </div>
        <p className={`text-[20px] font-black tracking-[0.5em] uppercase ${theme.textPrimary}`}>{profile.firstName} {profile.lastName}</p>
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 py-16 space-y-20">
        
        {/* Massive Reduction Metric */}
        <div className={`p-16 rounded-[60px] ${theme.glass} border-l-[12px] border-l-current backdrop-blur-3xl shadow-2xl relative overflow-hidden`} style={{ borderLeftColor: 'currentColor', color: theme.accent.replace('text-', '') }}>
          <div className={`absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-current opacity-30 blur-[120px] rounded-full`}></div>
          <p className={`text-[24px] font-black uppercase tracking-[0.4em] mb-6 text-white/80 relative z-10`}>Reduced Emissions By</p>
          <div className="flex items-baseline gap-4 relative z-10">
            <p className={`text-[200px] font-black tracking-tighter leading-none text-white drop-shadow-2xl`}>{Math.max(0, Math.round(reductionPct))}</p>
            <p className={`text-[100px] font-black text-current`}>%</p>
          </div>
        </div>

        <div className="space-y-6">
          <p className={`text-[20px] font-black uppercase tracking-[0.4em] ${theme.textSecondary}`}>Real World Equivalent</p>
          <p className={`text-[56px] font-bold leading-tight ${theme.textPrimary}`}>
            You saved <span className={`font-black ${theme.accent}`}>{Math.max(0, monthlyReduction)}kg CO₂</span>, equal to planting <span className={`font-black ${theme.accent}`}>{treesPlanted} fully-grown trees</span> this month.
          </p>
        </div>

        <div className="flex gap-5">
          <PremiumBadge label="Top Percentile" theme={theme} icon={Flag} />
          <PremiumBadge label={rank.name} theme={theme} icon={Zap} />
        </div>
      </div>

      <div className="relative z-10 pt-16 border-t-[1.5px] border-white/10">
        <p className={`text-[42px] font-serif italic mb-12 leading-relaxed ${theme.textPrimary} opacity-95 drop-shadow-2xl`}>"{quote}"</p>
        <div className="flex justify-between items-end">
          <p className={`text-[16px] font-black tracking-[0.5em] uppercase ${theme.textSecondary}`}>greentrace.app</p>
          <div className={`p-4 rounded-full ${theme.glass} backdrop-blur-2xl`}>
            <TrendingDown className={`w-8 h-8 ${theme.accent}`} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Type 3: Carbon Twin Evolution (Current vs Future)
export const TwinAchievementCard = ({ theme, profile, quote, carbonScore, rank, monthlyData }: CardProps) => {
  const currentTotal = carbonScore.totalKgCo2Yearly;
  const projectedFuture = Math.round(currentTotal * 0.75); // Using the 25% target goal
  const reductionTargetPct = 25;

  return (
    <div className={`relative w-[1080px] h-[1920px] flex flex-col justify-between p-16 overflow-hidden`}>
      <AestheticBackground theme={theme} />
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-3">
          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full ${theme.glass} border border-current/10 backdrop-blur-xl`}>
            <Sparkles className={`w-5 h-5 ${theme.accent}`} />
            <span className={`text-[14px] font-black tracking-[0.4em] uppercase ${theme.textSecondary}`}>Evolution Complete</span>
          </div>
          <p className={`text-[18px] font-black tracking-[0.5em] uppercase ${theme.textPrimary}`}>Carbon Twin 2026</p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center justify-center flex-1 py-16">
        
        <h3 className={`text-[120px] font-black tracking-tighter leading-none mb-16 ${theme.textPrimary} drop-shadow-2xl`}>
          Planet<br/>Positive.
        </h3>

        {/* Glass Panel: Current vs Projected */}
        <div className={`w-full max-w-[800px] p-12 rounded-[50px] ${theme.glass} border border-current/20 backdrop-blur-2xl shadow-2xl text-left relative overflow-hidden`} style={{ borderColor: theme.accent.replace('text-', '') }}>
          <div className={`absolute inset-0 bg-current opacity-10 blur-[100px] rounded-full`} style={{ color: theme.accent.replace('text-', '') }}></div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex justify-between items-end">
              <div>
                <p className={`text-2xl font-bold tracking-[0.3em] uppercase ${theme.textSecondary} mb-3`}>Current Footprint</p>
                <p className={`text-6xl font-bold ${theme.textPrimary}`}>{formatCO2(currentTotal)} kg</p>
              </div>
              <TrendingDown className={`w-16 h-16 text-white/20`} />
            </div>
            
            <div className="w-full h-[2px] bg-white/10 relative">
              <div className={`absolute top-0 left-0 h-full w-[${100 - reductionTargetPct}%] bg-current`} style={{ color: theme.accent.replace('text-', '') }}></div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className={`text-2xl font-bold tracking-[0.3em] uppercase ${theme.accent} mb-3`}>Projected Target Goal</p>
                <p className={`text-[96px] font-black leading-none text-white drop-shadow-lg`}>{formatCO2(projectedFuture)} kg</p>
              </div>
              <div className={`px-6 py-3 rounded-full bg-current/20 text-current font-black text-2xl tracking-widest`} style={{ color: theme.accent.replace('text-', '') }}>
                -{reductionTargetPct}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <PremiumBadge label={rank.name} theme={theme} icon={Globe2} />
        </div>
      </div>

      <div className="relative z-10 pt-16 border-t-[1.5px] border-white/10">
        <p className={`text-[16px] font-black tracking-[0.5em] uppercase text-center ${theme.textSecondary}`}>{profile.firstName} {profile.lastName} • greentrace.app</p>
      </div>
    </div>
  );
};

export const CardRenderer = ({ templateId, themeId, profile, quote, carbonScore, rank, monthlyData }: { templateId: string, themeId: string, profile: ProfileData, quote: string, carbonScore: CarbonScore, rank: { name: string; description: string }, monthlyData: MonthlyDataPoint[] }) => {
  const theme = THEMES.find(t => t.id === themeId) || THEMES[0];
  
  switch(templateId) {
    case 'signature':
      return <CarbonSignatureCard theme={theme} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />;
    case 'snapshot':
      return <ImpactSnapshotCard theme={theme} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />;
    case 'twin':
      return <TwinAchievementCard theme={theme} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />;
    default:
      return <CarbonSignatureCard theme={theme} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />;
  }
};
