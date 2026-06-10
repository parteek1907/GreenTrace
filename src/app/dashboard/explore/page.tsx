"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface InsightDetail {
  tip: string;
  category: string;
  title: string;
  description: string;
  impactStat: string;
  impactLabel: string;
  whyItMatters: string;
  howItWorks: string;
  steps: string[];
  funFact: string;
}

const INSIGHTS: InsightDetail[] = [
  {
    tip: "Lowering your thermostat by 2°C saves up to 180kg CO₂ per year.",
    category: "Energy",
    title: "Thermostat Optimization",
    description: "Heating and cooling account for nearly half of the average home's total energy consumption. A small reduction in your thermostat setting has a compounding effect over the course of a year — without any noticeable change in comfort.",
    impactStat: "180 kg",
    impactLabel: "CO₂ saved annually",
    whyItMatters: "Residential heating is one of the largest contributors to household carbon emissions globally. In colder climates, space heating alone can account for 60–70% of a home's energy use. Reducing the temperature by just 2°C lowers energy demand significantly, especially during peak winter months when energy grids are under the most strain.",
    howItWorks: "Every degree of heating requires energy — whether from gas, oil, or electricity. By lowering your thermostat, you directly reduce the fuel burned to maintain indoor temperature. Modern insulation and layered clothing can easily compensate for the small difference.",
    steps: [
      "Lower your thermostat by 1°C this week, then another degree the following week.",
      "Invest in a programmable or smart thermostat to automate temperature scheduling.",
      "Seal drafts around windows and doors to retain heat more efficiently.",
      "Use thick curtains during winter evenings to insulate windows.",
      "Wear a comfortable extra layer indoors instead of raising the heat."
    ],
    funFact: "If every household in the UK lowered their thermostat by 1°C, it would save enough energy to heat nearly 1 million homes for an entire year."
  },
  {
    tip: "Cycling to work twice a week saves ~360kg CO₂ annually.",
    category: "Transport",
    title: "Two-Wheeled Commute",
    description: "Short car trips produce disproportionately high emissions because the engine runs cold and inefficiently. Swapping just two commutes per week for cycling eliminates these trips entirely — and improves your health.",
    impactStat: "360 kg",
    impactLabel: "CO₂ saved annually",
    whyItMatters: "Transportation is the single largest source of greenhouse gas emissions in many developed countries. Cold-start emissions from cars are up to 3x higher per kilometre than warm-engine driving, making short trips the most carbon-inefficient form of travel.",
    howItWorks: "A typical petrol car emits roughly 0.21 kg CO₂ per kilometre. For a 10km round-trip commute done twice a week, that's over 360 kg of CO₂ per year. Cycling produces zero direct emissions and uses human energy instead of fossil fuels.",
    steps: [
      "Start with one cycling commute per week and build up to two.",
      "Plan a safe, bike-friendly route using local cycling maps.",
      "Keep your bike tires properly inflated for an easier ride.",
      "Invest in a good lock and waterproof panniers for all-weather commuting.",
      "Track your saved emissions using GreenTrace to see your impact grow."
    ],
    funFact: "If just 10% of car commuters in a mid-sized city switched to cycling twice a week, it would remove the equivalent of 50,000 cars from the road annually."
  },
  {
    tip: "Switching to a plant-based meal once a day cuts food emissions by 30%.",
    category: "Food",
    title: "Plant-Based Impact",
    description: "Food production — especially livestock farming — accounts for roughly 26% of global greenhouse gas emissions. Replacing just one meat-heavy meal each day with a plant-based alternative has a measurably large effect over a year.",
    impactStat: "300 kg",
    impactLabel: "CO₂ saved annually",
    whyItMatters: "Beef production alone generates 60 kg of CO₂-equivalent per kilogram of meat — roughly 100 times more than producing the same weight of peas. The land, water, and feed required for livestock farming drive deforestation, water scarcity, and methane emissions at industrial scale.",
    howItWorks: "Plant-based foods require a fraction of the resources. A bean-based meal produces roughly 0.5 kg CO₂, compared to 6–7 kg for a beef-based equivalent. Over 365 daily swaps, the savings compound dramatically.",
    steps: [
      "Begin with 'Meatless Mondays' and expand from there.",
      "Explore high-protein alternatives like lentils, chickpeas, and tofu.",
      "Choose locally grown, seasonal produce to further reduce transport emissions.",
      "Batch-cook plant-based meals on weekends for easy weekday swaps.",
      "Try one new plant-based recipe each week to keep meals interesting."
    ],
    funFact: "If everyone in the world ate one less beef meal per week, it would free up an area of land larger than the entire continent of Africa from agricultural use."
  },
  {
    tip: "Unplugging idle devices saves the average home 65kg CO₂ per year.",
    category: "Lifestyle",
    title: "Phantom Load Elimination",
    description: "Many household electronics continue drawing power even when turned off or in standby mode. This 'vampire power' silently adds to your energy bill and carbon footprint around the clock.",
    impactStat: "65 kg",
    impactLabel: "CO₂ saved annually",
    whyItMatters: "Standby power consumption accounts for 5–10% of residential electricity use in most developed nations. Across millions of households, this phantom load collectively burns billions of kilowatt-hours of electricity per year — the equivalent output of several power plants running continuously.",
    howItWorks: "Devices like TVs, gaming consoles, phone chargers, and microwaves maintain internal circuits in standby mode, continuously drawing small amounts of power. Unplugging them or using a switched power strip cuts this consumption to zero.",
    steps: [
      "Plug your entertainment centre into a single power strip with an on/off switch.",
      "Unplug phone and laptop chargers when not actively charging.",
      "Use smart plugs to automatically cut power to devices overnight.",
      "Identify your worst offenders — older devices tend to draw more standby power.",
      "Make it a habit: unplug before bed, plug in when needed."
    ],
    funFact: "The average US household spends roughly $100 per year on electricity for devices that are turned off. That's enough to power a modern LED light bulb for over 10 years."
  },
  {
    tip: "Line-drying clothes instead of tumble drying saves ~150kg CO₂/year.",
    category: "Energy",
    title: "Air-Dry Revolution",
    description: "Tumble dryers are among the most energy-hungry household appliances. Switching to air-drying — even partially — can significantly reduce both your electricity consumption and carbon footprint.",
    impactStat: "150 kg",
    impactLabel: "CO₂ saved annually",
    whyItMatters: "A single tumble dryer cycle uses between 2–5 kWh of electricity. For a household running 4–5 loads per week, that's over 1,000 kWh per year — roughly the same as powering a refrigerator for the entire year.",
    howItWorks: "Air-drying uses zero electricity. Clothes dry naturally through evaporation, powered entirely by ambient air and sunlight. Indoor drying racks work year-round, even in cooler climates.",
    steps: [
      "Invest in a sturdy indoor drying rack or retractable clothesline.",
      "Start by air-drying towels and bedsheets — they dry quickly and save the most energy.",
      "Use the tumble dryer only for urgent loads or during extended wet weather.",
      "Spin clothes at high speed in the washing machine first to reduce drying time.",
      "Place the drying rack near a window or in a well-ventilated room."
    ],
    funFact: "Japan has one of the lowest tumble dryer ownership rates in the developed world. Most Japanese households air-dry their laundry year-round, saving the equivalent of a small power station's output nationally."
  },
  {
    tip: "A reusable water bottle saves ~156 plastic bottles per year.",
    category: "Lifestyle",
    title: "Single-Use Elimination",
    description: "The average person who buys bottled water uses approximately three plastic bottles per week. Switching to a single reusable bottle eliminates over 150 plastic bottles annually — along with the emissions from their production and transport.",
    impactStat: "156",
    impactLabel: "plastic bottles eliminated per year",
    whyItMatters: "Plastic bottle production requires petroleum extraction, energy-intensive manufacturing, and global transportation. Only about 9% of all plastic ever produced has been recycled. The rest ends up in landfills, incinerators, or the natural environment.",
    howItWorks: "A reusable bottle replaces the entire lifecycle of a disposable one: no oil extraction, no factory production, no shipping, no disposal. A quality stainless steel bottle lasts 10+ years, replacing thousands of single-use alternatives.",
    steps: [
      "Choose a durable stainless steel or glass bottle you actually enjoy using.",
      "Keep it filled and visible — on your desk, in your bag, by the door.",
      "Install a simple water filter at home if tap water quality is a concern.",
      "Refuse single-use bottles when offered — politely ask for a glass instead.",
      "Clean your bottle daily to keep it fresh and hygienic."
    ],
    funFact: "If laid end to end, the plastic bottles used by just one country (the US) in a single year would circle the Earth over 190 times."
  },
  {
    tip: "Taking the train instead of flying saves 10x the carbon per km.",
    category: "Transport",
    title: "Rail Over Air",
    description: "Aviation is one of the most carbon-intensive forms of travel per passenger. For domestic and short-haul routes, trains offer a dramatically lower-emission alternative with comparable total journey times when you factor in airport procedures.",
    impactStat: "10×",
    impactLabel: "less carbon per kilometre",
    whyItMatters: "A single transatlantic flight can generate roughly 1 tonne of CO₂ per passenger — equivalent to the annual emissions of a person in many developing countries. Short-haul flights are even less efficient per kilometre due to the energy-intensive takeoff and landing phases.",
    howItWorks: "Trains run on electricity (increasingly from renewable sources) or efficient diesel engines, and carry hundreds of passengers on fixed infrastructure. Planes burn kerosene at high altitude, where emissions have an amplified warming effect due to contrails and high-altitude chemistry.",
    steps: [
      "For trips under 500 km, always check train options first.",
      "Book in advance for better prices — trains are often cheaper than flights when booked early.",
      "Use the travel time productively: trains offer space to work, read, or relax.",
      "Consider overnight sleeper trains for longer routes to save on hotel costs.",
      "Track your transport emissions in GreenTrace to visualise the difference."
    ],
    funFact: "France banned short-haul domestic flights on routes where a train alternative exists in under 2.5 hours — saving an estimated 55,000 tonnes of CO₂ per year."
  },
];

export default function ExplorePage() {
  const [insight, setInsight] = useState<InsightDetail | null>(null);

  useEffect(() => {
    const dayIndex = new Date().getDay();
    setInsight(INSIGHTS[dayIndex % INSIGHTS.length]);
  }, []);

  if (!insight) return null;

  return (
    <div className="w-full min-h-screen bg-[#F6F4EE] px-6 lg:px-12 py-8 lg:py-12 font-sans text-gt-dark">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-gt-gray hover:text-gt-dark transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gt-primary mb-5">
            Insight / {insight.category}
          </p>
          <h1 className="text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.15] mb-5 text-gt-dark">
            {insight.title}
          </h1>
          <p className="text-lg lg:text-xl text-gt-dark/70 font-normal leading-relaxed max-w-2xl">
            {insight.description}
          </p>
        </motion.header>

        {/* Visual Divider & Stat Focus */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.95 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="w-full border-t border-gt-dark/10 pt-8 mb-14 flex flex-col md:flex-row md:items-baseline gap-3"
        >
          <span className="text-4xl lg:text-5xl font-normal text-gt-primary tracking-tight">
            {insight.impactStat}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-gt-gray">
            {insight.impactLabel}
          </span>
        </motion.div>

        {/* Article Body */}
        <div className="space-y-14">
          
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-gt-gray mb-5">
              Why it matters
            </h2>
            <p className="text-[17px] text-gt-dark/80 leading-[1.8] font-normal max-w-2xl">
              {insight.whyItMatters}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-gt-gray mb-5">
              How it works
            </h2>
            <p className="text-[17px] text-gt-dark/80 leading-[1.8] font-normal max-w-2xl">
              {insight.howItWorks}
            </p>
          </motion.section>

          {/* Actionable Steps - Editorial Layout */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-[11px] font-medium uppercase tracking-[0.2em] text-gt-gray mb-6">
              Steps you can take
            </h2>
            <div className="pl-5 border-l border-gt-dark/10 space-y-5 max-w-2xl">
              {insight.steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-xs font-medium text-gt-primary/60 w-5 shrink-0 pt-1.5">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <p className="text-[17px] text-gt-dark/80 leading-[1.7] font-normal">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Editorial Blockquote / Fun Fact */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-10 pb-16"
          >
            <div className="border-l-2 border-gt-primary/30 pl-6 py-1 max-w-2xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-gt-primary/80 mb-3">
                Did you know?
              </p>
              <p className="text-xl text-gt-dark/80 leading-relaxed font-normal italic">
                "{insight.funFact}"
              </p>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
