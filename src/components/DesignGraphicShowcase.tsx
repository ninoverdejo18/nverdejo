import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import TubesBackground from './ui/neon-flow';
import { 
  Monitor, 
  Layout, 
  Layers, 
  Type, 
  Sparkles, 
  Check, 
  Eye,
  Grid,
  Settings,
  Code
} from 'lucide-react';

interface Palette {
  name: string;
  primary: string;
  secondary: string;
  bgGrad: string;
  glow: string;
}

const PALETTES: Palette[] = [
  {
    name: 'Emerald Cyber',
    primary: '#10B981',
    secondary: '#34D399',
    bgGrad: 'from-emerald-500/10 to-teal-500/5',
    glow: 'rgba(16, 185, 129, 0.15)'
  },
  {
    name: 'Neo Slate Purple',
    primary: '#A855F7',
    secondary: '#D8B4FE',
    bgGrad: 'from-purple-500/10 to-violet-500/5',
    glow: 'rgba(168, 85, 247, 0.15)'
  },
  {
    name: 'Solar Flare',
    primary: '#F97316',
    secondary: '#FB923C',
    bgGrad: 'from-orange-500/10 to-amber-500/5',
    glow: 'rgba(249, 115, 22, 0.15)'
  },
  {
    name: 'Cyber Crimson',
    primary: '#EF4444',
    secondary: '#F87171',
    bgGrad: 'from-red-500/10 to-rose-500/5',
    glow: 'rgba(239, 68, 68, 0.15)'
  }
];

type ShowcaseMode = 'render' | 'spec' | 'grid' | 'typography' | 'neon';

export default function DesignGraphicShowcase() {
  const [activePalette, setActivePalette] = useState<Palette>(PALETTES[0]);
  const [activeMode, setActiveMode] = useState<ShowcaseMode>('render');
  const [titleCase, setTitleCase] = useState<'uppercase' | 'capitalize'>('uppercase');
  const [letterSpacing, setLetterSpacing] = useState<'normal' | 'tight' | 'tighter'>('tighter');
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);

  // Layout text
  const headline = "ENGINEERING ELITE DIGITAL PRODUCTS";
  
  // Custom letter spacing tailwind classes
  const trackingClass = letterSpacing === 'tighter' ? 'tracking-tighter' : letterSpacing === 'tight' ? 'tracking-tight' : 'tracking-normal';

  return (
    <div className="w-full bg-neutral-950/40 border border-neutral-900 p-5 sm:p-6 lg:p-8 space-y-6 relative overflow-hidden">
      {/* Absolute ambient lights mapping to active colors */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-25"
        style={{ backgroundColor: activePalette.primary }}
      />
      <div 
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000 opacity-15"
        style={{ backgroundColor: activePalette.secondary }}
      />

      {/* Header section detailing Design System Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-900 pb-5 relative z-10">
        <div>

          <h3 className="font-display text-lg font-black text-primaryText uppercase tracking-tight">
            POLISHED WEB LAYOUT & STYLE SPECIMEN
          </h3>
          <p className="text-xs text-mutedText max-w-xl font-sans mt-1">
            Explore structural rules, typographic scales, grids, and customized color parameters. Toggle overlays to examine design fidelity.
          </p>
        </div>

        {/* Action controllers */}
        <div className="flex flex-wrap gap-2">
          {/* Mode selectors */}
          <div className="bg-neutral-900 p-1 border border-neutral-850 flex gap-1 font-mono text-[9px] uppercase font-bold">
            <button
              onClick={() => setActiveMode('render')}
              className={`px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'render' 
                  ? 'bg-neutral-800 text-primaryText border border-neutral-700' 
                  : 'text-mutedText hover:text-primaryText'
              }`}
            >
              <Eye className="w-3 h-3" />
              Render
            </button>
            <button
              onClick={() => setActiveMode('spec')}
              className={`px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'spec' 
                  ? 'bg-neutral-800 text-primaryText border border-neutral-700' 
                  : 'text-mutedText hover:text-primaryText'
              }`}
            >
              <Settings className="w-3 h-3" />
              Specs
            </button>
            <button
              onClick={() => setActiveMode('grid')}
              className={`px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'grid' 
                  ? 'bg-neutral-800 text-primaryText border border-neutral-700' 
                  : 'text-mutedText hover:text-primaryText'
              }`}
            >
              <Grid className="w-3 h-3" />
              Grid
            </button>
            <button
              onClick={() => setActiveMode('typography')}
              className={`px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'typography' 
                  ? 'bg-neutral-800 text-primaryText border border-neutral-700' 
                  : 'text-mutedText hover:text-primaryText'
              }`}
            >
              <Type className="w-3 h-3" />
              Type Scale
            </button>
            <button
              onClick={() => setActiveMode('neon')}
              className={`px-2.5 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                activeMode === 'neon' 
                  ? 'bg-neutral-800 text-primaryText border border-neutral-700' 
                  : 'text-mutedText hover:text-primaryText'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Neon Flow
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Grid split into Control Studio Panel & Graphic Specimen Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 items-stretch">
        
        {/* Left Column: Interactive Settings Controller (4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Preset Color Swatches */}
          <div className="bg-surface-dark border border-neutral-850 p-4 space-y-3">
            <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider block border-b border-neutral-900 pb-1.5 font-bold">
              ACTIVE BRAND PALETTES
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PALETTES.map((pal) => (
                <button
                  key={pal.name}
                  onClick={() => setActivePalette(pal)}
                  className={`p-2 bg-neutral-950 border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    activePalette.name === pal.name 
                      ? 'border-neutral-500 scale-[1.01]' 
                      : 'border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-primaryText font-bold">{pal.name}</span>
                    {activePalette.name === pal.name && (
                      <Check className="w-2.5 h-2.5" style={{ color: pal.primary }} />
                    )}
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    <div className="w-3 h-3 rounded-none" style={{ backgroundColor: pal.primary }} />
                    <div className="w-3 h-3 rounded-none" style={{ backgroundColor: pal.secondary }} />
                    <div className="w-3 h-3 rounded-none bg-neutral-800" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Typography Adjuster */}
          <div className="bg-surface-dark border border-neutral-850 p-4 space-y-3">
            <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider block border-b border-neutral-900 pb-1.5 font-bold">
              TYPOGRAPHY CONTROLS
            </div>
            
            <div className="space-y-3">
              {/* Heading casing */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-neutral-500 block">HEADING CAPITALIZATION:</span>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[8px] uppercase font-bold">
                  <button
                    onClick={() => setTitleCase('uppercase')}
                    className={`py-1 text-center border cursor-pointer ${
                      titleCase === 'uppercase' 
                        ? 'bg-neutral-800 border-neutral-700 text-primaryText' 
                        : 'bg-neutral-950 border-neutral-900 text-mutedText'
                    }`}
                  >
                    UPPERCASE
                  </button>
                  <button
                    onClick={() => setTitleCase('capitalize')}
                    className={`py-1 text-center border cursor-pointer ${
                      titleCase === 'capitalize' 
                        ? 'bg-neutral-800 border-neutral-700 text-primaryText' 
                        : 'bg-neutral-950 border-neutral-900 text-mutedText'
                    }`}
                  >
                    Capitalized
                  </button>
                </div>
              </div>

              {/* Letter tracking */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-neutral-500 block">LETTER TRACKING SCALING:</span>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[8px] uppercase font-bold">
                  {(['normal', 'tight', 'tighter'] as const).map((space) => (
                    <button
                      key={space}
                      onClick={() => setLetterSpacing(space)}
                      className={`py-1 text-center border cursor-pointer ${
                        letterSpacing === space 
                          ? 'bg-neutral-800 border-neutral-700 text-primaryText' 
                          : 'bg-neutral-950 border-neutral-900 text-mutedText'
                      }`}
                    >
                      {space}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Design system principles spec breakdown */}
          <div className="bg-surface-dark border border-neutral-850 p-4 space-y-2 text-xs">
            <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider block border-b border-neutral-900 pb-1.5 font-bold">
              DESIGN GUIDELINES
            </div>
            <div className="space-y-2 font-mono text-[10px]">
              <div 
                className={`p-2 border transition-colors ${hoveredSpec === 'ratio' ? 'border-neutral-500 bg-neutral-900/60' : 'border-neutral-900 bg-neutral-950/20'}`}
                onMouseEnter={() => setHoveredSpec('ratio')}
                onMouseLeave={() => setHoveredSpec(null)}
              >
                <div className="flex justify-between font-bold text-primaryText">
                  <span>Golden Ratio Grid</span>
                  <span style={{ color: activePalette.primary }}>1.618x</span>
                </div>
                <p className="text-[9px] text-mutedText mt-0.5 font-sans leading-relaxed">
                  Line heights and paragraph paddings match incremental geometric intervals to lock reading flow.
                </p>
              </div>

              <div 
                className={`p-2 border transition-colors ${hoveredSpec === 'contrast' ? 'border-neutral-500 bg-neutral-900/60' : 'border-neutral-900 bg-neutral-950/20'}`}
                onMouseEnter={() => setHoveredSpec('contrast')}
                onMouseLeave={() => setHoveredSpec(null)}
              >
                <div className="flex justify-between font-bold text-primaryText">
                  <span>Chrominance Balancing</span>
                  <span style={{ color: activePalette.secondary }}>WCAG AAA</span>
                </div>
                <p className="text-[9px] text-mutedText mt-0.5 font-sans leading-relaxed">
                  Strict color spectrum control ensuring highly qualitative, eye-safe typography elements with maximum visual balance.
                </p>
              </div>

              <div 
                className={`p-2 border transition-colors ${hoveredSpec === 'layout' ? 'border-neutral-500 bg-neutral-900/60' : 'border-neutral-900 bg-neutral-950/20'}`}
                onMouseEnter={() => setHoveredSpec('layout')}
                onMouseLeave={() => setHoveredSpec(null)}
              >
                <div className="flex justify-between font-bold text-primaryText">
                  <span>Responsive Columns</span>
                  <span className="text-green-400">12 COL GRIDS</span>
                </div>
                <p className="text-[9px] text-mutedText mt-0.5 font-sans leading-relaxed">
                  Fluid width configurations with variable percentage mappings that fit perfectly across standard devices.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: High-fidelity interactive layout simulator (8 Columns) */}
        <div className="lg:col-span-8 bg-neutral-950 border border-neutral-850 relative overflow-hidden flex flex-col">
          {/* Simulated Browser Bar */}
          <div className="bg-neutral-900 px-4 py-2 border-b border-neutral-850 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/55 block" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/55 block" />
              <span className="w-2 h-2 rounded-full bg-green-500/55 block" />
            </div>
            
            <div className="bg-neutral-950 px-3 py-0.5 border border-neutral-850 rounded text-[9px] font-mono text-neutral-500 w-1/2 text-center truncate">
              https://nv-studios.dev/brand-specimen
            </div>

            <div className="flex items-center gap-2 font-mono text-[8px] text-neutral-500">
              <span>W: 100%</span>
              <Monitor className="w-3 h-3 text-neutral-400" />
            </div>
          </div>

          {/* Mockup Canvas */}
          <div className="p-6 relative bg-[#090909] min-h-[400px] flex-1 flex flex-col justify-between overflow-hidden">
            
            {/* Neon Flow Background Specimen */}
            {activeMode === 'neon' && (
              <div className="absolute inset-0 z-0">
                <TubesBackground className="border-none w-full h-full min-h-0 bg-transparent" />
              </div>
            )}

            {/* GRID OVERLAY LAYER (Only when 'grid' active) */}
            {activeMode === 'grid' && (
              <div className="absolute inset-x-6 inset-y-0 grid grid-cols-12 gap-4 pointer-events-none z-30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full border-x border-dashed bg-opacity-5 relative flex justify-center"
                    style={{ 
                      borderColor: `${activePalette.primary}22`,
                      backgroundColor: `${activePalette.primary}07`
                    }}
                  >
                    <span 
                      className="absolute top-2 font-mono text-[7px] font-bold"
                      style={{ color: activePalette.primary }}
                    >
                      COL {i+1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* SPEC ANNOTATIONS / GUIDELINES (Only when 'spec' is active) */}
            {activeMode === 'spec' && (
              <div className="absolute inset-0 pointer-events-none z-30">
                {/* Horizontal Alignment Guides */}
                <div className="absolute top-1/3 left-0 right-0 border-t border-cyan-500/20 flex justify-between px-2 font-mono text-[7px] text-cyan-400">
                  <span>X-AXIS_LOCK [ALIGN_GRID]</span>
                  <span>W: 100%</span>
                </div>
                <div className="absolute top-2/3 left-0 right-0 border-t border-cyan-500/20 flex justify-between px-2 font-mono text-[7px] text-cyan-400">
                  <span>BOTTOM_SPACING [GAP: 32PX]</span>
                  <span>Y: 480PX</span>
                </div>

                {/* Leading guides pointing to content */}
                <div className="absolute top-10 left-10 w-24 border-b border-l border-cyan-400/40 h-8 font-mono text-[7px] text-cyan-400 p-1">
                  NAV_BAR (HEIGHT: 48px)
                </div>

                <div className="absolute top-[45%] right-6 w-28 border-t border-r border-cyan-400/40 h-10 font-mono text-[7px] text-cyan-400 p-1 text-right flex flex-col justify-end">
                  HERO_HEADING (4XL)
                </div>
              </div>
            )}

            {/* MOCK APPLICATION PREVIEW */}
            <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
              
              {/* Header inside Preview */}
              <div 
                className={`flex items-center justify-between pb-3 border-b transition-colors duration-500 ${
                  activeMode === 'spec' ? 'border-cyan-500/40' : 'border-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                    <span className="font-display font-black text-[9px]" style={{ color: activePalette.primary }}>N</span>
                  </div>
                  <span className="font-mono text-[9px] text-primaryText font-bold tracking-wider">NV_ENGINEERING</span>
                </div>
                
                <div className="flex gap-3 font-mono text-[8px] text-mutedText">
                  <span className="hover:text-primaryText transition-colors cursor-pointer">ARCHITECTURE</span>
                  <span className="hover:text-primaryText transition-colors cursor-pointer" style={{ color: activePalette.primary }}>PRODUCTS</span>
                  <span className="hover:text-primaryText transition-colors cursor-pointer">LOGS</span>
                </div>
              </div>

              {/* Main Landing Area */}
              <div className="py-6 space-y-6 flex-1 flex flex-col justify-center">
                <div className="space-y-3 text-center max-w-xl mx-auto">


                  {/* High fidelity animated headline heading */}
                  <div className="relative">
                    {activeMode === 'typography' && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[6px] text-yellow-500 bg-neutral-900 px-1 border border-yellow-500/40 z-30 whitespace-nowrap">
                        HEADING: {titleCase === 'uppercase' ? 'UPPERCASE' : 'Capitalized'} | {trackingClass.toUpperCase()}
                      </span>
                    )}
                    <h1 
                      className={`font-display text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryText to-mutedText transition-all duration-500 leading-none ${trackingClass} ${
                        titleCase === 'uppercase' ? 'uppercase' : 'capitalize'
                      }`}
                      style={{
                        backgroundImage: `linear-gradient(to right, #ffffff, ${activePalette.primary})`
                      }}
                    >
                      {headline}
                    </h1>
                  </div>

                  {/* Tagline */}
                  <p className="text-[11px] text-mutedText max-w-md mx-auto leading-relaxed font-sans relative">
                    {activeMode === 'typography' && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[6px] text-yellow-500 bg-neutral-900 px-1 border border-yellow-500/40 z-30 whitespace-nowrap">
                        FONT-FAMILY: INTER | LINE-HEIGHT: 1.625 (GOLDEN)
                      </span>
                    )}
                    We design bespoke web platforms that leverage elegant user design systems to maximize customer retention and operational scaling.
                  </p>

                  {/* CTA button mockup */}
                  <div className="pt-2 flex justify-center gap-2 relative">
                    {activeMode === 'typography' && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[6px] text-yellow-500 bg-neutral-900 px-1 border border-yellow-500/40 z-30 whitespace-nowrap">
                        PADDING: px-4 py-2 | BORDER-RADIUS: 0px
                      </span>
                    )}
                    <button 
                      className="px-4 py-1.5 text-[8px] font-mono font-bold uppercase transition-all duration-500 cursor-pointer flex items-center gap-1.5"
                      style={{ 
                        backgroundColor: activePalette.primary,
                        color: '#ffffff',
                        boxShadow: `0 0 14px ${activePalette.glow}`
                      }}
                    >
                      INITIATE PIPELINE
                      <span>→</span>
                    </button>
                    <button className="px-4 py-1.5 text-[8px] font-mono font-bold uppercase border border-neutral-800 text-mutedText hover:text-primaryText transition-colors duration-300">
                      DOCUMENTATION
                    </button>
                  </div>
                </div>
              </div>

              {/* Bento Grid layout sample at preview bottom */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-900">
                
                {/* Bento Item 1 */}
                <div 
                  className={`p-3 bg-neutral-950 border rounded-none flex flex-col justify-between gap-1 transition-all duration-500 ${
                    activeMode === 'spec' ? 'border-cyan-500/30' : 'border-neutral-900'
                  }`}
                  style={{
                    boxShadow: hoveredSpec === 'ratio' ? `inset 0 0 8px ${activePalette.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">CONVERSION</span>
                    <span className="font-bold text-[8px] text-green-400">+342%</span>
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText uppercase leading-none mt-1">
                    Aesthetic Growth
                  </div>
                </div>

                {/* Bento Item 2 */}
                <div 
                  className={`p-3 bg-neutral-950 border rounded-none flex flex-col justify-between gap-1 transition-all duration-500 ${
                    activeMode === 'spec' ? 'border-cyan-500/30' : 'border-neutral-900'
                  }`}
                  style={{
                    boxShadow: hoveredSpec === 'contrast' ? `inset 0 0 8px ${activePalette.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">LATENCY</span>
                    <span className="font-bold text-[8px]" style={{ color: activePalette.primary }}>SUB-1.2S</span>
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText uppercase leading-none mt-1">
                    Compiled Speeds
                  </div>
                </div>

                {/* Bento Item 3 */}
                <div 
                  className={`p-3 bg-neutral-950 border rounded-none flex flex-col justify-between gap-1 transition-all duration-500 ${
                    activeMode === 'spec' ? 'border-cyan-500/30' : 'border-neutral-900'
                  }`}
                  style={{
                    boxShadow: hoveredSpec === 'layout' ? `inset 0 0 8px ${activePalette.glow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] text-neutral-500">ACCESSIBILITY</span>
                    <span className="font-bold text-[8px] text-green-400">WCAG AAA</span>
                  </div>
                  <div className="font-display font-bold text-xs text-primaryText uppercase leading-none mt-1">
                    Color Spectrum
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Subspec label describing active properties */}
          <div className="bg-neutral-900 border-t border-neutral-850 px-4 py-2 flex justify-between items-center font-mono text-[8px] text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="text-primaryAccent font-bold">SYSTEM: ACTIVE</span>
              <span className="text-neutral-800 font-normal">|</span>
              <span>PALETTE: {activePalette.name.toUpperCase()}</span>
              <span className="text-neutral-800 font-normal">|</span>
              <span>MODE: {activeMode.toUpperCase()}</span>
            </div>

          </div>
        </div>

      </div>

      {/* Code Spec Box */}
      <div className="border border-neutral-900 bg-neutral-950 p-4 font-mono text-[10px] space-y-2">
        <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Code className="w-3.5 h-3.5" />
            <span className="text-[8px] text-neutral-600">COMPILED SUCCESSFULLY</span>
          </div>
        </div>
        <pre className="text-mutedText overflow-x-auto leading-relaxed">
{`{
  "theme": {
    "fontFamily": {
      "display": ["Space Grotesk", "sans-serif"],
      "sans": ["Inter", "sans-serif"]
    },
    "colors": {
      "accent": {
        "primary": "${activePalette.primary}",
        "secondary": "${activePalette.secondary}"
      }
    },
    "spacing": {
      "layout-ratio": 1.618,
      "container-padding": "24px"
    },
    "grid": {
      "columns": 12,
      "gutter": "16px"
    },
    "output_targets": [".tsx", ".js", ".css"]
  }
}`}
        </pre>
      </div>

    </div>
  );
}
