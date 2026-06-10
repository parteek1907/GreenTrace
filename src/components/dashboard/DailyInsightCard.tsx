"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DailyInsight {
  id: string;
  category: string;
  headline: string;
  whyItMatters: string;
  carbonSavings: string;
  recommendations: string[];
}

const INSIGHTS: DailyInsight[] = [
  {
    id: "energy-thermostat",
    category: "Energy",
    headline: "Lowering your heating\nby 2°C saves 180 kg\nCO₂ every year.",
    whyItMatters: "Heating and cooling account for nearly half of the average home's energy use. Small thermostat adjustments significantly decrease the burden on the energy grid.",
    carbonSavings: "Dropping your thermostat by 2°C saves approximately 180 kg CO₂ per year and lowers your energy bill.",
    recommendations: ["Wear an extra layer indoors during winter.", "Invest in a programmable smart thermostat.", "Check your home for drafts and seal windows."],
  },
  {
    id: "transport-cycling",
    category: "Transport",
    headline: "Cycling to work twice\na week saves 360 kg\nCO₂ annually.",
    whyItMatters: "Cars emit the highest concentration of pollutants during the first few miles when the engine is cold. Replacing short trips with cycling prevents these disproportionately high emissions.",
    carbonSavings: "Cycling instead of driving for a 5km commute twice a week saves over 360 kg CO₂ annually.",
    recommendations: ["Keep your bike tires inflated for an easier ride.", "Map out a quiet, bike-friendly route.", "Invest in a sturdy basket for running errands."],
  },
  {
    id: "food-plant-based",
    category: "Food",
    headline: "One plant-based meal\na day cuts your food\nemissions by 30%.",
    whyItMatters: "Meat production requires vast amounts of land and water while emitting potent greenhouse gases. Shifting to plant-based meals directly reduces agricultural strain.",
    carbonSavings: "You can save up to 300–500 kg CO₂ annually by substituting one daily meat meal with vegetables.",
    recommendations: ["Try 'Meatless Mondays' as a starting point.", "Experiment with high-protein lentils or chickpeas.", "Opt for locally grown seasonal vegetables."],
  },
  {
    id: "lifestyle-standby",
    category: "Lifestyle",
    headline: "Unplugging idle devices\nsaves your home 65 kg\nCO₂ every year.",
    whyItMatters: "Many modern appliances draw power even when turned off. This phantom load constantly burns fossil fuels at the power plant for no functional reason.",
    carbonSavings: "Eliminating standby power can save an average household roughly 65 kg CO₂ every year.",
    recommendations: ["Plug entertainment into a single power strip.", "Unplug phone chargers when not in use.", "Use smart plugs to schedule power-downs."],
  },
  {
    id: "water-showers",
    category: "Water",
    headline: "Two minutes less in\nthe shower saves\n100 kg CO₂ a year.",
    whyItMatters: "Water purification requires significant municipal energy, and heating water at home is highly energy-intensive. Conserving hot water is a dual-action climate solution.",
    carbonSavings: "Cutting 2 minutes from a daily warm shower saves roughly 100 kg CO₂ per year.",
    recommendations: ["Install a low-flow showerhead.", "Play a 5-minute song to time your showers.", "Turn off water while lathering."],
  }
];

/* ═══════════════════════════════════════════════════════
   Premium editorial vector illustrations
   Style: Google Material / Headspace / Stripe Climate
   Rounded shapes, filled bodies, environmental scenes
   ═══════════════════════════════════════════════════════ */

const ThermostatScene = () => (
  <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
    {/* Background hill */}
    <ellipse cx="130" cy="185" rx="160" ry="50" fill="#D4E6C3" />
    <ellipse cx="130" cy="195" rx="180" ry="30" fill="#C2D9AF" />

    {/* Snow hills in background */}
    <ellipse cx="50" cy="160" rx="70" ry="25" fill="#E8E0D4" />
    <ellipse cx="220" cy="155" rx="60" ry="20" fill="#E8E0D4" />

    {/* Tree left background */}
    <rect x="35" y="105" width="7" height="50" rx="3" fill="#8B7355" />
    <circle cx="38" cy="95" r="18" fill="#1B8A5A" />
    <circle cx="28" cy="100" r="13" fill="#27AE60" />
    <circle cx="48" cy="98" r="14" fill="#146E45" />

    {/* Tree right background */}
    <rect x="210" y="110" width="6" height="40" rx="3" fill="#8B7355" />
    <ellipse cx="213" cy="100" rx="14" ry="18" fill="#27AE60" />
    <ellipse cx="205" cy="105" rx="10" ry="14" fill="#1B8A5A" />

    {/* House body */}
    <rect x="90" y="85" width="80" height="65" rx="4" fill="#F7F3ED" />
    {/* Roof */}
    <path d="M80,88 L130,48 L180,88" fill="#146E45" stroke="#146E45" strokeWidth="1" strokeLinejoin="round" />
    {/* Roof ridge detail */}
    <path d="M85,88 L130,52 L175,88" fill="#1B8A5A" />

    {/* Chimney */}
    <rect x="152" y="55" width="12" height="25" rx="2" fill="#C4B9A8" />
    {/* Smoke */}
    <circle cx="158" cy="48" r="4" fill="#E8E0D4" opacity="0.7" />
    <circle cx="162" cy="42" r="3" fill="#E8E0D4" opacity="0.5" />
    <circle cx="157" cy="37" r="2.5" fill="#E8E0D4" opacity="0.3" />

    {/* Window left — warm glow */}
    <rect x="100" y="98" width="22" height="20" rx="3" fill="#F1C40F" opacity="0.3" />
    <rect x="102" y="100" width="18" height="16" rx="2" fill="#F1C40F" opacity="0.5" />
    {/* Window panes */}
    <line x1="111" y1="100" x2="111" y2="116" stroke="#F7F3ED" strokeWidth="1.5" />
    <line x1="102" y1="108" x2="120" y2="108" stroke="#F7F3ED" strokeWidth="1.5" />
    {/* Glow effect */}
    <ellipse cx="111" cy="108" rx="16" ry="14" fill="#F1C40F" opacity="0.1" />

    {/* Window right — warm glow */}
    <rect x="138" y="98" width="22" height="20" rx="3" fill="#F1C40F" opacity="0.3" />
    <rect x="140" y="100" width="18" height="16" rx="2" fill="#F1C40F" opacity="0.5" />
    <line x1="149" y1="100" x2="149" y2="116" stroke="#F7F3ED" strokeWidth="1.5" />
    <line x1="140" y1="108" x2="158" y2="108" stroke="#F7F3ED" strokeWidth="1.5" />

    {/* Door */}
    <rect x="119" y="120" width="22" height="30" rx="3" fill="#1B8A5A" />
    <circle cx="136" cy="136" r="2" fill="#C7EA46" />
    {/* Door step */}
    <rect x="115" y="148" width="30" height="4" rx="1" fill="#C4B9A8" />

    {/* Thermostat dial — floating to the right of house */}
    <circle cx="200" cy="105" r="20" fill="#F7F3ED" stroke="#146E45" strokeWidth="2" />
    <circle cx="200" cy="105" r="15" fill="none" stroke="#C7EA46" strokeWidth="3" strokeDasharray="62 33" strokeLinecap="round" />
    <text x="200" y="109" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#146E45" fontFamily="sans-serif">20°</text>
    {/* Down arrow on dial */}
    <path d="M196,122 L200,128 L204,122" stroke="#146E45" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

    {/* Snowflakes */}
    <circle cx="60" cy="45" r="2" fill="#C4B9A8" opacity="0.5" />
    <circle cx="180" cy="35" r="1.5" fill="#C4B9A8" opacity="0.4" />
    <circle cx="100" cy="30" r="1.8" fill="#C4B9A8" opacity="0.3" />
    <circle cx="230" cy="55" r="2" fill="#C4B9A8" opacity="0.4" />
  </svg>
);

const CyclingScene = () => (
  <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
    {/* Background sky elements */}
    <circle cx="220" cy="30" r="16" fill="#F1C40F" opacity="0.6" />

    {/* Background hills */}
    <ellipse cx="130" cy="185" rx="170" ry="55" fill="#D4E6C3" />
    <ellipse cx="60" cy="165" rx="90" ry="30" fill="#C2D9AF" />
    <ellipse cx="220" cy="170" rx="70" ry="25" fill="#C2D9AF" />

    {/* City buildings — far background */}
    <rect x="175" y="80" width="18" height="55" rx="2" fill="#C4B9A8" opacity="0.5" />
    <rect x="195" y="95" width="14" height="40" rx="2" fill="#C4B9A8" opacity="0.4" />
    <rect x="211" y="88" width="16" height="47" rx="2" fill="#C4B9A8" opacity="0.45" />
    {/* Building windows */}
    <rect x="178" y="86" width="4" height="3" rx="0.5" fill="#E8E0D4" opacity="0.6" />
    <rect x="185" y="86" width="4" height="3" rx="0.5" fill="#E8E0D4" opacity="0.6" />
    <rect x="178" y="93" width="4" height="3" rx="0.5" fill="#E8E0D4" opacity="0.6" />
    <rect x="185" y="93" width="4" height="3" rx="0.5" fill="#E8E0D4" opacity="0.6" />

    {/* Trees */}
    <rect x="28" y="100" width="6" height="38" rx="3" fill="#8B7355" />
    <circle cx="31" cy="90" r="16" fill="#27AE60" />
    <circle cx="22" cy="95" r="11" fill="#1B8A5A" />
    <circle cx="40" cy="93" r="12" fill="#146E45" />

    <rect x="155" y="105" width="5" height="30" rx="2" fill="#8B7355" />
    <circle cx="157" cy="96" r="13" fill="#1B8A5A" />
    <circle cx="150" cy="100" r="9" fill="#27AE60" />

    {/* Path line */}
    <path d="M0,148 Q60,145 130,142 T260,145" stroke="#C4B9A8" strokeWidth="2" fill="none" />

    {/* Bicycle wheels */}
    <circle cx="80" cy="138" r="18" stroke="#146E45" strokeWidth="2.5" fill="none" />
    <circle cx="80" cy="138" r="2.5" fill="#146E45" />
    <circle cx="135" cy="138" r="18" stroke="#146E45" strokeWidth="2.5" fill="none" />
    <circle cx="135" cy="138" r="2.5" fill="#146E45" />

    {/* Frame */}
    <path d="M80,138 L100,112 L122,112 L135,138 M80,138 L122,112" stroke="#1B8A5A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

    {/* Seat */}
    <line x1="100" y1="112" x2="100" y2="104" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
    <line x1="94" y1="104" x2="106" y2="104" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />
    {/* Handlebar */}
    <line x1="122" y1="112" x2="124" y2="103" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
    <line x1="119" y1="103" x2="130" y2="103" stroke="#8B7355" strokeWidth="3" strokeLinecap="round" />

    {/* Person — rounded filled shapes */}
    {/* Head */}
    <circle cx="112" cy="80" r="9" fill="#D4A574" />
    {/* Hair */}
    <path d="M104,76 Q104,68 112,66 Q120,68 120,76" fill="#333" />
    {/* Ponytail */}
    <path d="M119,72 Q128,68 130,76" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
    {/* Torso */}
    <path d="M106,88 L104,104 L118,104 L116,88 Z" fill="#146E45" rx="3" />
    {/* Arms */}
    <path d="M116,92 Q122,96 126,103" stroke="#D4A574" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M106,92 Q102,96 100,104" stroke="#D4A574" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Legs */}
    <path d="M108,104 Q100,118 88,132" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M114,104 Q120,118 128,132" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* Shoes */}
    <ellipse cx="86" cy="134" rx="5" ry="3" fill="#333" />
    <ellipse cx="130" cy="134" rx="5" ry="3" fill="#333" />

    {/* Basket on front */}
    <path d="M128,108 L126,118 L140,118 L138,108" stroke="#8B7355" strokeWidth="1.5" fill="#E8E0D4" strokeLinejoin="round" />
    {/* Plant in basket */}
    <path d="M131,112 Q133,105 136,111" fill="#27AE60" />
    <line x1="133" y1="112" x2="133" y2="108" stroke="#1B8A5A" strokeWidth="0.8" />

    {/* Small flowers on ground */}
    <circle cx="55" cy="147" r="2" fill="#C7EA46" />
    <circle cx="160" cy="144" r="1.5" fill="#C7EA46" />
    <circle cx="240" cy="148" r="2" fill="#C7EA46" />
  </svg>
);

const PlantFoodScene = () => (
  <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
    {/* Table surface */}
    <rect x="30" y="110" width="200" height="8" rx="3" fill="#C4B9A8" />
    {/* Table legs */}
    <rect x="50" y="118" width="6" height="60" rx="2" fill="#8B7355" />
    <rect x="204" y="118" width="6" height="60" rx="2" fill="#8B7355" />

    {/* Large bowl */}
    <ellipse cx="130" cy="108" rx="55" ry="12" fill="#C4B9A8" />
    <path d="M75,108 Q75,70 130,70 Q185,70 185,108" fill="#F7F3ED" />
    <ellipse cx="130" cy="70" rx="55" ry="10" fill="white" />

    {/* Vegetables and food in bowl */}
    {/* Leafy greens */}
    <path d="M100,80 Q110,55 125,78" fill="#27AE60" />
    <path d="M108,82 Q118,60 130,80" fill="#2ECC71" opacity="0.8" />
    <path d="M135,78 Q145,58 155,76" fill="#1B8A5A" />
    {/* Tomato */}
    <circle cx="115" cy="85" r="8" fill="#E74C3C" opacity="0.7" />
    <path d="M113,78 Q115,75 117,78" fill="#27AE60" />
    {/* Carrot pieces */}
    <ellipse cx="148" cy="88" rx="6" ry="4" fill="#E67E22" opacity="0.7" transform="rotate(-15 148 88)" />
    <ellipse cx="140" cy="92" rx="5" ry="3.5" fill="#E67E22" opacity="0.6" transform="rotate(10 140 92)" />
    {/* Avocado half */}
    <ellipse cx="108" cy="92" rx="9" ry="7" fill="#27AE60" />
    <circle cx="108" cy="92" r="4" fill="#8B7355" opacity="0.5" />
    {/* Seeds/grains */}
    <circle cx="130" cy="90" r="2" fill="#F1C40F" opacity="0.6" />
    <circle cx="135" cy="93" r="1.5" fill="#F1C40F" opacity="0.5" />
    <circle cx="125" cy="94" r="2" fill="#F1C40F" opacity="0.6" />
    {/* More leaves on top */}
    <path d="M120,72 Q128,60 138,70" fill="#1B8A5A" opacity="0.6" />

    {/* Steam wisps */}
    <path d="M115,60 Q112,48 116,40" stroke="#C4B9A8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
    <path d="M135,58 Q138,46 134,38" stroke="#C4B9A8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
    <path d="M150,62 Q147,50 150,42" stroke="#C4B9A8" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />

    {/* Fork left */}
    <rect x="55" y="72" width="3" height="35" rx="1" fill="#C4B9A8" transform="rotate(-20 55 72)" />
    <line x1="51" y1="72" x2="50" y2="65" stroke="#C4B9A8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="54" y1="71" x2="53" y2="64" stroke="#C4B9A8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="57" y1="70" x2="56" y2="63" stroke="#C4B9A8" strokeWidth="1.5" strokeLinecap="round" />

    {/* Knife right */}
    <rect x="196" y="70" width="3" height="38" rx="1" fill="#C4B9A8" transform="rotate(20 196 70)" />

    {/* Small plant in pot — right side */}
    <rect x="215" y="85" width="18" height="22" rx="4" fill="#C4B9A8" />
    <path d="M224,85 Q218,70 224,58 Q230,70 224,85" fill="#27AE60" />
    <path d="M224,72 Q215,62 224,52" stroke="#1B8A5A" strokeWidth="1" fill="none" />
    <path d="M224,72 Q233,62 224,55" stroke="#1B8A5A" strokeWidth="1" fill="none" />

    {/* Small herb sprig — left side */}
    <rect x="25" y="88" width="14" height="18" rx="3" fill="#E8E0D4" />
    <path d="M32,88 Q28,78 32,68 Q36,78 32,88" fill="#2ECC71" />
  </svg>
);

const UnplugScene = () => (
  <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
    {/* Room floor */}
    <rect x="0" y="145" width="260" height="35" fill="#E8E0D4" />

    {/* Wall */}
    <rect x="0" y="0" width="260" height="145" fill="#F3EDE4" />

    {/* Wall outlet */}
    <rect x="170" y="80" width="22" height="30" rx="4" fill="white" stroke="#C4B9A8" strokeWidth="1.5" />
    <circle cx="177" cy="92" r="2.5" fill="#C4B9A8" />
    <circle cx="185" cy="92" r="2.5" fill="#C4B9A8" />

    {/* Person — crouching and unplugging */}
    {/* Head */}
    <circle cx="120" cy="72" r="11" fill="#D4A574" />
    {/* Hair */}
    <path d="M110,68 Q110,58 120,55 Q130,58 130,68" fill="#333" />
    {/* Body/torso — leaning forward */}
    <path d="M114,82 Q112,100 110,108 L128,108 Q126,100 124,82 Z" fill="#1B8A5A" />
    {/* Right arm reaching toward outlet */}
    <path d="M124,88 Q140,85 155,88" stroke="#D4A574" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Hand */}
    <circle cx="157" cy="88" r="4" fill="#D4A574" />
    {/* Left arm on knee */}
    <path d="M114,88 Q105,95 100,105" stroke="#D4A574" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Legs — crouching */}
    <path d="M112,108 Q100,125 95,140" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M126,108 Q130,125 135,140" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round" />
    {/* Shoes */}
    <ellipse cx="93" cy="142" rx="6" ry="3.5" fill="#333" />
    <ellipse cx="137" cy="142" rx="6" ry="3.5" fill="#333" />

    {/* Plug being pulled — with gap from outlet */}
    <rect x="155" y="84" width="11" height="14" rx="2" fill="#333" />
    {/* Prongs */}
    <line x1="163" y1="88" x2="168" y2="88" stroke="#C4B9A8" strokeWidth="2" strokeLinecap="round" />
    <line x1="163" y1="93" x2="168" y2="93" stroke="#C4B9A8" strokeWidth="2" strokeLinecap="round" />

    {/* Action lines */}
    <line x1="148" y1="82" x2="143" y2="79" stroke="#C7EA46" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="148" y1="90" x2="142" y2="90" stroke="#C7EA46" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <line x1="148" y1="98" x2="143" y2="101" stroke="#C7EA46" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

    {/* TV on stand */}
    <rect x="20" y="85" width="55" height="35" rx="3" fill="#333" />
    <rect x="23" y="88" width="49" height="28" rx="2" fill="#444" />
    {/* TV off indicator */}
    <circle cx="47" cy="102" r="3" fill="#C4B9A8" opacity="0.3" />
    {/* TV stand */}
    <rect x="35" y="120" width="25" height="4" rx="1" fill="#8B7355" />
    <rect x="40" y="124" width="15" height="20" rx="1" fill="#8B7355" />

    {/* Power strip on floor */}
    <rect x="85" y="138" width="55" height="10" rx="4" fill="white" stroke="#C4B9A8" strokeWidth="1" />
    {/* Outlets on strip */}
    <rect x="92" y="141" width="8" height="5" rx="1" fill="#E8E0D4" />
    <rect x="105" y="141" width="8" height="5" rx="1" fill="#E8E0D4" />
    <rect x="118" y="141" width="8" height="5" rx="1" fill="#E8E0D4" />
    {/* Switch */}
    <circle cx="132" cy="143" r="3" fill="#E74C3C" opacity="0.6" />

    {/* Small plant */}
    <rect x="225" y="118" width="14" height="22" rx="4" fill="#C4B9A8" />
    <path d="M232,118 Q226,105 232,94 Q238,105 232,118" fill="#27AE60" />
  </svg>
);

const WaterScene = () => (
  <svg viewBox="0 0 260 180" fill="none" className="w-full h-full">
    {/* Background — soft landscape */}
    <ellipse cx="130" cy="188" rx="170" ry="50" fill="#D4E6C3" />

    {/* Rolling hills */}
    <ellipse cx="60" cy="165" rx="80" ry="25" fill="#C2D9AF" />
    <ellipse cx="210" cy="168" rx="70" ry="22" fill="#C2D9AF" />

    {/* Sun */}
    <circle cx="40" cy="35" r="18" fill="#F1C40F" opacity="0.5" />

    {/* Large water drop — central element */}
    <path d="M130,25 Q100,80 100,115 Q100,150 130,155 Q160,150 160,115 Q160,80 130,25 Z" fill="#5DADE2" opacity="0.25" />
    <path d="M130,35 Q108,82 108,112 Q108,142 130,147 Q152,142 152,112 Q152,82 130,35 Z" fill="#5DADE2" opacity="0.35" />
    {/* Drop highlight */}
    <ellipse cx="120" cy="80" rx="6" ry="14" fill="white" opacity="0.3" transform="rotate(-15 120 80)" />

    {/* Plant growing from base of drop */}
    {/* Stem */}
    <line x1="130" y1="155" x2="130" y2="175" stroke="#1B8A5A" strokeWidth="3" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M130,170 Q118,162 130,155" fill="#27AE60" />
    <path d="M130,170 Q142,162 130,155" fill="#2ECC71" />
    <path d="M130,165 Q115,155 130,148" fill="#1B8A5A" opacity="0.7" />
    <path d="M130,165 Q145,155 130,148" fill="#27AE60" opacity="0.7" />
    {/* Small leaf pair lower */}
    <path d="M130,175 Q122,170 130,165" fill="#2ECC71" opacity="0.6" />
    <path d="M130,175 Q138,170 130,165" fill="#27AE60" opacity="0.6" />

    {/* Small trees left */}
    <rect x="28" y="128" width="5" height="28" rx="2" fill="#8B7355" />
    <circle cx="30" cy="120" r="12" fill="#27AE60" />
    <circle cx="23" cy="124" r="8" fill="#1B8A5A" />

    {/* Small trees right */}
    <rect x="220" y="130" width="5" height="25" rx="2" fill="#8B7355" />
    <circle cx="222" cy="122" r="11" fill="#1B8A5A" />
    <circle cx="230" cy="126" r="8" fill="#27AE60" />

    {/* Tiny water drops falling into the big drop */}
    <path d="M115,35 Q115,40 117,40 Q119,40 119,35 Q117,31 115,35" fill="#5DADE2" opacity="0.5" />
    <path d="M140,28 Q140,33 142,33 Q144,33 144,28 Q142,24 140,28" fill="#5DADE2" opacity="0.4" />
    <path d="M125,18 Q125,23 127,23 Q129,23 129,18 Q127,14 125,18" fill="#5DADE2" opacity="0.3" />

    {/* Ground flowers */}
    <circle cx="75" cy="160" r="2.5" fill="#C7EA46" />
    <circle cx="185" cy="158" r="2" fill="#C7EA46" />
    <circle cx="100" cy="163" r="1.5" fill="#F1C40F" opacity="0.5" />
  </svg>
);

const ILLUSTRATIONS: Record<string, React.FC> = {
  "energy-thermostat": ThermostatScene,
  "transport-cycling": CyclingScene,
  "food-plant-based": PlantFoodScene,
  "lifestyle-standby": UnplugScene,
  "water-showers": WaterScene,
};

export const DailyInsightCard = () => {
  const [insight, setInsight] = useState<DailyInsight | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    setInsight(INSIGHTS[dayOfYear % INSIGHTS.length]);
  }, []);

  if (!insight) return null;

  const Illustration = ILLUSTRATIONS[insight.id] || CyclingScene;

  return (
    <>
      <div
        className="w-full rounded-3xl overflow-hidden cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.12)] border border-[#d6dfc8] group"
        style={{ background: "linear-gradient(170deg, #d4e8a8, #c1db8a)" }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Text section — top ~45% */}
        <div className="px-5 pt-5 pb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gt-dark/50 mb-3">
            Did you know?
          </p>
          <h3 className="text-[16px] font-extrabold text-gt-dark leading-[1.35] whitespace-pre-line">
            {insight.headline}
          </h3>
        </div>

        {/* Illustration section — bottom ~55% */}
        <div className="w-full aspect-[13/9] relative">
          <Illustration />
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative w-full max-w-md rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Illustration header */}
              <div className="w-full shrink-0 relative" style={{ background: "linear-gradient(170deg, #d4e8a8, #c1db8a)" }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/50 text-gt-dark hover:bg-white/80 transition-colors z-30"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="px-6 pt-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gt-dark/50 mb-2">Did you know?</p>
                  <h3 className="text-lg font-extrabold text-gt-dark leading-snug whitespace-pre-line">{insight.headline}</h3>
                </div>
                <div className="w-full aspect-[5/2.5]">
                  <Illustration />
                </div>
              </div>

              {/* Body */}
              <div className="p-7 overflow-y-auto space-y-6 bg-white">
                <div>
                  <h4 className="text-[10px] font-bold text-gt-gray uppercase tracking-widest mb-2">Why it matters</h4>
                  <p className="text-sm text-gt-dark/80 font-medium leading-relaxed">{insight.whyItMatters}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-gt-gray uppercase tracking-widest mb-2">Potential Impact</h4>
                  <div className="border-l-2 border-gt-primary pl-4 py-1">
                    <p className="text-sm text-gt-dark font-bold leading-relaxed">{insight.carbonSavings}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-gt-gray uppercase tracking-widest mb-3">Actionable Steps</h4>
                  <ul className="space-y-3">
                    {insight.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-gt-primary shrink-0 mt-2" />
                        <span className="text-sm font-medium text-gt-dark/80 leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
