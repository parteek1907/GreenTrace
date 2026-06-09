import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronRight, Wand2, Sparkles, LayoutTemplate, Palette, Check, Loader2, Leaf } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useProfile } from '@/lib/contexts/ProfileContext';
import { THEMES, TEMPLATES, QUOTES } from './config';
import { CardRenderer } from './CardTemplates';

export const CarbonSignatureModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { profile } = useProfile();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [step, setStep] = useState<'TEMPLATE' | 'THEME' | 'GENERATING' | 'PREVIEW'>('TEMPLATE');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0].id);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0].id);
  const [quote, setQuote] = useState(QUOTES[0]);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('TEMPLATE');
      setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    }
  }, [isOpen]);

  const handleGenerate = () => {
    setStep('GENERATING');
    setTimeout(() => {
      setStep('PREVIEW');
    }, 2500); // Premium animation duration
  };

  const handleDownload = async () => {
    if (cardRef.current === null) return;
    setIsDownloading(true);
    try {
      // Small delay to ensure rendering is perfect before capture
      await new Promise(resolve => setTimeout(resolve, 100)); 
      const dataUrl = await toPng(cardRef.current, { 
        quality: 1, 
        pixelRatio: 3,
        // Enforce the 9:16 aspect ratio explicitly during export
        width: 360,
        height: 640,
        style: { transform: 'scale(1)', margin: '0' }
      });
      const link = document.createElement('a');
      link.download = `GT-Signature-${profile.firstName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const themeObj = THEMES.find(t => t.id === selectedTheme) || THEMES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-gt-bg rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-white/10"
          >
            {/* Left/Top Area: Editor Controls */}
            <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gt-border flex flex-col bg-white">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-gt-dark tracking-tight">Carbon Signature</h2>
                  <p className="text-sm font-medium text-gt-gray mt-1">Design your premium identity card.</p>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gt-bg text-gt-gray transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto pr-2 pb-4">
                {/* Step 1: Template */}
                <div className={`transition-opacity duration-300 ${step !== 'TEMPLATE' && step !== 'THEME' ? 'opacity-30 pointer-events-none' : ''}`}>
                  <h3 className="text-sm font-bold text-gt-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-gt-primary" />
                    1. Select Template
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {TEMPLATES.slice(0, 2).map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setSelectedTemplate(t.id); setStep('THEME'); }}
                        className={`p-4 rounded-xl border text-left transition-all ${selectedTemplate === t.id ? 'border-gt-primary bg-gt-primary/5 shadow-sm' : 'border-gt-border hover:border-gt-primary/30 bg-white'}`}
                      >
                        <p className={`font-bold ${selectedTemplate === t.id ? 'text-gt-primary' : 'text-gt-dark'}`}>{t.name}</p>
                      </button>
                    ))}
                    <div className="p-4 rounded-xl border border-dashed border-gt-border bg-gt-bg/50">
                      <p className="text-sm font-medium text-gt-gray text-center">More templates unlocking soon...</p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Theme */}
                <div className={`transition-opacity duration-300 ${step !== 'THEME' && step !== 'PREVIEW' ? 'opacity-30 pointer-events-none' : ''}`}>
                  <h3 className="text-sm font-bold text-gt-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-gt-primary" />
                    2. Choose Aesthetic
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`group p-1 rounded-2xl border-2 transition-all ${selectedTheme === theme.id ? 'border-gt-primary shadow-md scale-[1.02]' : 'border-transparent hover:border-gt-border bg-gt-bg'}`}
                      >
                        <div className={`w-full h-16 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center overflow-hidden relative`}>
                          {selectedTheme === theme.id && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[2px]">
                              <Check className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs font-bold text-center mt-2 mb-1 text-gt-dark">{theme.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-auto">
                {step === 'TEMPLATE' || step === 'THEME' ? (
                  <button
                    onClick={handleGenerate}
                    className="w-full py-4 bg-gt-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                  >
                    <Wand2 className="w-5 h-5" /> Generate Signature
                  </button>
                ) : step === 'PREVIEW' ? (
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full py-4 bg-gt-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gt-primary/90 transition-all shadow-[0_8px_20px_rgba(20,110,69,0.25)] hover:shadow-[0_12px_25px_rgba(20,110,69,0.3)] disabled:opacity-70"
                  >
                    {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                    {isDownloading ? 'Processing High-Res...' : 'Download HD Card'}
                  </button>
                ) : null}
              </div>
            </div>

            {/* Right/Bottom Area: Live Preview */}
            <div className="w-full md:w-1/2 p-8 bg-[#0a0a0a] flex flex-col items-center justify-center relative min-h-[500px]">
              {step === 'TEMPLATE' || step === 'THEME' ? (
                <div className="text-center opacity-50">
                  <Sparkles className="w-12 h-12 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-white font-medium">Select your aesthetic to preview.</p>
                </div>
              ) : step === 'GENERATING' ? (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-t-2 border-r-2 border-gt-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-b-2 border-l-2 border-emerald-400 rounded-full animate-spin direction-reverse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                  <p className="text-white font-bold tracking-widest uppercase text-sm animate-pulse">Compiling Data...</p>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full flex justify-center"
                >
                  {/* The actual Card DOM Node to capture */}
                  <div className="relative shadow-2xl rounded-[32px] overflow-hidden" style={{ width: '360px', height: '640px' }}>
                    <div ref={cardRef} className="absolute inset-0" style={{ width: '360px', height: '640px' }}>
                      <CardRenderer templateId={selectedTemplate} theme={themeObj} profile={profile} quote={quote} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
