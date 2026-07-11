/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Zap, 
  Terminal
} from 'lucide-react';
import { TabType } from '../types';
import ninoPortrait from '../assets/images/nino_portrait.jpeg';

interface AboutTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function AboutTab({ setActiveTab }: AboutTabProps) {
  const coreCompetencies = [
    {
      title: 'Interactive Web Design',
      description: 'Crafting unique, distinctive, and high-fidelity interfaces utilizing gorgeous typography pairings, rich spacing grids, and sleek color tokens.'
    },
    {
      title: 'Fluid Motion & Animation',
      description: 'Breathing life into applications with purposeful, staggered entrance animations, gesture-based triggers, and layout morphing vectors.'
    },
    {
      title: 'Responsive Engineering',
      description: 'Writing desktop-first precision and mobile-first code to guarantee your app adapts seamlessly to standard phones, tablets, and wide-screen monitors.'
    },
    {
      title: 'Professional Architecture',
      description: 'Organizing modular React components, clean state orchestration layers, and optimized Vite build paths for lightning-fast performance.'
    }
  ];

  return (
    <div id="about-tab-container" className="space-y-12 lg:space-y-16 pb-8 animate-fade-in">
      
      {/* Title block */}
      <div className="space-y-3 max-w-3xl">
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-primaryText uppercase leading-none">
          THE EXECUTION MULTIPLIER
        </h2>
        
        <p className="text-mutedText/90 text-sm sm:text-base">
          I replace operational complexity with programmatic leverage, restoring speed so founders can scale.
        </p>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUMN 1: Niño Verdejo Specs Terminal */}
        <div className="md:col-span-1 lg:col-span-4 flex flex-col">
          <div className="glass-panel border border-neutral-800 rounded-none p-5 space-y-5 relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Corner bracket decorators */}
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-neutral-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-neutral-700 pointer-events-none" />
            
            <div className="space-y-5">
              {/* Header Spec */}
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <div className="space-y-0.5">
                  <div className="font-mono text-[9px] text-primaryAccent uppercase tracking-widest font-bold">
                    Developer Profile
                  </div>
                  <h3 className="font-display text-xl font-black text-primaryText">
                    NIÑO VERDEJO
                  </h3>
                </div>
                <div className="text-right">
                </div>
              </div>

              {/* Profile Image Header */}
              <div className="relative border border-neutral-900 overflow-hidden bg-neutral-950 aspect-square">
                <img
                  src={ninoPortrait}
                  alt="Niño Verdejo Portrait"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                {/* Scanline overlay effect to fit terminal theme */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-30" />
              </div>

              {/* Niño specification sheets */}
              <div className="space-y-3 font-mono text-[11px]">
                
                <div className="border-b border-neutral-900/60 pb-1.5 items-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-primaryText font-semibold">Web Design & App Development</span>
                    <span className="px-1.5 py-0.5 bg-primaryAccent/20 text-primaryAccent font-mono text-[8px] font-bold uppercase tracking-wider rounded border border-primaryAccent/30">Primary</span>
                  </div>
                </div>

                <div className="border-b border-neutral-900/60 pb-1.5">
                  <span className="text-primaryText font-semibold">AI Automation Expert</span>
                </div>

                <div className="border-b border-neutral-900/60 pb-1.5">
                  <span className="text-primaryText font-semibold">Virtual Assistant</span>
                </div>

                <div className="border-b border-neutral-900/60 pb-1.5">
                  <span className="text-primaryText font-semibold">Global (Remote)</span>
                </div>

                <div className="border-b border-neutral-900/60 pb-1.5">
                  <span className="text-primaryText font-bold">Restoring 15h+ weekly</span>
                </div>

              </div>

              {/* Stack items tag cloud */}
              <div className="space-y-1.5">
                <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold">
                  CORE INFRASTRUCTURE STACK
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'TypeScript', 'Vite', 'Node.js', 'Tailwind v4', 'Framer Motion', 'REST APIs', 'Gemini AI', 'Webhooks', 'PostgreSQL', 'GitHub', 'CI/CD'].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-neutral-900 border border-neutral-850 text-primaryText font-mono text-[9px] uppercase rounded-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro-terminal text */}
            <div className="mt-6 bg-neutral-950 p-2.5 border border-neutral-900 font-mono text-[10px] text-neutral-500 space-y-0.5 leading-tight">
              <div className="text-primaryAccent font-bold">{`System Logs`}</div>
              <div>• Direct business pipelines established.</div>
              <div>• Redundant database index locks resolved.</div>
              <div>• Active server monitors fully configured.</div>
            </div>

          </div>
        </div>

        {/* COLUMN 2: High Velocity Copywriting */}
        <div className="md:col-span-2 lg:col-span-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-primaryText uppercase tracking-tight">
              Creating digital experiences that engage, convert, and perform. Visually stunning and rigorously engineered.
            </h3>
            
            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              A great user interface is more than just clean aesthetics—it is a functional system that translates brand identity into flawless user journeys. Every line of code, every transition curve, and every responsive breakpoint should work in complete harmony to provide a seamless, elite experience across all screen sizes.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              I specialize in bridging the gap between artistic visual design and bulletproof technical architecture. Leveraging modern front-end frameworks, high-performance animation engines, and meticulous responsive layouts, I build professional web applications that load instantly and respond dynamically to user touch or click gestures.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              By combining custom typography hierarchies, elegant whitespace distribution, and custom glassmorphic panels, I design websites that look stunning on 4K retina displays down to the smallest mobile devices. Every transition, hover state, and interactive layout change is built with clean motion curves to maximize tactile satisfaction and user retention.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              Behind the visual beauty lies standard-compliant semantic markup, robust TypeScript modularity, and optimized production bundlers. This professional approach guarantees high lighthouse scores, superb accessibility controls (WCAG/ARIA), and a future-proof development ecosystem that scales effortlessly as your project requirements grow.
            </p>
          </div>

          {/* Value multiplier steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {coreCompetencies.map((comp, idx) => (
              <div key={idx} className="p-3.5 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 bg-primaryAccent/10 border border-primaryAccent/30 rounded-none flex items-center justify-center font-mono text-[9px] text-primaryAccent font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-primaryText uppercase">
                    {comp.title}
                  </h4>
                </div>
                <p className="text-[11px] text-mutedText leading-relaxed font-sans">
                  {comp.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick statement on engagement */}
          <div className="p-4 bg-neutral-950 border border-neutral-900 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-mono text-[10px] text-primaryAccent font-bold">ENGAGEMENT MODEL</div>
              <div className="text-xs sm:text-sm text-primaryText font-bold font-display uppercase">Fractional Sprints or Monthly Retainers</div>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="flex items-center gap-1 bg-primaryAccent hover:bg-primaryAccent/90 text-white font-mono font-bold uppercase tracking-wider text-[10px] py-2.5 px-4 rounded-none transition-colors cursor-pointer shrink-0"
            >
              HIRE NIÑO
              <Zap className="w-2.5 h-2.5 animate-pulse" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
