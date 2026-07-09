/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Workflow, 
  Layers, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import { ResultCard, TabType } from '../types';

interface ResultsTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function ResultsTab({ setActiveTab }: ResultsTabProps) {
  const [activeCard, setActiveCard] = useState<string>('ecommerce');

  const resultCards: ResultCard[] = [
    {
      id: 'ecommerce',
      client: 'Peak Apparel Group',
      industry: 'Direct-to-Consumer SaaS',
      challenge: 'Operations managers spent 14 hours every single week copying sales items, compiling spreadsheet tallies, and manually entering logistics invoices into their CRM. The lag resulted in late order updates and customer service logs.',
      solution: 'Configured a type-safe multi-platform API webhook pipeline. Orders are now instantly captured, cross-referenced with active stock databases, auto-invoiced, and dispatched to fulfillment queues.',
      impactMetric: '14 hrs',
      impactLabel: 'Weekly Manual Overhead Eliminated',
      beforeText: '14 hours of spreadsheet data entry, 3.2% error rate, delayed customer shipping alerts.',
      afterText: '0 hours. 100% background accuracy, instantaneous logistics notifications.'
    },
    {
      id: 'saas-leads',
      client: 'CoreFlow Analytics',
      industry: 'B2B SaaS Startup',
      challenge: 'Incoming trials remained cold for up to 4 hours. Staff spent valuable time manually scraping LinkedIn profiles to verify lead sizes before routing them to sales agents, losing warm prospects to faster vendors.',
      solution: 'Constructed an instant domain enrichment script. The moment a signup registers, webhooks fetch business data, qualify the lead, determine seat potential, and route high-value accounts with custom context on Slack.',
      impactMetric: '92%',
      impactLabel: 'Response Latency Reduced',
      beforeText: 'Average 4-hour delay on lead classification, sales agents manually compiling info.',
      afterText: 'Instant 45-second verification and Slack alert. Deal win rates accelerated by 22%.'
    },
    {
      id: 'agency-systems',
      client: 'ScaleShift Marketing',
      industry: 'Growth Agency Network',
      challenge: 'Unindexed PostgreSQL tables and slow cloud database queries caused constant application server latency. Server restarts were required daily, distracting internal developers from client deliverables.',
      solution: 'Optimized server-side query indexes, structured database connection pools, deployed automated daily backups, and constructed lightweight uptime health-check alerts.',
      impactMetric: '100%',
      impactLabel: 'Server Continuity & Zero Crashes',
      beforeText: 'Frequent database crashes, 3.4-second response times, developer burnout.',
      afterText: 'Zero unexpected server crashes, 110ms database response times, full peace of mind.'
    }
  ];

  return (
    <div id="results-tab-container" className="py-2 lg:py-4 space-y-8">
      
      {/* Title block */}
      <div className="space-y-3 max-w-3xl">
        
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-primaryText uppercase leading-none">
          MEASURABLE OPERATIONAL IMPACTS
        </h2>
        
        <p className="text-mutedText/90 text-sm sm:text-base font-sans">
          I do not trade in aesthetic portfolios. I trade in efficiency metrics. Below are verified business optimizations.
        </p>
      </div>

      {/* Main Tabbed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Case Study Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold mb-1">
            SELECT CASE STUDY
          </div>
          {resultCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`w-full text-left p-3.5 rounded-none border transition-all cursor-pointer flex items-center justify-between group ${
                activeCard === card.id 
                  ? 'bg-surface-dark border-primaryAccent shadow-[0_0_10px_rgba(139,92,246,0.1)]' 
                  : 'bg-neutral-900/40 border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900/60'
              }`}
            >
              <div className="space-y-0.5">
                <span className="font-mono text-[9px] text-primaryAccent uppercase tracking-wider font-semibold block">
                  {card.industry}
                </span>
                <span className="font-display text-sm font-bold text-primaryText block group-hover:text-primaryAccent transition-colors">
                  {card.client}
                </span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                activeCard === card.id ? 'text-primaryAccent translate-x-1' : 'text-neutral-500'
              }`} />
            </button>
          ))}

          {/* Quick Stat Highlight Banner */}
          <div className="p-4 bg-gradient-to-tr from-primaryAccent/5 to-secondaryAccent/5 border border-neutral-800 rounded-none mt-4 text-center space-y-1">
            <div className="font-mono text-[9px] text-primaryText uppercase tracking-widest">
              ACCUMULATED TEAM POWER
            </div>
            <div className="font-display text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primaryAccent to-secondaryAccent">
              1,400+ Hours
            </div>
            <div className="font-mono text-[9px] text-mutedText">
              Restored to Founders this year
            </div>
          </div>
        </div>

        {/* Right Side: Active Case Study Deep Dive */}
        <div className="lg:col-span-8">
          {resultCards.map((card) => {
            if (card.id !== activeCard) return null;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-surface-dark border border-neutral-800 rounded-none p-5 lg:p-6 space-y-6 relative overflow-hidden"
              >
                {/* Visual Accent bar */}
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primaryAccent" />

                {/* Case Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4 pl-2">
                  <div className="space-y-0.5">
                    <div className="font-mono text-[9px] text-primaryAccent font-bold uppercase tracking-widest">
                      CASE DIAGNOSTIC REPORT
                    </div>
                    <h3 className="font-display text-xl lg:text-2xl font-black text-primaryText uppercase">
                      {card.client}
                    </h3>
                    <div className="font-mono text-[10px] text-mutedText">
                      Industry: <span className="text-primaryText font-medium">{card.industry}</span>
                    </div>
                  </div>
                  
                  {/* Huge Impact Hero Stat */}
                  <div className="bg-neutral-950 p-3 border border-neutral-900 rounded-none text-center sm:text-right shrink-0 min-w-[140px]">
                    <div className="font-display text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-primaryAccent tracking-tight">
                      {card.impactMetric}
                    </div>
                    <div className="font-mono text-[9px] text-mutedText uppercase mt-0.5 tracking-wider leading-tight">
                      {card.impactLabel}
                    </div>
                  </div>
                </div>

                {/* The Diagnostic Narrative Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-2">
                  
                  {/* Challenge Column */}
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      THE BOTTLENECK
                    </div>
                    <p className="text-xs sm:text-sm text-mutedText leading-relaxed font-sans">
                      {card.challenge}
                    </p>
                  </div>

                  {/* Solution Column */}
                  <div className="space-y-2">
                    <div className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                      THE SOLUTION DEPLOYED
                    </div>
                    <p className="text-xs sm:text-sm text-primaryText/90 leading-relaxed font-sans">
                      {card.solution}
                    </p>
                  </div>

                </div>

                {/* Before vs After Visualization Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2">
                  
                  {/* Before card */}
                  <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-none flex flex-col gap-1.5">
                    <div className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-widest">
                      BEFORE INTEGRATION
                    </div>
                    <p className="text-[11px] text-mutedText/85 leading-relaxed font-mono">
                      {card.beforeText}
                    </p>
                  </div>

                  {/* After card */}
                  <div className="bg-green-500/5 border border-green-500/15 p-4 rounded-none flex flex-col gap-1.5 relative overflow-hidden">
                    {/* Scanner line over after card to signify system execution */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-green-400/30 shadow-[0_0_10px_#4ade80] animate-pulse" />
                    
                    <div className="font-mono text-[9px] text-green-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 animate-bounce" />
                      SYSTEM OPTIMIZED
                    </div>
                    <p className="text-[11px] text-primaryText leading-relaxed font-mono">
                      {card.afterText}
                    </p>
                  </div>

                </div>

                {/* Call to action */}
                <div className="flex justify-end pt-1 pl-2">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="flex items-center gap-1.5 bg-primaryAccent hover:bg-primaryAccent/90 text-white font-mono font-bold uppercase tracking-wider text-[10px] py-3 px-5 rounded-none cursor-pointer transition-colors"
                  >
                    GET STARTED TODAY
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
