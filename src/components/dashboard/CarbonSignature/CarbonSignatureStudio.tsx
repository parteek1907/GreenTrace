import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronRight, Wand2, Sparkles, LayoutTemplate, Palette, Check, Loader2, Leaf, Image as ImageIcon, MonitorSmartphone, Share2, Camera } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useProfile } from '@/lib/contexts/ProfileContext';
import { useCarbon } from '@/lib/contexts/CarbonContext';
import { THEMES, QUOTES } from './config';
import { CardRenderer } from './CardTemplates';
import { FocusRail } from '@/components/ui/focus-rail';

export const CarbonSignatureStudio = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { profile } = useProfile();
  const { score: carbonScore, rank, monthlyData } = useCarbon();
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState<'EDITOR' | 'GENERATING' | 'EXPORTED'>('EDITOR');
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    if (isOpen) {
      setStep('EDITOR');
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }
  }, [isOpen]);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Calculate scale based on container width or height to ensure it fits 1080x1920
        const scaleX = width / 1080;
        const scaleY = height / 1920;
        setScale(Math.min(scaleX, scaleY));
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [isOpen, step]);

  const handleExport = async (formatName: string, pixelRatio: number) => {
    if (cardRef.current === null) return;
    setIsExportMenuOpen(false);
    setStep('GENERATING');
    
    // Simulate complex crafting calculation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      const dataUrl = await toPng(cardRef.current, { 
        quality: 1, 
        pixelRatio: pixelRatio,
        width: 1080,
        height: 1920,
        style: { transform: 'scale(1)', margin: '0' }
      });
      
      const link = document.createElement('a');
      link.download = `GreenTrace-${profile.firstName}-${formatName}.png`;
      link.href = dataUrl;
      link.click();
      
      setStep('EXPORTED');
      setTimeout(() => {
        setStep('EDITOR');
      }, 3000);
    } catch (err) {
      console.error('Failed to generate image', err);
      setStep('EDITOR');
    }
  };

  const themeObj = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-transparent backdrop-blur-xl flex flex-col font-sans overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 z-50 pointer-events-auto">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-white/50 border border-gt-border hover:bg-white text-gt-dark transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                disabled={step !== 'EDITOR'}
                className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-gt-primary border border-transparent text-white font-medium hover:bg-gt-dark transition-all shadow-lg disabled:opacity-50"
              >
                {step === 'GENERATING' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step === 'EXPORTED' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                {step === 'GENERATING' ? 'Generating...' : step === 'EXPORTED' ? 'Exported!' : 'Export Card'}
              </button>

              <AnimatePresence>
                {isExportMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-4 w-64 bg-white border border-gt-border rounded-2xl overflow-hidden shadow-2xl flex flex-col z-50"
                  >
                    <button onClick={() => handleExport('Story-1x', 1)} className="flex items-center gap-3 p-4 hover:bg-gt-bg transition-colors text-left border-b border-gt-border">
                      <Camera className="w-5 h-5 text-gt-primary" />
                      <div>
                        <p className="text-sm font-bold text-gt-dark">Standard 1x</p>
                        <p className="text-xs text-gt-gray">1080 x 1920 • Mobile</p>
                      </div>
                    </button>
                    <button onClick={() => handleExport('High-2x', 2)} className="flex items-center gap-3 p-4 hover:bg-gt-bg transition-colors text-left border-b border-gt-border">
                      <Share2 className="w-5 h-5 text-gt-primary" />
                      <div>
                        <p className="text-sm font-bold text-gt-dark">Retina 2x</p>
                        <p className="text-xs text-gt-gray">2160 x 3840 • High Quality</p>
                      </div>
                    </button>
                    <button onClick={() => handleExport('Master-4x', 4)} className="flex items-center gap-3 p-4 hover:bg-gt-bg transition-colors text-left">
                      <ImageIcon className="w-5 h-5 text-gt-primary" />
                      <div>
                        <p className="text-sm font-bold text-gt-dark">Master 4x</p>
                        <p className="text-xs text-gt-gray">4320 x 7680 • Print</p>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Theme Carousel Modal Content */}
          <div className="flex-1 w-full h-full relative z-10 flex flex-col justify-center pb-12">
            <FocusRail 
              items={THEMES.map((t, idx) => ({
                id: t.id,
                title: t.name,
                imageSrc: t.image,
                meta: `Theme 0${idx + 1}`,
                node: (
                  <div className="w-[1080px] h-[1920px] origin-top-left flex pointer-events-none" style={{ transform: 'scale(0.2037)' }}>
                    <CardRenderer templateId="signature" themeId={t.id} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />
                  </div>
                )
              }))}
              initialIndex={THEMES.findIndex(t => t.id === selectedTheme)}
              onItemChange={(item) => setSelectedTheme(item.id)}
              autoPlay={false}
              loop={true}
            />
          </div>

          {/* Hidden Export Node (rendered exactly at 1080x1920 off-screen) */}
          <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
            <div ref={cardRef} className="w-[1080px] h-[1920px]">
              <CardRenderer templateId="signature" themeId={selectedTheme} profile={profile} quote={quote} carbonScore={carbonScore} rank={rank} monthlyData={monthlyData} />
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
