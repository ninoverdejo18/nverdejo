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
      tagline: 'Engineered for sub-second delivery and robust data systems.',
      description: 'Slow, bloated interfaces quietly drain conversion rates. I design, compile, and deploy lightweight web architectures that handle massive traffic spikes with zero lag. No unnecessary plugins, no template bloat.',
      roi: 'Reduces user attrition and turns visitors into high-ticket leads through pristine client state management.',
      features: [
        'Vite + React single-page compiling',
        'Custom interactive analytics panels',
        'Strict type-safe client engines',
        'Fluid layout animations and responsive design'
      ],
      metrics: [
        '100/100 Google Core Web Vitals',
        '<1.2s interactive transition time',
        'Zero manual rendering overhead'
      ]
    },
    {
      id: 'ai-automation',
      title: 'AI Automations',
      tagline: 'Replace multi-step manual processes with automated routines.',
      description: 'Founders and teams routinely waste hours sync-copying data between CRMs, spreadsheets, and emails. I architect custom webhook pipelines and smart LLM categorization interfaces that execute multi-system synchronization tasks.',
      roi: 'Eliminates human entry errors and frees up 12–20 valuable working hours weekly per team member.',
      features: [
        'API & webhook network syncing',
        'Smart data synthesis via Gemini API',
        'Continuous CRM automation triggers',
        'Secure token handling & error catchers'
      ],
      metrics: [
        '15+ weekly hours restored instantly',
        '99.8% acceleration on lead processing',
        'Zero human ingestion mistakes'
      ]
    },
    {
      id: 'personal-va',
      title: 'Personal & Virtual Assistance',
      tagline: 'Continuous calendar, inbox, and administrative synchronization.',
      description: 'Daily administrative and coordination loops consume executive bandwidth. I act as an elite assistant multi-tool, managing your meetings, triaging incoming communication streams, organizing files, and executing research so you stay focused.',
      roi: 'Restores focus hours, protects daily calendars, and eliminates administrative overhead with continuous reliable support.',
      features: [
        'Inbox triage & detailed response drafts',
        'Executive calendar alignment & scheduling',
        'Comprehensive travel planning & itineraries',
        'Market research & digital record management'
      ],
      metrics: [
        '<1 hour response for critical tasks',
        '8+ cognitive hours restored weekly',
        'Seamless standard tool integration'
      ]
    }
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'web-dev':
        return <Code className="w-6 h-6 text-primaryAccent" />;
      case 'ai-automation':
        return <Cpu className="w-6 h-6 text-secondaryAccent" />;
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
          SYSTEMS ARCHITECTURE & AUTOMATION ENGINE
        </h2>
        
        <p className="text-mutedText/90 text-sm sm:text-base leading-relaxed">
          I replace fragmented tools with cohesive systems. Every integration is configured for speed, high availability, and measurable ROI.
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
                
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                  <div className="p-2.5 bg-neutral-900 border border-neutral-850 rounded-none">
                    {getIcon(service.id)}
                  </div>
                  <div className="text-right">
                  </div>
                </div>

              {/* Title & Tagline */}
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-black text-primaryText uppercase tracking-tight">
                  {service.title}
                </h3>
                <p className="font-mono text-[11px] text-secondaryAccent font-semibold leading-relaxed">
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
                  <TrendingUp className="w-3 h-3 text-green-400" />
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
                  <div key={index} className="flex items-center gap-1.5 text-green-400 font-semibold">
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
            HIGH-PERFORMANCE CLIENT-SERVER STACK
          </h2>
          <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
            I construct lightweight, type-safe digital products using a hand-optimized technical blueprint. Here is the exact architectural stack and pipeline that powers every system I deploy.
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
                    1. COMPILING & BUNDLING
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    Vite compiles JSX/TSX instantly with pre-configured Rollup treeshaking. Production assets are minified, compressed, and split into lazy-loaded chunks to ensure a sub-1.2s First Contentful Paint (FCP).
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-secondaryAccent uppercase">
                    <Database className="w-3.5 h-3.5" />
                    2. SECURE STATE & PERSISTENCE
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    Data storage scales seamlessly. I leverage Postgres managed instances for relational compliance, with schema validation handled programmatically via TypeScript and structured JSON layers.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-green-400 uppercase">
                    <Shield className="w-3.5 h-3.5" />
                    3. API & MIDDLEWARE SECURITY
                  </div>
                  <p className="text-xs text-mutedText leading-relaxed pl-5 font-sans">
                    All third-party credentials (Stripe, Gemini, SendGrid) are encapsulated server-side via Express routes. Sensitive operations enforce CSRF, CORS policies, and rate-limiting to prevent automated exploitation.
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
              <div className="text-right text-green-400 font-bold font-mono">
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
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span className="text-[9px] text-green-400 font-mono">ACTIVE_MONITOR</span>
                </span>
              </div>
              <h3 className="font-display text-lg font-black text-primaryText uppercase">
                WEB DEVELOPMENT COMPILATION SIMULATOR
              </h3>
              <p className="text-mutedText text-xs leading-relaxed font-sans">
                Observe the lifecycle of a high-performance app deployment. Select a deployment pipeline to simulate asset compilation, tree-shaking, bundle size audit, and TLS routing in real-time.
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
                    <span className={log.startsWith('SUCCESS') || log.startsWith('COMPLETED') ? 'text-green-400 font-semibold' : log.startsWith('ERROR') ? 'text-red-400' : 'text-neutral-300'}>
                      {log}
                    </span>
                  </div>
                ))}
              </div>

              {/* Loader indicator bar */}
              {isCompiling ? (
                <div className="space-y-1 pt-2 border-t border-neutral-900">
                  <div className="flex items-center justify-between text-[9px] font-bold text-primaryAccent">
                    <span>COMPILATION IN PROGRESS...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-neutral-900 h-1 rounded-none overflow-hidden">
                    <div className="bg-primaryAccent h-full transition-all duration-100" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              ) : (
                <ElectricBorder
                  color="#ff0000"
                  borderRadius={0}
                  speed={0.8}
                  chaos={0.08}
                  className="w-full"
                >
                  <button
                    onClick={triggerCompilation}
                    className="w-full bg-black hover:bg-primaryAccent hover:text-white border border-neutral-850 hover:border-primaryAccent text-primaryText font-mono font-bold uppercase text-[10px] py-2 rounded-none cursor-pointer transition-all flex items-center justify-center gap-1.5 relative z-10"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    TRIGGER SIMULATION
                  </button>
                </ElectricBorder>
              )}
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
