/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { 
  Cpu, 
  Clock, 
  Workflow, 
  Activity, 
  ArrowRight, 
  Zap, 
  CheckCircle, 
  Terminal, 
  Play, 
  Layers,
  Database,
  Shield,
  Globe,
  RefreshCw,
  MessageSquare,
  Mail,
  ChevronRight,
  FileText,
  Server,
  Settings,
  Code,
  Monitor,
  Layout,
  Calendar,
  Briefcase,
  User,
  Plane,
  Search
} from 'lucide-react';
import { TabType } from '../types';
import Hyperspeed from './Hyperspeed';
import { hyperspeedPresets } from './HyperSpeedPresets';
import ElectricBorder from './ElectricBorder';
import DesignGraphicShowcase from './DesignGraphicShowcase';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  theme?: 'dark' | 'light';
}

const FLOW_SCENARIOS = [
  {
    id: 'lead-ingest',
    title: 'Lead Ingest & AI Qualification',
    description: 'Automates customer acquisition pipelines, qualifying prospects instantly without manual review.',
    steps: [
      { label: 'Customer Form', icon: 'Globe', desc: 'Visitor submits contact or quote request' },
      { label: 'Validator', icon: 'Shield', desc: 'Validates email format & filters spam' },
      { label: 'Gemini Agent', icon: 'Cpu', desc: 'Summarizes bottleneck and qualifies tier level' },
      { label: 'CRM Injection', icon: 'Database', desc: 'Creates lead record with categorized attributes' },
      { label: 'Notification', icon: 'MessageSquare', desc: 'Dispatches high-priority Slack alerts' }
    ]
  },
  {
    id: 'invoice-payment',
    title: 'Order Processing & PDF Delivery',
    description: 'Handles financial handshakes and issues compliant receipts instantly.',
    steps: [
      { label: 'Stripe Hook', icon: 'Zap', desc: 'Payment confirmation event received' },
      { label: 'Database Auth', icon: 'Database', desc: 'Updates customer subscription status' },
      { label: 'PDF Compiler', icon: 'FileText', desc: 'Dynamically generates branded PDF invoice' },
      { label: 'SMTP Mailer', icon: 'Mail', desc: 'Dispatches receipt to client via Resend' },
      { label: 'Sheet Parity', icon: 'RefreshCw', desc: 'Logs transaction to Google Sheets ledger' }
    ]
  },
  {
    id: 'system-sync',
    title: 'High-Frequency Database Sync',
    description: 'Synchronizes primary database records with marketing databases and tracking ledgers.',
    steps: [
      { label: 'Db Trigger', icon: 'Database', desc: 'New row or state change in PostgreSQL' },
      { label: 'Redis Queue', icon: 'Layers', desc: 'Ingests event to guarantee delivery order' },
      { label: 'Parser Engine', icon: 'Cpu', desc: 'Transforms internal schemas to target formats' },
      { label: 'API Gateway', icon: 'RefreshCw', desc: 'Dispatches batch updates to HubSpot/ActiveCampaign' },
      { label: 'Telemetry Log', icon: 'Activity', desc: 'Verifies 100% parity and records execution speed' }
    ]
  }
];

const VA_TASK_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'admin-inbox', label: 'Admin & Inbox' },
  { id: 'calendar-sched', label: 'Calendar & Scheduling' },
  { id: 'travel-events', label: 'Travel & Events' },
  { id: 'data-research', label: 'Research & Data' },
  { id: 'creative-content', label: 'Content & Support' },
  { id: 'lifestyle-errands', label: 'Lifestyle & Errands' },
];

const VA_TASKS = [
  {
    id: 'email-triage',
    category: 'admin-inbox',
    title: 'Inbox Triage & Response Drafts',
    description: 'Monitor daily incoming communications, filter out spam, organize priority threads, and prepare context-rich drafts for swift approval.',
    freq: 'Daily (AM/PM)',
    sla: '< 2 hours',
    impact: 'Keep inboxes clear, organized, and focused on high-priority client relations',
    icon: 'Mail'
  },
  {
    id: 'document-management',
    category: 'admin-inbox',
    title: 'Document Control & Digital Archiving',
    description: 'File invoices, digitize receipts, index resources, and manage shared cloud folder permissions securely.',
    freq: 'Weekly',
    sla: 'Same day',
    impact: 'Find any critical asset instantly without searching through endless chats',
    icon: 'FileText'
  },
  {
    id: 'calendar-coordination',
    category: 'calendar-sched',
    title: 'Executive Calendar Management',
    description: 'Cross-coordinate multi-party schedules, block deep work time, buffer appointments, and resolve meeting conflicts seamlessly.',
    freq: 'Continuous',
    sla: '< 1 hour',
    impact: 'Optimize daily routines without over-scheduling or double-booking',
    icon: 'Calendar'
  },
  {
    id: 'appointment-reminder',
    category: 'calendar-sched',
    title: 'Briefing Packets & Meeting Preps',
    description: 'Prepare concise briefing briefs on attendees, company profiles, and key objectives before major calls.',
    freq: 'Before meetings',
    sla: '< 4 hours',
    impact: 'Go into every call fully prepared, armed with key context and talking points',
    icon: 'Briefcase'
  },
  {
    id: 'travel-itineraries',
    category: 'travel-events',
    title: 'Multi-Destination Travel Planning',
    description: 'Research flights, reserve properties, organize ground transfers, and compile beautiful interactive itineraries.',
    freq: 'Ad-hoc',
    sla: '< 24 hours',
    impact: 'Stress-free journeys with custom travel preferences pre-loaded',
    icon: 'Plane'
  },
  {
    id: 'event-planning',
    category: 'travel-events',
    title: 'Virtual & On-Site Event Logistics',
    description: 'Coordinate catering options, book venues, distribute invites, manage RSVPs, and coordinate vendor setup timelines.',
    freq: 'Ad-hoc',
    sla: 'Milestone-based',
    impact: 'Seamless event execution that leaves a stellar brand impression',
    icon: 'Layers'
  },
  {
    id: 'market-research',
    category: 'data-research',
    title: 'Competitor & Market Research',
    description: 'Extract market dynamics, compile product pricing sheets, and summarize industry trends into digestible tables.',
    freq: 'On-demand',
    sla: '< 48 hours',
    impact: 'Data-driven decision making backed by structured research dossiers',
    icon: 'Search'
  },
  {
    id: 'spreadsheet-analytics',
    category: 'data-research',
    title: 'Data Entry & Reporting Audits',
    description: 'Consolidate CSV reports, sanitize customer contact sheets, identify outliers, and compile monthly KPIs.',
    freq: 'Monthly',
    sla: '< 12 hours',
    impact: 'Pristine records that keep marketing systems running smoothly',
    icon: 'Database'
  },
  {
    id: 'social-scheduling',
    category: 'creative-content',
    title: 'Content Distribution & Scheduling',
    description: 'Schedule social media feeds, format blog drafts in Notion, publish newsletters, and monitor comments.',
    freq: 'Weekly',
    sla: 'On schedule',
    impact: 'Consistent brand touchpoints without taking up core creative hours',
    icon: 'Globe'
  },
  {
    id: 'customer-support',
    category: 'creative-content',
    title: 'First-Line Customer Support',
    description: 'Acknowledge tier-1 customer inquiries, handle basic help desk tickets, and escalate technical requests to developers.',
    freq: 'Daily',
    sla: '< 4 hours',
    impact: 'Provides responsive, friendly assistance to protect user satisfaction',
    icon: 'MessageSquare'
  },
  {
    id: 'lifestyle-coordination',
    category: 'lifestyle-errands',
    title: 'Lifestyle & Errand Coordination',
    description: 'Coordinate home repair services, schedule dental visits, locate bespoke gifts, and manage personal subscriptions.',
    freq: 'On-demand',
    sla: '< 6 hours',
    impact: 'Clear mental bandwidth by outsourcing domestic logistics',
    icon: 'User'
  },
  {
    id: 'gift-concierge',
    category: 'lifestyle-errands',
    title: 'Gift Sourcing & Card Deliveries',
    description: 'Curate custom gift catalogs for family/clients, write custom card drafts, and manage timely flower or hamper dropoffs.',
    freq: 'Ad-hoc',
    sla: '< 12 hours',
    impact: 'Never miss birthdays or work anniversaries, showing thoughtful attention',
    icon: 'Zap'
  },
];

const ENGINE_MODES = [
  { key: 'one', label: 'NEOSLATE_VIOLET', desc: 'Sinuous gravity field warp', color: 'text-violet-400', glow: 'rgba(139,92,246,0.35)' },
  { key: 'four', label: 'EMERALD_CYBER', desc: 'High-frequency emerald grid', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.35)' },
  { key: 'five', label: 'SOLAR_FLARE', desc: 'Electromagnetic solar drift', color: 'text-orange-500', glow: 'rgba(249,115,22,0.35)' },
  { key: 'two', label: 'CYBER_CRIMSON', desc: 'Ridge altitude curve velocity', color: 'text-red-500', glow: 'rgba(239,68,68,0.35)' },
] as const;

function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 0.25, 0.75, 1], [50, 0, 0, -50]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.97]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomeTab({ setActiveTab, theme = 'dark' }: HomeTabProps) {
  const [presetKey, setPresetKey] = useState<keyof typeof hyperspeedPresets>('four');
  
  const { scrollY } = useScroll();

  // Create a spring-damped version of scrollY for smooth inertia and lag-free transitions
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
    restDelta: 0.001
  });

  // Smooth scroll animations mapping.
  // When user scrolls from 0px (top of page) to 800px (approx height of the hero),
  // we smoothly translate elements upwards (parallax), fade them out, and scale down slightly.
  const textY = useTransform(smoothScrollY, [0, 800], [0, 160]);
  const textOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);
  const textScale = useTransform(smoothScrollY, [0, 800], [1, 0.94]);

  // Background smooth opacity fade (avoid layout translation & scaling on WebGL canvas to eliminate rendering lag)
  const bgOpacity = useTransform(smoothScrollY, [0, 800], [0.55, 0.1]);

  // Bottom HUD parallax & fade
  const hudY = useTransform(smoothScrollY, [0, 800], [0, 60]);
  const hudOpacity = useTransform(smoothScrollY, [0, 500], [1, 0]);

  const [isHyperBoost, setIsHyperBoost] = useState(false);
  const [boostPercentage, setBoostPercentage] = useState(0);

  const triggerHyperBoost = () => {
    if (isHyperBoost) return;
    setIsHyperBoost(true);
    setBoostPercentage(100);
    
    let currentPct = 100;
    const interval = setInterval(() => {
      currentPct -= 4;
      if (currentPct <= 0) {
        clearInterval(interval);
        setIsHyperBoost(false);
        setBoostPercentage(0);
      } else {
        setBoostPercentage(currentPct);
      }
    }, 120);
  };

  // Stats counter simulation
  const [hoursSaved, setHoursSaved] = useState(1320);
  const [tasksEliminated, setTasksEliminated] = useState(42810);
  const [activeAutomations, setActiveAutomations] = useState(24);
  const [lastEvent, setLastEvent] = useState('System Idle');
  const [logs, setLogs] = useState<string[]>([
    'INITIALIZED_PIPELINE: Google Sheets to CRM Sync',
    'STATUS: Active monitoring enabled',
    'IDLE: Waiting for trigger events'
  ]);

  // Simulated active tasks running in dashboard
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, name: 'Lead Ingestion', duration: '0.4s', status: 'COMPLETED', progress: 100 },
    { id: 2, name: 'AI Summarization', duration: '1.2s', status: 'RUNNING', progress: 45 },
    { id: 3, name: 'Invoice Automation', duration: '0.8s', status: 'QUEUED', progress: 0 }
  ]);

  // Blueprint simulator states
  const [activeScenario, setActiveScenario] = useState('lead-ingest');
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);

  // Virtual assistant task ledger state
  const [activeVaCategory, setActiveVaCategory] = useState('all');

  const startSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    
    const scenario = FLOW_SCENARIOS.find(s => s.id === activeScenario);
    if (!scenario) return;
    
    const stepsCount = scenario.steps.length;
    let step = 0;
    
    setLastEvent(`TRIGGERED: Initializing pipeline [${scenario.title}]`);
    setLogs(l => [`START: Pipeline execution initialized`, ...l.slice(0, 4)]);

    const interval = setInterval(() => {
      step++;
      if (step < stepsCount) {
        setActiveStepIndex(step);
        const currentStep = scenario.steps[step];
        setLastEvent(`PIPELINE_EXEC: ${currentStep.label} completed`);
        setLogs(l => [`SUCCESS: ${currentStep.label} verified (${(0.1 + Math.random() * 0.2).toFixed(2)}s)`, ...l.slice(0, 4)]);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setActiveStepIndex(null);
          setIsSimulating(false);
          setLastEvent(`COMPLETED: ${scenario.title} fully synchronized`);
          setLogs(l => [`PIPELINE_SUCCESS: 100% parity verified`, ...l.slice(0, 4)]);
        }, 800);
      }
    }, 900);
  };

  const handleScenarioChange = (id: string) => {
    if (isSimulating) return;
    setActiveScenario(id);
    setActiveStepIndex(null);
  };

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-4 h-4" />;
      case 'Shield': return <Shield className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      case 'Mail': return <Mail className="w-4 h-4" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'Layout': return <Layout className="w-4 h-4" />;
      case 'Monitor': return <Monitor className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      default: return <Workflow className="w-4 h-4" />;
    }
  };

  const getVaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-5 h-5 text-primaryAccent" />;
      case 'Shield': return <Shield className="w-5 h-5 text-green-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-primaryAccent" />;
      case 'Database': return <Database className="w-5 h-5 text-secondaryAccent" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-primaryAccent" />;
      case 'Zap': return <Zap className="w-5 h-5 text-secondaryAccent" />;
      case 'Layers': return <Layers className="w-5 h-5 text-secondaryAccent" />;
      case 'Mail': return <Mail className="w-5 h-5 text-primaryAccent" />;
      case 'RefreshCw': return <RefreshCw className="w-5 h-5 text-green-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-secondaryAccent" />;
      case 'FileText': return <FileText className="w-5 h-5 text-primaryAccent" />;
      case 'Layout': return <Layout className="w-5 h-5 text-secondaryAccent" />;
      case 'Monitor': return <Monitor className="w-5 h-5 text-primaryAccent" />;
      case 'Code': return <Code className="w-5 h-5 text-primaryAccent" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-primaryAccent" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-secondaryAccent" />;
      case 'Plane': return <Plane className="w-5 h-5 text-green-400" />;
      case 'Search': return <Search className="w-5 h-5 text-primaryAccent" />;
      case 'User': return <User className="w-5 h-5 text-secondaryAccent" />;
      default: return <Workflow className="w-5 h-5 text-primaryAccent" />;
    }
  };

  useEffect(() => {
    // Increment stats gradually to simulate real-time performance
    const statsInterval = setInterval(() => {
      setHoursSaved(prev => prev + (Math.random() > 0.7 ? 1 : 0));
      setTasksEliminated(prev => prev + (Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0));
    }, 4000);

    // Simulated background tasks pipeline
    const jobInterval = setInterval(() => {
      setActiveJobs(prev => {
        const next = [...prev];
        // Tick up running job
        const runningIndex = next.findIndex(j => j.status === 'RUNNING');
        if (runningIndex !== -1) {
          const currentProgress = next[runningIndex].progress;
          if (currentProgress >= 100) {
            next[runningIndex].status = 'COMPLETED';
            next[runningIndex].duration = (0.5 + Math.random() * 1.5).toFixed(1) + 's';
            // Trigger a log
            const tasksList = ['CRM Update', 'Slack Alert', 'Gemini Categorization', 'Webhook Dispatch'];
            const randomTask = tasksList[Math.floor(Math.random() * tasksList.length)];
            setLastEvent(`DISPATCHED: ${randomTask} successfully executed`);
            setLogs(l => [`SUCCESS: ${randomTask} verified in ${next[runningIndex].duration}`, ...l.slice(0, 4)]);
            
            // Queue next job
            const queuedIndex = next.findIndex(j => j.status === 'QUEUED');
            if (queuedIndex !== -1) {
              next[queuedIndex].status = 'RUNNING';
              next[queuedIndex].progress = 10;
            }
          } else {
            next[runningIndex].progress = currentProgress + 15;
          }
        } else {
          // If all completed, reset and randomize pipeline
          const completedCount = next.filter(j => j.status === 'COMPLETED').length;
          if (completedCount === next.length) {
            const taskPool = [
              { name: 'Lead Qualification', baseTime: 0.6 },
              { name: 'Workspace Event Sync', baseTime: 0.9 },
              { name: 'Document Assembler', baseTime: 1.4 },
              { name: 'Database Replication', baseTime: 0.5 }
            ];
            
            // Pick three tasks
            const shuffled = [...taskPool].sort(() => 0.5 - Math.random());
            return [
              { id: 1, name: shuffled[0].name, duration: shuffled[0].baseTime + 's', status: 'RUNNING', progress: 10 },
              { id: 2, name: shuffled[1].name, duration: 'pending', status: 'QUEUED', progress: 0 },
              { id: 3, name: shuffled[2].name, duration: 'pending', status: 'QUEUED', progress: 0 }
            ];
          }
        }
        return next;
      });
    }, 1200);

    return () => {
      clearInterval(statsInterval);
      clearInterval(jobInterval);
    };
  }, []);

  const isLight = theme === 'light';
  const basePreset = hyperspeedPresets[presetKey];
  const activePresetBase = {
    ...basePreset,
    colors: {
      ...basePreset.colors,
      background: isLight ? 0xfafafb : basePreset.colors.background,
      roadColor: isLight ? 0xe4e4e7 : basePreset.colors.roadColor,
      islandColor: isLight ? 0xf4f4f5 : basePreset.colors.islandColor,
      shoulderLines: isLight ? 0x71717a : basePreset.colors.shoulderLines,
      brokenLines: isLight ? 0x71717a : basePreset.colors.brokenLines,
      leftCars: isLight ? [0x09090b, 0x18181b, 0x27272a] : basePreset.colors.leftCars,
      rightCars: isLight ? [0x000000, 0x09090b, 0x18181b] : basePreset.colors.rightCars,
      sticks: isLight ? 0x18181b : basePreset.colors.sticks
    }
  };

  const dynamicEffectOptions = isHyperBoost 
    ? {
        ...activePresetBase,
        movingAwaySpeed: [activePresetBase.movingAwaySpeed[0] * 5, activePresetBase.movingAwaySpeed[1] * 5],
        movingCloserSpeed: [activePresetBase.movingCloserSpeed[0] * 5, activePresetBase.movingCloserSpeed[1] * 5],
        fov: 135,
        speedUp: 10,
      }
    : activePresetBase;

  return (
    <div className="space-y-16">
      
      {/* 3D HYPERSPEED HERO SECTION */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen h-screen bg-bg-dark overflow-hidden flex flex-col justify-between items-center p-6 sm:p-12 text-center rounded-none select-none">
        {/* Hyperspeed Interactive 3D Canvas Background with smooth scroll-driven opacity fade */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity: bgOpacity }}
        >
          <Hyperspeed effectOptions={dynamicEffectOptions} />
        </motion.div>

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b dark:from-black/80 dark:via-black/20 dark:to-black/95 from-neutral-50/80 via-neutral-50/20 to-neutral-50/95 pointer-events-none z-1" />

        {/* Center Content Overlay with Framer Motion Staggered Transitions & Smooth Scroll Transform */}
        <motion.div 
          className="relative z-10 max-w-4xl flex flex-col items-center my-auto space-y-6 px-4"
          style={{ y: textY, opacity: textOpacity, scale: textScale }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
              }
            }
          }}
        >
          {/* Large Hero Title */}
          <motion.h1 
            variants={{
              hidden: { y: 25, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95]"
          >
            <span className={isLight ? 'text-black' : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400'}>
              WE WEAVE FLUID PIPELINES
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent via-purple-400 to-secondaryAccent">
              & HIGH-SPEED PRODUCTS
            </span>
          </motion.h1>

          {/* CTA Buttons with hover visual glow effects */}
          <motion.div 
            variants={{
              hidden: { y: 15, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-2"
          >
            <button
              id="hero-cta-btn"
              onClick={() => setActiveTab('contact')}
              className="group relative flex items-center justify-center gap-3 bg-primaryAccent hover:bg-primaryAccent/90 text-white font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-8 border-none active:translate-y-0.5 transition-all cursor-pointer shadow-[0_0_20px_rgba(139,92,246,0.35)] rounded-none"
            >
              START A PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              id="hero-secondary-cta-btn"
              onClick={() => setActiveTab('services')}
              className="flex items-center justify-center gap-2 bg-zinc-900/95 dark:bg-neutral-900/90 hover:bg-zinc-800 dark:hover:bg-white/10 text-white border border-zinc-700 dark:border-neutral-700 font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-8 transition-colors cursor-pointer rounded-none"
            >
              VIEW CAPABILITIES
            </button>

            {/* Futuristic NITRO CHARGE warp trigger */}
            <button
              onClick={triggerHyperBoost}
              disabled={isHyperBoost}
              className={`flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-8 transition-all duration-300 rounded-none cursor-pointer border ${
                isHyperBoost 
                  ? 'bg-red-950/40 border-red-500 text-red-400 animate-pulse' 
                  : 'bg-zinc-900/95 dark:bg-neutral-900/90 hover:bg-zinc-800 dark:hover:bg-red-950/20 border-red-900/60 hover:border-red-500 text-red-500 hover:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isHyperBoost ? 'animate-bounce' : ''}`} />
              {isHyperBoost ? `ENGAGED [${boostPercentage}%]` : 'BOOST CORES'}
            </button>
          </motion.div>
        </motion.div>

        {/* Warp speed full screen glitch particle flash */}
        {isHyperBoost && (
          <div className="absolute inset-0 pointer-events-none z-15 border-[3px] border-red-500/20 animate-pulse bg-red-500/[0.02]">
            {/* Grid particle dots */}
            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.06]" />
            {/* Warning indicator */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-950/95 border border-red-500/40 text-red-500 px-4 py-1.5 font-mono text-[9px] font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              OVERCHARGE IN PROGRESS: STABILITY THRESHOLD AT {(boostPercentage + 15).toFixed(0)}%
            </div>
          </div>
        )}
      </div>

      {/* Interactive Web Design Graphic Sample & Specimen */}
      <ScrollRevealSection>
        <DesignGraphicShowcase />
      </ScrollRevealSection>

      {/* Grid containing operational telemetry center and stats */}
      <ScrollRevealSection>
        <div id="home-tab-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start py-2 lg:py-4">
        
        {/* LEFT COLUMN: Simplified Overview and Metrics Grid */}
        <div id="home-copy-section" className="lg:col-span-7 space-y-6 flex flex-col justify-center">
          
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
              High-Frequency Business Automation
            </h2>
            <p className="text-mutedText/90 text-sm leading-relaxed font-sans">
              I audit, design, and deploy redundant server pipelines that synchronize data across databases, trigger instantaneous notification alerts, and automatically generate reports. No middle-tier delays, no manual double-entry.
            </p>
          </div>

          {/* Direct ROI Proof Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-900 pt-6 mt-2">
            <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">01. REDUNDANCY</div>
              <div className="font-display text-xl font-extrabold text-primaryText mt-1">98% Eliminated</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Workflow human errors</div>
            </div>
            
            <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">02. SPEED</div>
              <div className="font-display text-xl font-extrabold text-primaryAccent mt-1">10x Accelerated</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">SLA pipeline trigger</div>
            </div>
            
            <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">03. UPTIME</div>
              <div className="font-display text-xl font-extrabold text-secondaryAccent mt-1">100% Secure</div>
              <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Zero single points</div>
            </div>
          </div>

        </div>

      {/* RIGHT COLUMN: Interactive Glassmorphism Operations Center */}
      <div id="home-dashboard-section" className="lg:col-span-5 space-y-6 relative">
        
        {/* Glow backdrop decorator */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-primaryAccent/5 to-secondaryAccent/5 blur-2xl opacity-40 pointer-events-none" />
        
        {/* Glassmorphic Operations Interface */}
        <div className="relative glass-panel rounded-none border border-neutral-800 overflow-hidden shadow-2xl p-5 space-y-4">
          
          {/* Dashboard Header Status */}
          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-450 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono text-[10px] text-primaryText font-bold uppercase tracking-wider">
                CORE_TELEMETRY.RUNNING
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[9px] text-mutedText bg-neutral-900/80 px-2 py-0.5 border border-neutral-850 rounded-none">
              <Activity className="w-2.5 h-2.5 text-primaryAccent animate-pulse" />
              TPS: 8.42
            </div>
          </div>

          {/* Key Metric Bento Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            
            {/* Hours Saved Bento */}
            <div className="p-3.5 bg-neutral-950/40 border border-neutral-850 rounded-none relative overflow-hidden group hover:border-primaryAccent/40 transition-colors">
              <div className="absolute top-0 right-0 p-1 bg-primaryAccent/5 border-b border-l border-neutral-850 text-primaryAccent">
                <Clock className="w-3 h-3" />
              </div>
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">HOURS_SAVED</div>
              <div className="font-display text-xl font-bold text-primaryText mt-1 tracking-tight">
                {hoursSaved.toLocaleString()}+
              </div>
              <div className="text-[9px] text-green-400 font-mono mt-0.5 flex items-center gap-0.5">
                ▲ +4h this week
              </div>
            </div>

            {/* Tasks Eliminated Bento */}
            <div className="p-3.5 bg-neutral-950/40 border border-neutral-850 rounded-none relative overflow-hidden group hover:border-secondaryAccent/40 transition-colors">
              <div className="absolute top-0 right-0 p-1 bg-secondaryAccent/5 border-b border-l border-neutral-850 text-secondaryAccent">
                <Workflow className="w-3 h-3" />
              </div>
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">TASKS_DONE</div>
              <div className="font-display text-xl font-bold text-primaryText mt-1 tracking-tight">
                {tasksEliminated.toLocaleString()}+
              </div>
              <div className="text-[9px] text-green-400 font-mono mt-0.5 flex items-center gap-0.5">
                ▲ 100% automated
              </div>
            </div>

            {/* Active Automations Bento */}
            <div className="p-3.5 bg-neutral-950/40 border border-neutral-850 rounded-none relative overflow-hidden group hover:border-neutral-700 transition-colors">
              <div className="absolute top-0 right-0 p-1 bg-neutral-900 text-neutral-400">
                <Cpu className="w-3 h-3" />
              </div>
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">CORE_ENGINES</div>
              <div className="font-display text-xl font-bold text-primaryText mt-1 tracking-tight">
                {activeAutomations} <span className="text-neutral-500 text-xs">active</span>
              </div>
              <div className="text-[9px] text-primaryAccent font-mono mt-0.5">
                99.99% Node Uptime
              </div>
            </div>

            {/* Response Latency Bento */}
            <div className="p-3.5 bg-neutral-950/40 border border-neutral-850 rounded-none relative overflow-hidden group hover:border-green-800/30 transition-colors">
              <div className="absolute top-0 right-0 p-1 bg-green-500/5 border-b border-l border-neutral-850 text-green-400">
                <Zap className="w-3 h-3" />
              </div>
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">LATENCY_AVG</div>
              <div className="font-display text-xl font-bold text-green-400 mt-1 tracking-tight">
                120ms
              </div>
              <div className="text-[9px] text-mutedText/60 font-mono mt-0.5">
                Instant Triggers
              </div>
            </div>

          </div>

          {/* Simulated Real-Time Job Queue */}
          <div className="space-y-2 bg-neutral-950/80 border border-neutral-900 p-3 rounded-none">
            <div className="flex items-center justify-between text-[10px] font-mono text-mutedText">
              <span className="flex items-center gap-1 font-bold text-primaryText uppercase tracking-wider">
                <Layers className="w-3 h-3 text-primaryAccent" />
                Live Pipelines
              </span>
              <span>Uptime: 2,420h</span>
            </div>
            
            <div className="space-y-2">
              {activeJobs.map((job) => (
                <div key={job.id} className="text-xs bg-neutral-900/30 p-2 rounded-none border border-neutral-850 flex flex-col gap-1 relative overflow-hidden">
                  
                  {/* Job meta */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-medium text-primaryText flex items-center gap-1">
                      <Play className="w-2 h-2 text-primaryAccent animate-pulse" />
                      {job.name}
                    </span>
                    <span className={`font-mono text-[9px] px-1 py-0.2 rounded-none uppercase tracking-wider font-bold ${
                      job.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      job.status === 'RUNNING' ? 'bg-primaryAccent/20 text-primaryAccent border border-primaryAccent/30 animate-pulse' :
                      'bg-neutral-800 text-neutral-400 border border-neutral-700/50'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  {/* Progress bar container */}
                  <div className="w-full bg-neutral-950 h-1 overflow-hidden rounded-none">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        job.status === 'COMPLETED' ? 'bg-green-500' : 'bg-primaryAccent'
                      }`}
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>

                  {/* Job completion speed */}
                  <div className="flex justify-between items-center text-[9px] text-neutral-500 font-mono">
                    <span>Target: Edge API</span>
                    <span>Done in: <strong className="text-primaryText">{job.duration}</strong></span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Terminal Logger */}
          <div className="space-y-2 bg-neutral-950 p-3 rounded-none border border-neutral-900 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 text-mutedText text-[10px] font-bold uppercase tracking-wider pb-1 border-b border-neutral-900">
              <Terminal className="w-3 h-3 text-secondaryAccent" />
              SYSTEM LOGS
            </div>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              <div className="text-primaryAccent font-bold">{`> ${lastEvent}`}</div>
              {logs.map((log, index) => (
                <div key={index} className="text-neutral-500 leading-tight">
                  <span className="text-neutral-600">[{new Date().toLocaleTimeString()}]</span> {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  </ScrollRevealSection>

    {/* Web Design & App Development Core Section */}
    <ScrollRevealSection>
      <div id="design-development-section" className="border-t border-neutral-900 pt-10 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondaryAccent/10 border border-secondaryAccent/30 text-secondaryAccent font-mono text-[10px] font-bold uppercase tracking-wider rounded-none">
          <Code className="w-3 h-3 animate-pulse" />
          WEB DESIGN & CUSTOM APP DEVELOPMENT
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          CRAFTING HIGH-CONVERTING DIGITAL PRODUCTS
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
          I don't build generic templates. I design intuitive interfaces and engineer scalable full-stack applications with an absolute focus on performance, aesthetics, and clean user-state management.
        </p>
      </div>

      {/* Bento Grid highlighting the Design and App Development workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: UI/UX & Web Design */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 relative overflow-hidden group hover:border-secondaryAccent/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 border border-neutral-850 text-secondaryAccent rounded-none">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                High-End Web Design
              </h3>
              <span className="font-mono text-[8px] text-secondaryAccent uppercase font-bold tracking-widest">aesthetic & conversion</span>
            </div>
          </div>
          <p className="text-xs text-mutedText leading-relaxed font-sans">
            A beautiful website is useless if it loads slowly or confuses your users. I build high-fidelity layouts based on modern typographic rules, generous whitespace, and purposeful micro-interactions.
          </p>
          <ul className="space-y-1.5 font-mono text-[10px] text-primaryText">
            <li className="flex items-center gap-2">
              <span className="text-secondaryAccent">»</span>
              <span>Figma Prototypes & Clickable Wireframes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondaryAccent">»</span>
              <span>Responsive Grid & Typographic Hierarchies</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-secondaryAccent">»</span>
              <span>Custom Vector SVGs & Animated Assets</span>
            </li>
          </ul>
        </div>

        {/* Card 2: App Development */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 relative overflow-hidden group hover:border-primaryAccent/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 border border-neutral-850 text-primaryAccent rounded-none">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                Robust App Development
              </h3>
              <span className="font-mono text-[8px] text-primaryAccent uppercase font-bold tracking-widest">full-stack & type-safe</span>
            </div>
          </div>
          <p className="text-xs text-mutedText leading-relaxed font-sans">
            Moving beyond simple pages into functional software. I develop secure applications with custom-built servers, scalable databases, fast client state management, and strict TypeScript integration.
          </p>
          <ul className="space-y-1.5 font-mono text-[10px] text-primaryText">
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Single Page React Applications (Vite)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Type-Safe Client State & Robust API Proxying</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Relational Database Schemas & Integrations</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Performance Standards */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 relative overflow-hidden group hover:border-green-500/40 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-neutral-900 border border-neutral-850 text-green-400 rounded-none">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                Optimization Metrics
              </h3>
              <span className="font-mono text-[8px] text-green-400 uppercase font-bold tracking-widest">sub-second execution</span>
            </div>
          </div>
          <p className="text-xs text-mutedText leading-relaxed font-sans">
            Every millisecond added to loading times directly reduces conversion rates. My products are compiled with tree-shaken bundlers, gzip/brotli compression, and lazy image loader pipelines to guarantee elite performance.
          </p>
          
          <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-2.5 border border-neutral-900 font-mono text-[10px]">
            <div>
              <span className="text-neutral-500 block text-[8px]">LIGHTHOUSE</span>
              <span className="text-green-400 font-extrabold">100 / 100</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[8px]">INTERACTIVE</span>
              <span className="text-primaryAccent font-extrabold">&lt; 1.2s SLA</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </ScrollRevealSection>

    {/* Interactive Blueprint Simulator Section */}
    <ScrollRevealSection>
      <div className="border-t border-neutral-900 pt-10 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-secondaryAccent/10 border border-secondaryAccent/30 text-secondaryAccent font-mono text-[10px] font-bold uppercase tracking-wider rounded-none">
          <Cpu className="w-3 h-3 animate-pulse" />
          OPERATIONAL PIPELINE SIMULATOR
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          ENGINEERED AUTOMATION DIAGRAMS
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
          I don't just write scripts; I build highly visual, fault-tolerant logic maps. Select an operational scenario below and trigger the high-speed simulation to observe exactly how data flows, validates, and synchronizes across systems in real-time.
        </p>
      </div>

      {/* Simulator Dashboard Card */}
      <div className="bg-surface-dark border border-neutral-800 p-5 lg:p-6 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-secondaryAccent" />
        
        {/* Top selection bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <div className="flex flex-wrap gap-2">
            {FLOW_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario.id)}
                disabled={isSimulating}
                className={`px-3 py-1.5 text-left font-mono text-[10px] sm:text-xs font-bold uppercase border tracking-wider transition-all cursor-pointer ${
                  activeScenario === scenario.id
                    ? 'bg-secondaryAccent/10 border-secondaryAccent text-secondaryAccent'
                    : 'bg-neutral-900/40 border-neutral-850 text-mutedText hover:text-primaryText hover:border-neutral-700'
                } disabled:opacity-50 disabled:cursor-not-allowed rounded-none`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Simulation Trigger Button wrapped in ElectricBorder effect */}
          <ElectricBorder
            color="#ff0000"
            borderRadius={0}
            speed={isSimulating ? 2.5 : 0.8}
            chaos={isSimulating ? 0.25 : 0.08}
          >
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="flex items-center gap-2 bg-black hover:bg-zinc-900 disabled:bg-neutral-800 text-white font-mono font-bold uppercase tracking-wider text-[10px] py-2 px-4 border-none transition-all cursor-pointer rounded-none relative z-10"
            >
              {isSimulating ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" />
                  EXECUTING SYSTEM...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  SIMULATE TRIGGER
                </>
              )}
            </button>
          </ElectricBorder>
        </div>

        {/* Scenario Overview */}
        <div className="space-y-1">
          <span className="font-mono text-[9px] text-secondaryAccent uppercase tracking-widest font-bold">
            Pipeline Scenario Profile
          </span>
          <p className="text-xs sm:text-sm text-primaryText font-sans font-medium">
            {FLOW_SCENARIOS.find((s) => s.id === activeScenario)?.description}
          </p>
        </div>

        {/* Vertical/Horizontal Flow Visualizer */}
        <div className="py-4 overflow-x-auto">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2 min-w-full">
            {FLOW_SCENARIOS.find((s) => s.id === activeScenario)?.steps.map((step, idx, arr) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex !== null && activeStepIndex > idx;
              
              return (
                <div key={idx} className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-2">
                  {/* Step Card */}
                  <div 
                    className={`flex-1 p-3 border transition-all duration-300 relative ${
                      isActive 
                        ? 'bg-secondaryAccent/10 border-secondaryAccent shadow-[0_0_12px_rgba(236,72,153,0.15)] scale-[1.02]' 
                        : isPast 
                          ? 'bg-neutral-900/80 border-green-500/40 opacity-90'
                          : 'bg-neutral-900/30 border-neutral-850 opacity-60'
                    } rounded-none flex flex-col gap-1.5`}
                  >
                    {/* Top status bar of card */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase">
                        STEP 0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-secondaryAccent rounded-full animate-ping" />
                      )}
                      {isPast && (
                        <span className="text-[8px] font-mono text-green-400 font-bold uppercase">✔ DONE</span>
                      )}
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-2">
                      <div className={`p-1 border rounded-none ${
                        isActive 
                          ? 'bg-secondaryAccent/20 border-secondaryAccent text-secondaryAccent' 
                          : isPast 
                            ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                            : 'bg-neutral-950 border-neutral-800 text-mutedText'
                      }`}>
                        {getStepIcon(step.icon)}
                      </div>
                      <span className="font-display text-[11px] sm:text-xs font-bold text-primaryText uppercase tracking-tight">
                        {step.label}
                      </span>
                    </div>

                    {/* Brief description */}
                    <p className="text-[10px] text-mutedText leading-relaxed font-sans">
                      {step.desc}
                    </p>

                    {/* Scanline active overlay */}
                    {isActive && (
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-secondaryAccent shadow-[0_0_8px_#ec4899] animate-pulse" />
                    )}
                  </div>

                  {/* Arrow connector */}
                  {idx < arr.length - 1 && (
                    <div className="flex items-center justify-center text-neutral-600 self-center md:self-auto">
                      <ChevronRight className="w-4 h-4 rotate-90 md:rotate-0" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary / Technical SLA Commit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 p-4 border border-neutral-900 font-mono text-[11px] text-neutral-500">
          <div className="space-y-1">
            <div className="text-secondaryAccent font-bold">⚡ PIPELINE SPECIFICATIONS & FAILSAFES</div>
            <div>• Automatic retries with exponential backoff on HTTP/gateway timeouts</div>
            <div>• Dead-letter queues (DLQ) to isolate and alert on schema mismatch</div>
          </div>
          <div className="space-y-1">
            <div className="text-primaryAccent font-bold">🛡️ ENCRYPTION & COMPLIANCE STATS</div>
            <div>• TLS 1.3 encrypted handshakes across all integrated server nodes</div>
            <div>• Redundant server state replication for near-zero downtime deployment</div>
          </div>
        </div>

      </div>
    </div>
  </ScrollRevealSection>

    {/* Personal & Virtual Assistant: Operational Desk & Task Ledger Section */}
    <ScrollRevealSection>
      <div id="va-operations-section" className="border-t border-neutral-900 pt-10 space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primaryAccent/10 border border-primaryAccent/30 text-primaryAccent font-mono text-[10px] font-bold uppercase tracking-wider rounded-none">
          <Settings className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
          PERSONAL / VIRTUAL ASSISTANCE
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          ASSISTANCE ROLES & ACTIVE TASK LEDGER
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans font-medium">
          As your Personal & Virtual Assistant, I streamline daily administrative work, coordinate schedules, plan complex logistics, and manage research so you can focus entirely on growth and high-level decisions.
        </p>
      </div>

      {/* Grid containing Overview Card on the Left, Ledger on the Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Mandate, SLA, availability, comms (4 columns) */}
        <div className="xl:col-span-4 flex flex-col justify-between gap-4">
          
          <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 flex-1 relative overflow-hidden group hover:border-neutral-800 transition-colors">
            
            <h3 className="font-display text-base font-black text-primaryText uppercase tracking-tight pb-1 border-b border-neutral-900">
              The Executive Mandate
            </h3>
            
            <p className="text-xs text-mutedText leading-relaxed font-sans font-medium">
              Busy founders and high-achievers should not be bogged down by scheduling friction, administrative overhead, or manual coordination. My goal is simple: <strong>provide absolute operational and lifestyle relief</strong>.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-primaryAccent shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">AVAILABILITY CADENCE</div>
                  <div className="text-primaryText font-medium">Mon–Fri, 9:00 AM – 6:00 PM (GMT+8)</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Continuous async support & daily updates</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-secondaryAccent shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">URGENT REQUEST RESPONSE</div>
                  <div className="text-secondaryAccent font-bold">Sub-1 Hour SLA Guaranteed</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Immediate triage for scheduling conflicts or urgent travels</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-green-400 shrink-0">
                  <Server className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">COMMUNICATION SYNC</div>
                  <div className="text-primaryText font-medium">Slack / WhatsApp / Email / Discord</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Direct chat channels, no complex ticketing hierarchies</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-primaryAccent hover:text-white border border-neutral-900 hover:border-primaryAccent text-primaryText font-mono font-bold uppercase text-[10px] py-2.5 rounded-none cursor-pointer transition-colors"
              >
                BOOK A COGNITIVE LOAD AUDIT
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick SLA Counter badge */}
          <div className="bg-neutral-950 p-4 border border-neutral-900 rounded-none font-mono text-[10px] text-neutral-500 flex justify-between items-center">
            <div>
              <span className="text-secondaryAccent font-bold">MONITORED SUPPORT STATUS</span>
              <span className="block mt-0.5">Inbox triaging and calendar sync is fully active</span>
            </div>
            <div className="text-right text-green-400 font-bold">
              100% ACTIVE
            </div>
          </div>

        </div>

        {/* Right Column: Interactive task ledger filter (8 columns) */}
        <div className="xl:col-span-8 bg-surface-dark border border-neutral-850 p-5 lg:p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primaryAccent" />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <span className="font-mono text-[9px] text-primaryAccent font-bold uppercase tracking-widest">
                Active Assistant Ledger
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-mutedText">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                Active Tasks: {VA_TASKS.length}
              </div>
            </div>
            
            <h3 className="font-display text-lg font-black text-primaryText uppercase">
              Assistant Service Registries
            </h3>
            <p className="text-mutedText text-xs leading-relaxed font-sans font-medium">
              Choose a service category below to view specific, concrete tasks I execute to optimize your schedules, manage records, and coordinate daily lifestyles.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 py-1">
            {VA_TASK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveVaCategory(cat.id)}
                className={`px-3 py-1.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase border tracking-wider transition-all cursor-pointer rounded-none ${
                  activeVaCategory === cat.id
                    ? 'bg-primaryAccent/10 border-primaryAccent text-primaryAccent'
                    : 'bg-neutral-950 border-neutral-900 text-mutedText hover:text-primaryText hover:border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid of filtered Tasks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
            {VA_TASKS.filter(task => activeVaCategory === 'all' || task.category === activeVaCategory).map((task) => (
              <div 
                key={task.id}
                className="p-3 bg-neutral-950/40 border border-neutral-900 hover:border-neutral-800 rounded-none relative flex flex-col justify-between gap-3 group transition-colors"
              >
                <div className="space-y-2">
                  {/* Card header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-neutral-900 border border-neutral-850 rounded-none group-hover:border-primaryAccent/30 transition-colors">
                        {getVaIcon(task.icon)}
                      </div>
                      <h4 className="font-display text-[11px] sm:text-xs font-bold text-primaryText uppercase tracking-tight leading-tight">
                        {task.title}
                      </h4>
                    </div>
                    <span className="font-mono text-[8px] text-primaryAccent uppercase font-bold tracking-widest shrink-0 mt-1">
                      {task.freq}
                    </span>
                  </div>

                  {/* Task Description */}
                  <p className="text-[10px] sm:text-xs text-mutedText/90 leading-relaxed font-sans font-medium">
                    {task.description}
                  </p>
                </div>

                {/* Card footer metrics */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-900 font-mono text-[9px]">
                  <div>
                    <span className="text-neutral-500 uppercase block font-bold text-[8px]">RESPONSE SLA</span>
                    <span className="text-secondaryAccent font-semibold">{task.sla}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 uppercase block font-bold text-[8px]">EXECUTIVE VALUE</span>
                    <span className="text-green-400 font-semibold truncate block" title={task.impact}>{task.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Info */}
          <div className="p-3 bg-neutral-950/80 border border-neutral-900 rounded-none font-mono text-[10px] text-neutral-500">
            <div className="text-primaryText font-bold uppercase mb-0.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-secondaryAccent animate-pulse" />
              PRODUCTIVITY SYSTEM INTEGRATIONS
            </div>
            <p className="leading-relaxed font-sans font-medium">
              Seamlessly operating across modern executive stacks: Google Workspace, Microsoft 365, Notion, Slack, Zoom, Calendly, and custom CRM architectures. Adapting instantly to your preferred communication rhythms.
            </p>
          </div>

        </div>

      </div>
    </div>
  </ScrollRevealSection>

  </div>
);
}
