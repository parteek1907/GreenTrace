import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Car, Leaf, BatteryCharging, ShoppingBag, ArrowRight, Check, Sparkles, Loader2 } from 'lucide-react';
import { useCarbon } from '@/lib/contexts/CarbonContext';

const CATEGORIES = [
  { id: 'transport', name: 'Transport', icon: Car, color: 'text-[#146E45]', bg: 'bg-[#146E45]/10', border: 'border-[#146E45]/20' },
  { id: 'food', name: 'Food', icon: Leaf, color: 'text-[#16A085]', bg: 'bg-[#16A085]/10', border: 'border-[#16A085]/20' },
  { id: 'energy', name: 'Energy', icon: BatteryCharging, color: 'text-[#F1C40F]', bg: 'bg-[#F1C40F]/10', border: 'border-[#F1C40F]/20' },
  { id: 'purchases', name: 'Purchases', icon: ShoppingBag, color: 'text-[#C7EA46]', bg: 'bg-[#C7EA46]/10', border: 'border-[#C7EA46]/20' },
];

const ACTIVITIES: Record<string, { id: string, name: string, unit: string, impact: number }[]> = {
  transport: [
    { id: 't1', name: 'Public Transit', unit: 'km', impact: 0.1 },
    { id: 't2', name: 'Biking or Walking', unit: 'km', impact: 0 },
    { id: 't3', name: 'Carpooling', unit: 'km', impact: 0.15 },
  ],
  food: [
    { id: 'f1', name: 'Plant-based Meal', unit: 'meals', impact: 0.5 },
    { id: 'f2', name: 'Locally Sourced Food', unit: 'meals', impact: 1.2 },
    { id: 'f3', name: 'Zero Food Waste Day', unit: 'days', impact: 2.5 },
  ],
  energy: [
    { id: 'e1', name: 'Used Renewable Energy', unit: 'kWh', impact: 0 },
    { id: 'e2', name: 'Thermostat Adjusted', unit: 'hours', impact: 0.2 },
    { id: 'e3', name: 'Line-dried Clothes', unit: 'loads', impact: 1.5 },
  ],
  purchases: [
    { id: 'p1', name: 'Second-hand Item', unit: 'items', impact: 5 },
    { id: 'p2', name: 'Sustainable Brand', unit: 'items', impact: 2 },
    { id: 'p3', name: 'Repaired Item', unit: 'items', impact: 8 },
  ]
};

export const LogActivityModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { logActivity } = useCarbon();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedCategory('');
      setSelectedActivity('');
      setValue('');
      setIsSuccess(false);
    }, 500);
  };

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);
  const availableActivities = selectedCategory ? ACTIVITIES[selectedCategory] : [];
  const selectedActivityObj = availableActivities.find(a => a.id === selectedActivity);

  const handleSubmit = () => {
    if (!selectedCategory || !selectedActivityObj || !value) return;

    setIsSubmitting(true);
    
    // Calculate total impact
    const amount = Number(value);
    const totalImpactKg = amount * selectedActivityObj.impact;

    // Simulate API call and log activity
    setTimeout(() => {
      logActivity(selectedCategory, selectedActivity, amount, totalImpactKg);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    }, 1500);
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Cinematic Backdrop with Grain */}
          <div className="absolute inset-0 bg-gt-dark/80 backdrop-blur-xl" onClick={handleClose}>
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          </div>

          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl min-h-[600px] bg-gt-surface rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gt-border/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side: Brand Narrative & Visuals */}
            <div className="hidden md:flex md:w-5/12 bg-gt-primary p-10 flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,100 C30,80 70,120 100,50 L100,0 L0,0 Z" fill="currentColor" />
                 </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-full h-full opacity-20">
                 <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="80" cy="80" r="40" fill="currentColor" />
                 </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                  <Activity className="w-6 h-6 text-gt-bright" />
                </div>
                <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight mb-4">
                  Every action<br />tells a story.
                </h2>
                <p className="text-white/70 font-medium leading-relaxed">
                  Log your daily sustainability efforts. Small, consistent choices compound into massive environmental impact.
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <Sparkles className="w-4 h-4 text-gt-bright" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Impact Fact</span>
                  </div>
                  <p className="text-sm font-medium text-white/90">
                    Recording your actions increases the likelihood of habit formation by 42%.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Form Content */}
            <div className="flex-1 p-8 sm:p-10 flex flex-col bg-white relative">
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-gt-bg hover:bg-gt-border transition-colors text-gt-dark"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-24 h-24 bg-gt-success/10 rounded-full flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gt-success/20 rounded-full animate-ping" />
                        <Check className="w-10 h-10 text-gt-success" strokeWidth={3} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-extrabold text-gt-dark mb-2">Impact Logged!</h3>
                        <p className="text-gt-gray font-medium">Your action has been recorded and added to your carbon profile.</p>
                      </div>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div>
                        <h3 className="text-2xl font-extrabold text-gt-dark mb-2">What did you do today?</h3>
                        <p className="text-gt-gray font-medium">Select a category to log your sustainable action.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          const isSelected = selectedCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 ${isSelected ? `border-gt-primary bg-gt-primary/5 shadow-md scale-[1.02]` : 'border-gt-border hover:border-gt-primary/50 hover:bg-gt-bg'}`}
                            >
                              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${isSelected ? cat.bg : 'bg-gt-bg'} ${cat.color} transition-colors`}>
                                <Icon className="w-6 h-6" strokeWidth={2.5} />
                              </div>
                              <span className={`font-bold ${isSelected ? 'text-gt-dark' : 'text-gt-gray'}`}>{cat.name}</span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          onClick={() => setStep(2)}
                          disabled={!selectedCategory}
                          className="flex items-center gap-2 px-8 py-3.5 bg-gt-primary text-white font-bold rounded-xl hover:bg-gt-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                        >
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <div>
                        <button onClick={() => setStep(1)} className="text-sm font-bold text-gt-primary hover:text-gt-dark transition-colors mb-4 flex items-center gap-1">
                          &larr; Back to categories
                        </button>
                        <div className="flex items-center gap-3 mb-2">
                          {currentCategory && (
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentCategory.bg} ${currentCategory.color}`}>
                              <currentCategory.icon className="w-5 h-5" />
                            </div>
                          )}
                          <h3 className="text-2xl font-extrabold text-gt-dark">Log {currentCategory?.name}</h3>
                        </div>
                        <p className="text-gt-gray font-medium">Select the specific activity and enter the details.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gt-dark uppercase tracking-wider">Activity Type</label>
                          <div className="grid gap-3">
                            {availableActivities.map((act) => (
                              <button
                                key={act.id}
                                onClick={() => setSelectedActivity(act.id)}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${selectedActivity === act.id ? 'border-gt-primary bg-gt-primary/5' : 'border-gt-border hover:border-gt-primary/50'}`}
                              >
                                <span className={`font-bold ${selectedActivity === act.id ? 'text-gt-dark' : 'text-gt-gray'}`}>{act.name}</span>
                                {selectedActivity === act.id && <div className="w-4 h-4 rounded-full bg-gt-primary" />}
                              </button>
                            ))}
                          </div>
                        </div>

                        {selectedActivityObj && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2 pt-4"
                          >
                            <label className="text-sm font-bold text-gt-dark uppercase tracking-wider">Amount ({selectedActivityObj.unit})</label>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              placeholder={`e.g. 5 ${selectedActivityObj.unit}`}
                              className="w-full p-4 bg-gt-bg border-2 border-gt-border rounded-xl font-bold text-gt-dark focus:outline-none focus:border-gt-primary transition-colors placeholder:font-medium placeholder:text-gt-gray/50"
                            />
                          </motion.div>
                        )}
                      </div>

                      <div className="flex justify-end pt-4 mt-auto">
                        <button
                          onClick={handleSubmit}
                          disabled={!selectedActivity || !value || isSubmitting}
                          className="flex items-center gap-2 px-8 py-3.5 bg-gt-primary text-white font-bold rounded-xl hover:bg-gt-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" /> Logging...
                            </>
                          ) : (
                            <>
                              <Check className="w-5 h-5" /> Log Impact
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
