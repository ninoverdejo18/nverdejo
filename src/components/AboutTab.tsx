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
import { BlackHoleEffect } from './BlackHoleEffect';
import { SpecialText } from './ui/SpecialText';
import TubesBackground from './ui/neon-flow';

interface AboutTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function AboutTab({ setActiveTab }: AboutTabProps) {
  const coreCompetencies = [
    {
      title: 'Clean Web Design',
      description: 'Creating clean, responsive, and easy-to-use websites designed to match your brand and convert visitors into clients.'
    },
    {
      title: 'Interactive Transitions',
      description: 'Adding smooth transitions and micro-interactions that make your website feel fast, responsive, and natural to navigate.'
    },
    {
      title: 'Mobile-First Layouts',
      description: 'Writing clean, responsive code so your website works perfectly on mobile phones, tablets, laptops, and large screens.'
    },
    {
      title: 'Reliable Codebases',
      description: 'Structuring modern, modular frontend code to ensure your website loads quickly, remains secure, and scales easily as your needs grow.'
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
          I design custom websites, build helpful automations, and manage daily workflows so you can focus on growing your business.
        </p>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COLUMN 1: Niño Verdejo Specs Terminal */}
        <div className="md:col-span-1 lg:col-span-4 flex flex-col">
          <TubesBackground className="glass-panel neon-flow-container border border-neutral-800 rounded-none p-5 space-y-5 relative overflow-hidden flex-1 flex flex-col justify-between bg-black/40 min-h-0 select-none">
            {/* Beautiful Black Hole Vortex background effect */}
            <BlackHoleEffect />
            
            {/* Corner bracket decorators */}
            <div className="absolute -top-[1px] -right-[1px] w-6 h-6 border-t border-r border-neutral-700 pointer-events-none z-20" />
            
            <div className="space-y-5 relative z-10 pointer-events-auto">
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
              <div className="group relative border border-neutral-900 overflow-hidden bg-neutral-950 aspect-square cursor-crosshair pointer-events-auto">
                <img
                  src={ninoPortrait}
                  alt="Niño Verdejo Portrait"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-0" />
                {/* Scanline overlay effect to fit terminal theme */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-30 transition-opacity duration-500 group-hover:opacity-0" />
              </div>

              {/* Niño specification sheets */}
              <div className="space-y-3 font-mono text-[11px]">
                
                <div className="pb-1.5 items-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <SpecialText className="text-primaryText font-semibold">Web Design & App Development</SpecialText>
                    <span className="px-1.5 py-0.5 bg-primaryAccent/20 text-primaryAccent font-mono text-[8px] font-bold uppercase tracking-wider rounded border border-primaryAccent/30">Primary</span>
                  </div>
                </div>

                <div className="pb-1.5">
                  <SpecialText className="text-primaryText font-semibold">AI Automation Developer</SpecialText>
                </div>

                <div className="pb-1.5">
                  <SpecialText className="text-primaryText font-semibold">UI/UX Engineer</SpecialText>
                </div>

                <div className="pb-1.5">
                  <SpecialText className="text-primaryText font-semibold">Global (Remote)</SpecialText>
                </div>

                <div className="pb-1.5">
                  <SpecialText className="text-primaryText font-bold">Pristine layout fidelity</SpecialText>
                </div>

              </div>

              {/* Stack items tag cloud */}
              <div className="space-y-1.5">
                <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold">
                  CORE INFRASTRUCTURE STACK
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'TypeScript', 'Vite', 'Node.js', 'Tailwind v4', 'Framer Motion', 'REST APIs', 'Gemini AI', 'Webhooks', 'PostgreSQL', 'GitHub'].map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-neutral-900 border border-neutral-850 text-primaryText font-mono text-[9px] uppercase rounded-none">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro-terminal text */}
            <div className="mt-6 bg-neutral-950/90 backdrop-blur-xs p-2.5 border border-neutral-900 font-mono text-[10px] text-neutral-500 space-y-0.5 leading-tight relative z-10 pointer-events-auto">
              <div className="text-primaryAccent font-bold">{`Development Logs`}</div>
              <div>• Dynamic React rendering loops optimized.</div>
              <div>• Responsive viewport layout specs verified.</div>
              <div>• Framer Motion fluid animations active.</div>
            </div>

          </TubesBackground>
        </div>

        {/* COLUMN 2: High Velocity Copywriting */}
        <div className="md:col-span-2 lg:col-span-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-primaryText uppercase tracking-tight">
              Building fast, reliable websites and custom systems designed to grow your business and simplify your work.
            </h3>
            
            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              A great website is more than just a beautiful page—it is a functional tool that represents your brand and guides visitors to take action. Every detail, from loading times to visual layout, is built to provide an easy and intuitive experience for your customers on any device.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              I specialize in bringing designs to life with solid technical engineering. Using modern web standards, reliable frameworks, and clean layouts, I build fast-loading websites and applications that are responsive, highly interactive, and easy to use.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              By using clean typography, balanced spacing, and refined color palettes, I design websites that look professional on everything from high-resolution screens to small smartphones. Every transition and button click is polished to feel snappy and natural, helping keep users engaged.
            </p>

            <p className="text-mutedText/95 text-sm sm:text-base leading-relaxed font-sans">
              Behind the design, I write search-engine-friendly code, use strong security practices, and optimize files for speed. This approach ensures high search visibility, complete accessibility for all users, and a secure system that you can easily update as your business grows.
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
              <div className="text-xs sm:text-sm text-primaryText font-bold font-display uppercase">Flexible Project-Based or Monthly Retainers</div>
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
