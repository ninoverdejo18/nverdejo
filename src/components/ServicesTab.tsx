/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Code, 
  Cpu, 
  Terminal, 
  Check, 
  ArrowRight, 
  Zap, 
  BarChart, 
  TrendingUp,
  Settings,
  Database,
  Shield,
  Activity,
  RotateCw,
  Server,
  User
} from 'lucide-react';
import { Service, TabType } from '../types';
import ElectricBorder from './ElectricBorder';

interface ServicesTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function ServicesTab({ setActiveTab }: ServicesTabProps) {
  // Simulator states
  const [activeSimId, setActiveSimId] = useState('compile');
  const [isCompiling, setIsCompiling] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simLogs, setSimLogs] = useState<string[]>([
    'SYSTEM: Ready to audit high-performance compilation...',
    'MONITOR: Choose a pipeline to diagnose operational latency.'
  ]);

  useEffect(() => {
    // Reset or update logs based on selection
    if (activeSimId === 'compile') {
      setSimLogs([
        'SYSTEM: Pipeline selected [ Rollup Code Bundle Compilation ]',
        'CONFIG: entry="src/main.tsx" target="esnext" sourcemap=true',
        'STATUS: Standby for compiler execution trigger...'
      ]);
    } else if (activeSimId === 'secure') {
      setSimLogs([
        'SYSTEM: Pipeline selected [ Proxy CORS & API Handshake Security ]',
        'CONFIG: gateway="/api/*" rate-limit="100 req/min" secure=true',
        'STATUS: Standby for proxy configuration test...'
      ]);
    } else if (activeSimId === 'vitals') {
      setSimLogs([
        'SYSTEM: Pipeline selected [ Core Web Vitals Audit & CDN Edge Routing ]',
        'CONFIG: metric="LCP + FID + CLS" compression="brotli"',
        'STATUS: Standby for Lighthouse / Core Web Vitals diagnostic...'
      ]);
    }
  }, [activeSimId]);

  const triggerCompilation = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setProgress(0);
    
    if (activeSimId === 'compile') {
      setSimLogs([
        'COMPILER: Initializing bundling process...',
        'COMPILER: Loading package manifests and dynamic code splits...',
      ]);
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        
        if (currentProgress === 30) {
          setSimLogs(prev => [
            ...prev,
            'COMPILER: Tree-shaking unused node_modules exports (eliminated 412kb of unused code)...'
          ]);
        } else if (currentProgress === 60) {
          setSimLogs(prev => [
            ...prev,
            'COMPILER: Transpiling JSX elements and processing Tailwind v4 asset compilation...'
          ]);
        } else if (currentProgress === 90) {
          setSimLogs(prev => [
            ...prev,
            'COMPILER: Minifying assets and outputting self-contained single-page bundle to dist/...'
          ]);
        } else if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setSimLogs(prev => [
              ...prev,
              'SUCCESS: Bundle successfully compiled. Main bundle: 48.2kB, CSS chunk: 14.8kB.',
              'COMPLETED: App ready for production deployment.'
            ]);
          }, 400);
        }
      }, 200);
    } else if (activeSimId === 'secure') {
      setSimLogs([
        'SECURITY: Initializing server-side route guards...',
        'SECURITY: Resolving environment configuration keys...',
      ]);
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        
        if (currentProgress === 30) {
          setSimLogs(prev => [
            ...prev,
            'SECURITY: Validating CORS whitelist configurations against domain endpoints...'
          ]);
        } else if (currentProgress === 60) {
          setSimLogs(prev => [
            ...prev,
            'SECURITY: Setting up proxy rules to hide third-party API keys (Stripe, Gemini)...'
          ]);
        } else if (currentProgress === 90) {
          setSimLogs(prev => [
            ...prev,
            'SECURITY: Configuring rate-limiting rules and dynamic DDOS fallback strategies...'
          ]);
        } else if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setSimLogs(prev => [
              ...prev,
              'SUCCESS: All client-server endpoints verified secure. TLS 1.3 tunnel configured.',
              'COMPLETED: Route security handshake verified.'
            ]);
          }, 400);
        }
      }, 200);
    } else if (activeSimId === 'vitals') {
      setSimLogs([
        'AUDIT: Starting sub-second browser rendering diagnostic...',
        'AUDIT: Measuring Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS)...',
      ]);
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        
        if (currentProgress === 30) {
          setSimLogs(prev => [
            ...prev,
            'AUDIT: Auditing DOM depth and verifying dynamic image lazy-loading schemas...'
          ]);
        } else if (currentProgress === 60) {
          setSimLogs(prev => [
            ...prev,
            'AUDIT: Measuring first-input delay (FID) with high-fidelity input interaction simulation...'
          ]);
        } else if (currentProgress === 90) {
          setSimLogs(prev => [
            ...prev,
            'AUDIT: Activating Brotli pre-compression on global static chunks...'
          ]);
        } else if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setSimLogs(prev => [
              ...prev,
              'SUCCESS: Performance: 100/100, Accessibility: 100/100, Best Practices: 100/100.',
              'COMPLETED: Web Vitals scores verified green.'
            ]);
          }, 400);
        }
      }, 200);
    }
  };
  const services: Service[] = [
    {
      id: 'web-dev',
      title: 'Web & App Development',
      tagline: 'Designed to load instantly and run reliably.',
      description: 'Slow websites lose customers and lower search rankings. I build clean, fast, and secure web applications designed to load instantly on any connection, without unnecessary files or bloated templates.',
      roi: 'Keeps visitors on your site longer, improves user trust, and makes it easier for potential clients to reach you.',
      features: [
        'Modern React web applications',
        'Interactive dashboards and forms',
        'Clean, secure codebases',
        'Responsive layouts for mobile and desktop'
      ],
      metrics: [
        'Excellent speed & performance scores',
        'Sub-second loading times',
        'Smooth page transitions'
      ]
    },
    {
      id: 'ai-automation',
      title: 'AI & Automations',
      tagline: 'Connect apps and automate repetitive manual processes.',
      description: 'Teams often lose hours copying data between spreadsheets, forms, and email platforms. I build simple integrations and use helpful tools like the Gemini API to synchronize your software and automate routine steps.',
      roi: 'Reduces manual errors, saves hours of admin work, and automatically keeps your records up to date.',
      features: [
        'Automated software integrations',
        'Email & form sorting via Gemini AI',
        'Automatic Google Sheets updates',
        'Reliable notifications & status alerts'
      ],
      metrics: [
        'Hours saved on manual admin work',
        'Instant database synchronization',
        'Reliable automated notifications'
      ]
    },
    {
      id: 'personal-va',
      title: 'Personal & Virtual Assistance',
      tagline: 'Reliable email, calendar, and daily administrative support.',
      description: 'Managing emails, coordination, and schedules can distract you from high-level goals. I handle daily administrative tasks, organize meetings, research topics, and keep your files structured so you can stay productive.',
      roi: 'Frees up your time, protects your calendar from double-bookings, and handles routine tasks with complete reliability.',
      features: [
        'Email triage & detailed draft responses',
        'Calendar coordination & meeting setups',
        'Detailed travel booking & itineraries',
        'Online research & structured file organization'
      ],
      metrics: [
        'Under-hour response for urgent tasks',
        'Frees up 8+ hours of focus time every week',
        'Works with your favorite communication tools'
      ]
    }
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'web-dev':
        return <Code className="w-6 h-6 text-primaryAccent" />;
      case 'ai-automation':
        return <Cpu className="w-6 h-6 text-primaryAccent" />;
      case 'personal-va':
        return <User className="w-6 h-6 text-primaryAccent" />;
      default:
        return <Terminal className="w-6 h-6 text-primaryAccent" />;
    }
  };

  return (
    <div id="services-tab-container" className="space-y-12 lg:space-y-16 pb-8">
      
      {/* Title block */}
      <div className="space-y-3 max-w-3xl">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-primaryText uppercase leading-none">
          WEB, APP & AUTOMATION SERVICES
        </h2>
        
        <p className="text-mutedText/90 text-sm sm:text-base leading-relaxed">
          I build fast, responsive websites, integrate simple AI automations, and provide reliable administrative assistance to streamline your daily work and keep your systems synchronized.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          return (
            <div 
              key={service.id}
              id={`service-${service.id}`}
              className="group relative flex flex-col justify-between bg-surface-dark rounded-none p-5 border border-neutral-850 hover:border-primaryAccent transition-all duration-350 overflow-hidden"
            >
              {/* Top border glow effect */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primaryAccent to-secondaryAccent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Inner Content */}
              <div className="space-y-5">
                

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black text-primaryText uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="font-mono text-[11px] text-primaryAccent font-semibold leading-relaxed">
                  {service.tagline}
                </p>
              </div>

              {/* Body Description */}
              <p className="text-mutedText/90 text-xs sm:text-sm leading-relaxed font-sans">
                {service.description}
              </p>

              {/* Business ROI block (Conversion copy focus) */}
              <div className="p-3 bg-neutral-950/80 border border-neutral-900 rounded-none font-mono text-[11px]">
                <div className="font-bold text-primaryText flex items-center gap-1 uppercase mb-0.5">
                  <TrendingUp className="w-3 h-3 text-primaryAccent" />
                  BUSINESS RETURN
                </div>
                <div className="text-mutedText/90 leading-relaxed">
                  {service.roi}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-1.5">
                <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold">
                  CORE SPECIFICATIONS
                </div>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-primaryText/95 font-sans">
                      <Check className="w-3.5 h-3.5 text-primaryAccent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Section: Metrics & Action */}
            <div className="mt-6 pt-5 border-t border-neutral-900 space-y-3">
              
              {/* ROI Metrics List */}
              <div className="grid grid-cols-1 gap-1.5 bg-neutral-900/40 p-2.5 rounded-none border border-neutral-850 font-mono text-[10px]">
                <div className="text-neutral-500 uppercase font-bold text-[8px] tracking-wider">
                  VERIFIED TARGET METRICS
                </div>
                {service.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-primaryAccent font-semibold">
                    <span className="text-primaryAccent font-bold">»</span>
                    <span>{metric}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-primaryAccent hover:text-white border border-neutral-850 hover:border-primaryAccent text-primaryText font-mono font-bold uppercase text-[10px] py-2.5 rounded-none cursor-pointer transition-all group"
              >
                DEPLOY SYSTEM
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

          </div>
          );
        })}
      </div>

      {/* Detailed Technical Deep Dive: Web & App Development */}
      <div className="border-t border-neutral-900 pt-12 lg:pt-16 space-y-6 lg:space-y-8">
        <div className="space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
            CLEAN & RELIABLE TECHNICAL ARCHITECTURE
          </h2>
          <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
            I build lightweight, secure websites and systems using modern, reliable technologies. Here are the core pillars that ensure your applications remain fast and secure.
          </p>
        </div>

        {/* Technical Split Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Core Pillars (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 flex-1">
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
                ENGINEERING PILLARS
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primaryAccent uppercase">
                    <Zap className="w-3.5 h-3.5 animate-pulse" />
                    1. SPEED & BUNDLING
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    Your website is optimized using modern compilation tools to reduce file sizes. This ensures pages load instantly on mobile networks and slow internet connections.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primaryAccent uppercase">
                    <Database className="w-3.5 h-3.5" />
                    2. SECURE DATA STORAGE
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    Your business information is stored securely in structured databases. I use reliable, modern data services to keep your customer records protected and easily accessible.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-primaryAccent uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    3. API & ENDPOINT SECURITY
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    To protect your private integrations (such as Stripe payments or Gemini AI keys), all connections are handled through secure server-side routes, keeping your sensitive API keys completely hidden.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Badge */}
            <div className="bg-neutral-950 p-4 border border-neutral-900 rounded-none font-mono text-[10px] text-neutral-500 flex justify-between items-center">
              <div>
                <span className="text-primaryAccent font-bold">CORE PERFORMANCE ENGINE</span>
                <span className="block mt-0.5">TLS 1.3 Encryption, SSL, Gzip/Brotli active</span>
              </div>
              <div className="text-right text-primaryAccent font-bold font-mono">
                99.9% SLAS
              </div>
            </div>
          </div>

          {/* Interactive Compilation Sandbox (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-surface-dark border border-neutral-850 p-5 lg:p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-primaryAccent font-bold uppercase tracking-widest">
                </span>
              </div>
              <h3 className="font-display text-lg font-black text-primaryText uppercase">
                WEBSITE PERFORMANCE SIMULATOR
              </h3>
              <p className="text-mutedText text-xs leading-relaxed font-sans">
                See how a modern website is optimized for production. Select an action below to simulate code optimization, secure database connections, or speed audits in real-time.
              </p>
            </div>

            {/* Simulated Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1">
              {[
                { id: 'compile', label: '1. COMPILING BUNDLE', desc: 'Rollup Chunk Compiling' },
                { id: 'secure', label: '2. CORS & SECURE SSL', desc: 'Secure Proxy Testing' },
                { id: 'vitals', label: '3. CORE WEB VITALS', desc: 'Auditing Performance' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setActiveSimId(opt.id)}
                  disabled={isCompiling}
                  className={`p-2.5 text-left border rounded-none cursor-pointer font-mono tracking-wide transition-all ${
                    activeSimId === opt.id 
                      ? 'bg-primaryAccent/10 border-primaryAccent text-primaryAccent' 
                      : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800 text-mutedText'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`text-[10px] font-bold ${activeSimId === opt.id ? 'text-primaryAccent' : 'text-primaryText'}`}>{opt.label}</div>
                  <div className="text-[9px] text-neutral-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            {/* Console Output Screen */}
            <div className="bg-neutral-950 border border-neutral-900 p-4 font-mono text-[11px] text-neutral-400 space-y-1.5 min-h-[140px] flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-1 mb-1.5">
                  <span className="text-primaryAccent font-bold">TERMINAL OUTPUT: {activeSimId.toUpperCase()}_ENGINE</span>
                  <span className="text-neutral-500 text-[10px]">STATUS: STANDBY</span>
                </div>
                
                {simLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-1 leading-normal">
                    <span className="text-neutral-600 font-bold shrink-0">»</span>
                    <span className={log.startsWith('SUCCESS') || log.startsWith('COMPLETED') ? 'text-primaryAccent font-semibold' : log.startsWith('ERROR') ? 'text-red-400' : 'text-neutral-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Loader and Simulation Trigger Button wrapped in ElectricBorder effect */}
              <ElectricBorder
                color="#50C878"
                borderRadius={0}
                speed={isCompiling ? 2.5 : 0.8}
                chaos={isCompiling ? 0.25 : 0.08}
                className="w-full mt-2"
              >
                <button
                  onClick={triggerCompilation}
                  disabled={isCompiling}
                  className="w-full bg-black hover:bg-neutral-900 disabled:bg-neutral-950 border border-neutral-850 text-primaryText hover:text-white disabled:text-primaryAccent font-mono font-bold uppercase text-[10px] py-2.5 rounded-none cursor-pointer disabled:cursor-not-allowed transition-all flex items-center justify-center gap-1.5 relative z-10"
                >
                  {isCompiling ? (
                    <>
                      <Zap className="w-3.5 h-3.5 animate-bounce text-primaryAccent" />
                      <span>COMPILATION IN PROGRESS... ({progress}%)</span>
                    </>
                  ) : (
                    <>
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>TRIGGER SIMULATION</span>
                    </>
                  )}
                </button>
              </ElectricBorder>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
