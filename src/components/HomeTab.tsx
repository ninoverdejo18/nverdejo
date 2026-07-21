/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
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
  Search,
  PenTool,
  Sparkles,
  Smartphone,
  Cloud
} from 'lucide-react';
import { TabType } from '../types';
import Hyperspeed from './Hyperspeed';
import { hyperspeedPresets } from './HyperSpeedPresets';
import ElectricBorder from './ElectricBorder';
import DesignGraphicShowcase from './DesignGraphicShowcase';
import SkillsShowcase from './SkillsShowcase';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

interface HomeTabProps {
  setActiveTab: (tab: TabType) => void;
  theme?: 'dark' | 'light';
}

const FLOW_SCENARIOS = [
  {
    id: 'lead-ingest',
    title: 'Lead Capture & Routing',
    description: 'Automatically captures contact form submissions and routes them to your team.',
    steps: [
      { label: 'Customer Form', icon: 'Globe', desc: 'Visitor fills out your contact form' },
      { label: 'Validator', icon: 'Shield', desc: 'Validates email format and filters spam' },
      { label: 'AI Categorization', icon: 'Cpu', desc: 'AI summarizes the request and flags urgent needs' },
      { label: 'CRM Sync', icon: 'Database', desc: 'Saves lead details to your sales database' },
      { label: 'Instant Alert', icon: 'MessageSquare', desc: 'Sends an automatic notification via Slack or email' }
    ]
  },
  {
    id: 'invoice-payment',
    title: 'Payment & Invoice Delivery',
    description: 'Processes client payments securely and sends automated invoices.',
    steps: [
      { label: 'Stripe Hook', icon: 'Zap', desc: 'Receives secure payment confirmation from Stripe' },
      { label: 'Database Sync', icon: 'Database', desc: 'Updates customer account or subscription status' },
      { label: 'Invoice Generator', icon: 'FileText', desc: 'Generates a professional PDF invoice' },
      { label: 'Email Delivery', icon: 'Mail', desc: 'Emails the invoice and receipt to the client automatically' },
      { label: 'Ledger Sync', icon: 'RefreshCw', desc: 'Logs the transaction in a Google Sheet for your records' }
    ]
  },
  {
    id: 'system-sync',
    title: 'Database & App Sync',
    description: 'Automatically synchronizes your databases with your marketing platforms.',
    steps: [
      { label: 'Database Trigger', icon: 'Database', desc: 'Detects a new record or change in your database' },
      { label: 'Delivery Queue', icon: 'Layers', desc: 'Queues the update to ensure ordered delivery' },
      { label: 'Data Formatter', icon: 'Cpu', desc: 'Formats the data to match your target platform' },
      { label: 'Platform Update', icon: 'RefreshCw', desc: 'Updates your marketing tool (e.g., ActiveCampaign)' },
      { label: 'Verification Log', icon: 'Activity', desc: 'Verifies the update was successful and logs the completion' }
    ]
  }
];

const VA_TASK_CATEGORIES = [
  { id: 'all', label: 'All Services' },
  { id: 'admin-inbox', label: 'Email & Admin' },
  { id: 'calendar-sched', label: 'Schedules & Meetings' },
  { id: 'travel-events', label: 'Travel & Trips' },
  { id: 'data-research', label: 'Research & Data' },
  { id: 'creative-content', label: 'Support & Content' },
  { id: 'lifestyle-errands', label: 'Personal & Errands' },
];

const VA_TASKS = [
  {
    id: 'email-triage',
    category: 'admin-inbox',
    title: 'Email Management & Drafts',
    description: 'Organize your daily inbox, filter spam, flag priority emails, and prepare draft responses for your approval.',
    freq: 'Daily (Morning & Evening)',
    sla: 'Within 2 hours',
    impact: 'Keeps your inbox clean and ensures your clients get quick answers',
    icon: 'Mail'
  },
  {
    id: 'document-management',
    category: 'admin-inbox',
    title: 'File & Document Organizing',
    description: 'Organize digital invoices, save receipts, structure shared folders, and keep files secure and easy to find.',
    freq: 'Weekly',
    sla: 'Same day',
    impact: 'Find any document or receipt instantly without searching through endless folders',
    icon: 'FileText'
  },
  {
    id: 'calendar-coordination',
    category: 'calendar-sched',
    title: 'Calendar & Scheduling Support',
    description: 'Coordinate appointments across time zones, set aside focused work hours, and resolve meeting conflicts.',
    freq: 'Daily / Continuous',
    sla: 'Within 1 hour',
    impact: 'Optimizes your daily schedule so you never have double-bookings',
    icon: 'Calendar'
  },
  {
    id: 'appointment-reminder',
    category: 'calendar-sched',
    title: 'Meeting Preparation Packets',
    description: 'Prepare helpful summaries with information about attendees, company backgrounds, and key talking points before your calls.',
    freq: 'Before meetings',
    sla: 'Within 4 hours',
    impact: 'Enter every meeting fully prepared with all the background context you need',
    icon: 'Briefcase'
  },
  {
    id: 'travel-itineraries',
    category: 'travel-events',
    title: 'Travel Planning & Itineraries',
    description: 'Research the best flights, find top hotels, organize airport transfers, and build easy-to-read travel plans.',
    freq: 'As needed',
    sla: 'Within 24 hours',
    impact: 'Enjoy stress-free travel with all reservation details organized in one place',
    icon: 'Plane'
  },

  {
    id: 'market-research',
    category: 'data-research',
    title: 'Market & Competitor Research',
    description: 'Gather information on industry trends, find pricing details, and summarize competitor activities into clean spreadsheets.',
    freq: 'As needed',
    sla: 'Within 48 hours',
    impact: 'Make informed business decisions based on clear, organized research',
    icon: 'Search'
  },
  {
    id: 'spreadsheet-analytics',
    category: 'data-research',
    title: 'Data Entry & Spreadsheet Updates',
    description: 'Clean up customer lists, combine reports, update spreadsheet data, and compile monthly performance metrics.',
    freq: 'Monthly',
    sla: 'Within 12 hours',
    impact: 'Keep your records accurate and your customer lists clean and useful',
    icon: 'Database'
  },
  {
    id: 'social-scheduling',
    category: 'creative-content',
    title: 'Social Media & Newsletter Scheduling',
    description: 'Schedule ready-to-go social media posts, format newsletter drafts, and keep your content calendar organized.',
    freq: 'Weekly',
    sla: 'On schedule',
    impact: 'Maintain a consistent online presence without spending hours on scheduling tools',
    icon: 'Globe'
  },
  {
    id: 'customer-support',
    category: 'creative-content',
    title: 'First-Line Customer Support',
    description: 'Acknowledge customer questions quickly, answer common inquiries, and direct complex issues to the right team member.',
    freq: 'Daily',
    sla: 'Within 4 hours',
    impact: 'Provides friendly and fast support to keep your customers happy',
    icon: 'MessageSquare'
  },
  {
    id: 'lifestyle-coordination',
    category: 'lifestyle-errands',
    title: 'Personal & Lifestyle Bookings',
    description: 'Coordinate home services (like plumber bookings), schedule medical appointments, find gifts, and manage personal subscriptions.',
    freq: 'As needed',
    sla: 'Within 6 hours',
    impact: 'Outsource personal chores so you can save time and focus on your priorities',
    icon: 'User'
  },
  {
    id: 'gift-concierge',
    category: 'lifestyle-errands',
    title: 'Gift Sourcing & Deliveries',
    description: 'Find custom gift suggestions for friends or clients, write custom cards, and coordinate flower or gift deliveries.',
    freq: 'As needed',
    sla: 'Within 12 hours',
    impact: 'Show thoughtful appreciation to clients and family without missing important dates',
    icon: 'Zap'
  },
];

const ENGINE_MODES = [
  { key: 'one', label: 'NEOSLATE', desc: 'Sinuous gravity field warp', color: 'text-[#50C878]', glow: 'rgba(80,200,120,0.35)' },
  { key: 'four', label: 'EMERALD_CYBER', desc: 'High-frequency emerald grid', color: 'text-emerald-400', glow: 'rgba(16,185,129,0.35)' },
  { key: 'five', label: 'SOLAR_FLARE', desc: 'Electromagnetic solar drift', color: 'text-orange-500', glow: 'rgba(249,115,22,0.35)' },
  { key: 'two', label: 'CYBER_CRIMSON', desc: 'Ridge altitude curve velocity', color: 'text-red-500', glow: 'rgba(239,68,68,0.35)' },
] as const;

function ScrollRevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default function HomeTab({ setActiveTab, theme = 'dark' }: HomeTabProps) {
  const [presetKey, setPresetKey] = useState<keyof typeof hyperspeedPresets>('four');
  
  // Static properties to prevent smooth transitions or scroll changes on the home page
  const textY = 0;
  const textOpacity = 1;
  const textScale = 1;
  const bgOpacity = 0.55;
  const hudY = 0;
  const hudOpacity = 1;

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
    { id: 2, name: 'Inquiry Sorting', duration: '1.2s', status: 'RUNNING', progress: 45 },
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
      case 'PenTool': return <PenTool className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Cloud': return <Cloud className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
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
    <div className="space-y-12 lg:space-y-16 pb-8">
      
      {/* 3D HYPERSPEED HERO SECTION */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 min-h-screen h-screen bg-bg-dark border-b border-neutral-900 rounded-none overflow-hidden flex flex-col justify-between items-center p-6 sm:p-12 text-center select-none">
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
          className="relative z-10 max-w-5xl flex flex-col items-center my-auto space-y-6 px-4"
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
            className="font-display text-[clamp(1.6rem,4.1vw,4.5rem)] font-black uppercase tracking-tighter leading-tight sm:leading-[0.9] text-center"
          >
            <span className={`block sm:whitespace-nowrap ${isLight ? 'text-black' : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400'}`}>
              WEB & APP DEVELOPMENT
            </span>
            <span className="block sm:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent via-green-400 to-secondaryAccent">
              ASSISTANT & AUTOMATION
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
      <div className="w-full pt-6 lg:pt-8 -mt-6 lg:-mt-10">
        <DesignGraphicShowcase />
      </div>

      {/* Grid containing modern Web Design & Development Tech Stack */}
      <ScrollRevealSection>
        <div id="home-tab-container" className="border-t border-neutral-900 pt-12 lg:pt-16 space-y-8">
          
          {/* Header Row: Title & Paragraph positioned cleanly */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div id="home-copy-section" className="lg:col-span-6 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
                Custom Web Design & Development
              </h2>
              <p className="text-mutedText/90 text-sm leading-relaxed font-sans">
                I specialize in building clean, responsive, and fast-loading websites and applications. By combining professional design with modern coding practices, I build easy-to-use digital products that help your business succeed.
              </p>
            </div>
          </div>

          {/* Cards & Skills Showcase perfectly aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Core Competencies Quick Cards */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">01. RELIABILITY</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Solid Structure</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Clean and well-organized codebases</div>
                </div>
                
                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">02. SPEED</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Instant Loading</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Optimized files for quick page loading</div>
                </div>

                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">03. ACCURACY</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Type-Safe Code</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Strict error checking to prevent bugs</div>
                </div>

                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">04. RESPONSIVE</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">All Devices</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Perfect scaling on phones and laptops</div>
                </div>

                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">05. SIMPLICITY</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Easy Navigation</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Intuitive forms and clear menus</div>
                </div>

                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">06. INTERACTION</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Smooth Transitions</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Micro-animations that feel natural</div>
                </div>

                <div className="p-3.5 bg-surface-dark border border-neutral-850 rounded-none relative">
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-700" />
                  <div className="font-mono text-[9px] text-mutedText uppercase tracking-wider">07. FUTURE-PROOF</div>
                  <div className="font-display text-lg font-bold text-primaryAccent mt-1">Modern Tech</div>
                  <div className="text-[10px] text-neutral-500 font-mono mt-0.5">Built to be easily updated as you grow</div>
                </div>


              </div>
            </div>

            {/* Right Column: Interactive Skills & Tech Matrix */}
            <div id="home-dashboard-section" className="lg:col-span-6 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primaryAccent/5 to-secondaryAccent/5 blur-2xl opacity-40 pointer-events-none" />
              <SkillsShowcase />
            </div>
          </div>

        </div>
      </ScrollRevealSection>

    {/* Web Design & App Development Core Section */}
    <ScrollRevealSection>
      <div id="design-development-section" className="border-t border-neutral-900 pt-12 lg:pt-16 space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          CREATING FAST, RELIABLE WEBSITES
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
          I build custom websites and applications tailored to your business. I prioritize user-friendly navigation, professional design, and excellent performance.
        </p>
      </div>

      {/* Bento Grid highlighting the Design and App Development workflow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: UI/UX & Web Design */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none relative overflow-hidden group hover:border-primaryAccent/50 transition-colors flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-850 text-primaryAccent rounded-none">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                  Web Development & Design
                </h3>
                <span className="font-mono text-[8px] text-primaryAccent uppercase font-bold tracking-widest font-sans">clean & modern</span>
              </div>
            </div>
            <p className="text-xs text-mutedText leading-relaxed font-sans">
              I design and build beautiful websites that are super easy to use. I focus on clear text, balanced spacing, and helpful buttons so visitors enjoy using your site.
            </p>
          </div>
          <ul className="space-y-1.5 font-mono text-[10px] text-primaryText">
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Simple, beautiful layouts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Clear text and clean spacing</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Modern look on all devices</span>
            </li>
          </ul>
        </div>

        {/* Card 2: App Development */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none relative overflow-hidden group hover:border-primaryAccent/50 transition-colors flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-850 text-primaryAccent rounded-none">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                  App Development
                </h3>
                <span className="font-mono text-[8px] text-primaryAccent uppercase font-bold tracking-widest font-sans">safe & secure</span>
              </div>
            </div>
            <p className="text-xs text-mutedText leading-relaxed font-sans">
              I build simple, fast, and secure web applications to make your daily work easier. This includes responsive contact forms, account logins, and interactive dashboards.
            </p>
          </div>
          <ul className="space-y-1.5 font-mono text-[10px] text-primaryText">
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Fast and lightweight apps</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Safe and reliable setup</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primaryAccent">»</span>
              <span>Connects to your databases</span>
            </li>
          </ul>
        </div>

        {/* Card 3: Performance Standards */}
        <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none relative overflow-hidden group hover:border-primaryAccent/50 transition-colors flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-900 border border-neutral-850 text-primaryAccent rounded-none">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-sm font-black text-primaryText uppercase tracking-tight">
                  Fast Loading Speed
                </h3>
                <span className="font-mono text-[8px] text-primaryAccent uppercase font-bold tracking-widest font-sans">optimized</span>
              </div>
            </div>
            <p className="text-xs text-mutedText leading-relaxed font-sans">
              Nobody likes slow websites. I optimize images, files, and code so your pages load almost instantly on any internet connection, on both phones and laptops.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-2 bg-neutral-950 p-2.5 border border-neutral-900 font-mono text-[10px]">
            <div>
              <span className="text-neutral-500 block text-[8px] font-sans">GOOGLE SCORE</span>
              <span className="text-primaryAccent font-extrabold">100 / 100</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[8px] font-sans">LOAD TIME</span>
              <span className="text-primaryAccent font-extrabold">&lt; 1 Second</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </ScrollRevealSection>

    {/* Interactive Blueprint Simulator Section */}
    <ScrollRevealSection>
      <div className="border-t border-neutral-900 pt-12 lg:pt-16 space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          HELPFUL INTEGRATIONS & WORKFLOWS
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans">
          I build reliable integrations to connect your software tools. Select an example workflow below and trigger the simulation to see how data moves and synchronizes across your systems automatically.
        </p>
      </div>

      {/* Simulator Dashboard Card */}
      <div className="bg-surface-dark border border-neutral-800 p-5 lg:p-6 space-y-6 relative overflow-hidden">
        
        {/* Top selection bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {FLOW_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioChange(scenario.id)}
                disabled={isSimulating}
                className={`px-3 py-1.5 text-center sm:text-left font-mono text-[10px] sm:text-xs font-bold uppercase border tracking-wider transition-all cursor-pointer w-full sm:w-auto ${
                  activeScenario === scenario.id
                    ? 'bg-primaryAccent/10 border-primaryAccent text-primaryAccent'
                    : 'bg-neutral-900/40 border-neutral-850 text-mutedText hover:text-primaryText hover:border-neutral-700'
                } disabled:opacity-50 disabled:cursor-not-allowed rounded-none`}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Simulation Trigger Button wrapped in ElectricBorder effect */}
          <ElectricBorder
            color="#50C878"
            borderRadius={0}
            speed={isSimulating ? 2.5 : 0.8}
            chaos={isSimulating ? 0.25 : 0.08}
            className="w-full sm:w-auto"
          >
            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="flex items-center justify-center gap-2 bg-black hover:bg-zinc-900 disabled:bg-neutral-800 text-white font-mono font-bold uppercase tracking-wider text-[10px] py-2 px-4 border-none transition-all cursor-pointer rounded-none relative z-10 w-full sm:w-auto"
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
          <span className="font-mono text-[9px] text-primaryAccent uppercase tracking-widest font-bold">
            Workflow Scenario
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
                        ? 'bg-primaryAccent/10 border-primaryAccent shadow-[0_0_12px_rgba(80,200,120,0.15)] scale-[1.02]' 
                        : isPast 
                          ? 'bg-neutral-900/80 border-primaryAccent/40 opacity-90'
                          : 'bg-neutral-900/30 border-neutral-850 opacity-60'
                    } rounded-none flex flex-col gap-1.5`}
                  >
                    {/* Top status bar of card */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8px] text-neutral-500 font-bold uppercase">
                        STEP 0{idx + 1}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-primaryAccent rounded-full animate-ping" />
                      )}
                      {isPast && (
                        <span className="text-[8px] font-mono text-primaryAccent font-bold uppercase">✔ DONE</span>
                      )}
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-2">
                      <div className={`p-1 border rounded-none ${
                        isActive 
                          ? 'bg-primaryAccent/20 border-primaryAccent text-primaryAccent' 
                          : isPast 
                            ? 'bg-primaryAccent/10 border-primaryAccent/20 text-primaryAccent' 
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
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-primaryAccent shadow-[0_0_8px_#50C878] animate-pulse" />
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

        {/* Live Terminal Output Console */}
        <div className="border border-neutral-850 bg-neutral-950 rounded-none overflow-hidden font-mono text-[11px] leading-relaxed relative z-10">
          {/* Header Bar */}
          <div className="flex items-center justify-between bg-neutral-900 px-3.5 py-2 border-b border-neutral-850">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
              <span className="text-[9px] text-neutral-400 font-bold ml-1.5 uppercase tracking-wider">SYSTEM EXECUTION CONSOLE</span>
            </div>
            <div className="flex items-center gap-2 text-[9px]">
              <span className={`w-1.5 h-1.5 rounded-full ${isSimulating ? 'bg-primaryAccent animate-ping' : 'bg-neutral-600'}`} />
              <span className={`uppercase font-bold ${isSimulating ? 'text-primaryAccent' : 'text-neutral-500'}`}>
                {isSimulating ? 'EXECUTING PIPELINE' : 'IDLE'}
              </span>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-3.5 space-y-1.5 bg-neutral-950 min-h-[120px] max-h-[220px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {logs.map((log, index) => {
              // Highlight based on prefixes
              let logColor = 'text-neutral-400';
              if (log.startsWith('SUCCESS') || log.startsWith('PIPELINE_SUCCESS')) {
                logColor = 'text-green-600 dark:text-green-400 font-medium';
              } else if (log.startsWith('START') || log.startsWith('TRIGGERED')) {
                logColor = 'text-primaryAccent font-medium';
              } else if (log.startsWith('STATUS')) {
                logColor = 'text-cyan-600 dark:text-cyan-400';
              } else if (log.startsWith('ERROR')) {
                logColor = 'text-red-600 dark:text-red-400 font-bold';
              } else if (log.startsWith('DISPATCHED')) {
                logColor = 'text-secondaryAccent';
              }

              return (
                <div key={index} className="flex items-start gap-2.5 transition-all duration-300">
                  <span className="text-neutral-600 select-none">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <span className="text-primaryAccent select-none">$&gt;</span>
                  <span className={logColor}>{log}</span>
                </div>
              );
            })}
            <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] pt-1">
              <span>root@nino-systems:~#</span>
              <span className="w-1.5 h-3.5 bg-primaryAccent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Summary / Technical SLA Commit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-950 p-4 border border-neutral-900 font-mono text-[11px] text-neutral-500">
          <div className="space-y-1">
            <div className="text-primaryAccent font-bold">⚡ PIPELINE SPECIFICATIONS & FAILSAFES</div>
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
      <div id="va-operations-section" className="border-t border-neutral-900 pt-12 lg:pt-16 space-y-6 lg:space-y-8">
      <div className="space-y-2">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          VIRTUAL ASSISTANT ROLES & TASK LEDGER
        </h2>
        <p className="text-mutedText/90 text-xs sm:text-sm max-w-3xl leading-relaxed font-sans font-medium">
          As your virtual assistant, I handle daily administrative tasks, coordinate schedules, organize travel plans, and manage online research so you can stay focused on growing your business.
        </p>
      </div>

      {/* Grid containing Overview Card on the Left, Ledger on the Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Mandate, SLA, availability, comms (4 columns) */}
        <div className="xl:col-span-4 flex flex-col justify-between gap-4">
          
          <div className="bg-surface-dark border border-neutral-850 p-5 rounded-none space-y-4 flex-1 relative overflow-hidden group hover:border-neutral-800 transition-colors">
            
            <h3 className="font-display text-base font-black text-primaryText uppercase tracking-tight pb-1 border-b border-neutral-900">
              Virtual Assistant Services
            </h3>
            
            <p className="text-xs text-mutedText leading-relaxed font-sans font-medium">
              Busy founders, professionals, and teams should not lose hours to scheduling conflicts, emails, or administrative tasks. I provide reliable support to keep your operations running smoothly.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-primaryAccent shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">AVAILABILITY</div>
                  <div className="text-primaryText font-medium">Monday to Sunday</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Consistent daily support, including weekends when needed</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-primaryAccent shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">WORKING HOURS</div>
                  <div className="text-white font-bold">Flexible Working Hours</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Aligned to match your active business hours and timezone</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-primaryAccent shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">RESPONSE TIME</div>
                  <div className="text-white font-bold">Within 1 Hour for Urgent Tasks</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Quick attention for scheduling conflicts or urgent travel updates</div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs">
                <div className="p-1.5 bg-neutral-900 border border-neutral-850 text-primaryAccent shrink-0">
                  <Server className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider">COMMUNICATION</div>
                  <div className="text-primaryText font-medium">Slack, WhatsApp, or Email</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Direct communication channels for quick updates</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('contact')}
                className="w-full flex items-center justify-center gap-2 bg-neutral-950 hover:bg-primaryAccent hover:text-white border border-neutral-900 hover:border-primaryAccent text-primaryText font-mono font-bold uppercase text-[10px] py-2.5 rounded-none cursor-pointer transition-colors"
              >
                SCHEDULE A FREE CONSULTATION
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive task ledger filter (8 columns) */}
        <div className="xl:col-span-8 bg-surface-dark border border-neutral-850 p-5 lg:p-6 space-y-4 relative overflow-hidden flex flex-col justify-between">
          
          <div className="space-y-2">

            
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
                    <span className="text-primaryAccent font-semibold">{task.sla}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 uppercase block font-bold text-[8px]">ASSISTANT VALUE</span>
                    <span className="text-primaryAccent font-semibold truncate block" title={task.impact}>{task.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Info */}
          <div className="p-3 bg-neutral-950/80 border border-neutral-900 rounded-none font-mono text-[10px] text-neutral-500">
            <div className="text-primaryText font-bold uppercase mb-0.5 flex items-center gap-1">
              <Zap className="w-3 h-3 text-primaryAccent animate-pulse" />
              PRODUCTIVITY SYSTEM INTEGRATIONS
            </div>
            <p className="leading-relaxed font-sans font-medium">
              Seamlessly operating across modern productivity stacks: Google Workspace, Microsoft 365, Notion, Slack, Zoom, Calendly, and custom CRM architectures. Adapting instantly to your preferred communication rhythms.
            </p>
          </div>

        </div>

      </div>
    </div>
  </ScrollRevealSection>

  </div>
);
}
