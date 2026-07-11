/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronRight,
  Globe,
  ExternalLink,
  BookOpen,
  Code,
  Palette
} from 'lucide-react';
import { ResultCard, TabType } from '../types';

interface ResultsTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function ResultsTab({ setActiveTab }: ResultsTabProps) {
  const [activeCard, setActiveCard] = useState<string>('devgen');
  const [devgenSubTab, setDevgenSubTab] = useState<'strategy' | 'design' | 'engineering' | 'outcomes'>('strategy');

  const resultCards: ResultCard[] = [
    {
      id: 'devgen',
      client: 'DevGen Website',
      industry: 'Software Agency Platform',
      challenge: 'Many software agency websites suffer from generic templates, poor mobile responsiveness, sluggish performance, weak visual identities, and cluttered layouts that lead to low conversion rates and poor trust.',
      solution: 'Designed and engineered a premium, minimal, lightweight digital experience with modular architecture, highly optimized lazy-loaded assets, adaptive layout grid systems, and strategic CTA focus.',
      impactMetric: '100%',
      impactLabel: 'Responsive & Lighthouse Score optimized',
      beforeText: 'Slow template, weak brand perception, 3.8s initial load, unresponsive components.',
      afterText: 'Polished micro-interactions, flawless responsive scaling, lightning-fast loads, robust framework.'
    },
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
    <div id="results-tab-container" className="space-y-12 lg:space-y-16 pb-8">
      
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
            
            if (card.id === 'devgen') {
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-surface-dark border border-neutral-800 rounded-none p-5 lg:p-6 space-y-6 relative overflow-hidden"
                >
                  {/* Case Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[9px] text-primaryAccent font-bold uppercase tracking-widest">
                          CASE STUDY REPORT
                        </span>
                        <span className="text-neutral-700 font-mono text-[9px]">|</span>
                        <a 
                          href="https://devgen-omega.vercel.app/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-mono text-[9px] text-mutedText hover:text-primaryAccent flex items-center gap-1 transition-colors group/link"
                        >
                          <Globe className="w-2.5 h-2.5 text-primaryAccent group-hover/link:animate-pulse" />
                          devgen-omega.vercel.app
                          <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                        </a>
                      </div>
                      <h3 className="font-display text-xl lg:text-2xl font-black text-primaryText uppercase">
                        {card.client}
                      </h3>
                      <div className="font-mono text-[10px] text-mutedText flex flex-wrap gap-x-3 gap-y-1">
                        <span>Industry: <span className="text-primaryText font-medium">{card.industry}</span></span>
                        <span>•</span>
                        <span>Role: <span className="text-primaryText font-medium">UI/UX, Dev</span></span>
                        <span>•</span>
                        <span>Timeline: <span className="text-primaryText font-medium">2026</span></span>
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

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Vercel'].map((tech) => (
                      <span key={tech} className="font-mono text-[9px] bg-neutral-900 border border-neutral-850 px-2 py-0.5 text-mutedText uppercase font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Sub-Tabs Selector */}
                  <div className="border-b border-neutral-900 flex flex-wrap gap-1">
                    {(['strategy', 'design', 'engineering', 'outcomes'] as const).map((tab) => {
                      const labels = {
                        strategy: { name: 'Overview & Strategy', icon: BookOpen },
                        design: { name: 'Design & UX', icon: Palette },
                        engineering: { name: 'Engineering & Tech', icon: Code },
                        outcomes: { name: 'Challenges & Outcomes', icon: TrendingUp },
                      };
                      const TabIcon = labels[tab].icon;
                      const isActive = devgenSubTab === tab;
                      return (
                        <button
                          key={tab}
                          onClick={() => setDevgenSubTab(tab)}
                          className={`flex items-center gap-1.5 px-3 py-2 font-mono text-[10px] uppercase font-bold tracking-wider transition-all border-t border-x -mb-px cursor-pointer ${
                            isActive 
                              ? 'bg-neutral-950/40 text-primaryAccent border-neutral-850 border-b-neutral-950' 
                              : 'bg-transparent text-neutral-500 border-transparent hover:text-mutedText'
                          }`}
                        >
                          <TabIcon className="w-3.5 h-3.5 shrink-0" />
                          {labels[tab].name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Sub-Tab Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={devgenSubTab}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-5"
                    >
                      {devgenSubTab === 'strategy' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                              PROJECT SUMMARY
                            </h4>
                            <p className="text-xs sm:text-sm text-primaryText/95 leading-relaxed font-sans">
                              DevGen is a modern software agency website built to establish trust, showcase technical expertise, and convert visitors into clients. The primary objective was to create a premium digital experience inspired by leading technology companies while maintaining excellent performance, responsiveness, and accessibility.
                            </p>
                            <p className="text-xs sm:text-sm text-mutedText leading-relaxed font-sans">
                              The website focuses on delivering a clean visual hierarchy, immersive interactions, and clear calls to action without overwhelming users.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <div className="space-y-1.5 p-3.5 bg-red-500/5 border border-red-500/10 rounded-none">
                              <div className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 shrink-0" />
                                THE AGENCY WEBSITE BOTTLENECK
                              </div>
                              <ul className="list-none space-y-1 font-sans text-xs text-mutedText">
                                {[
                                  'Generic template fatigue',
                                  'Poor mobile responsiveness',
                                  'Slow loading speeds',
                                  'Weak brand perception',
                                  'Cluttered and confusing layouts',
                                  'Low conversion rates',
                                  'Inconsistent styling'
                                ].map((item) => (
                                  <li key={item} className="flex items-start gap-1.5">
                                    <span className="text-red-400/80 mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-1.5 p-3.5 bg-green-500/5 border border-green-500/10 rounded-none">
                              <div className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                                STRATEGIC & TECHNICAL GOALS
                              </div>
                              <div className="space-y-2 text-xs font-sans text-mutedText">
                                <div>
                                  <span className="font-bold text-primaryText">Primary Goals:</span> Create a premium first impression, increase user engagement, showcase development expertise, and generate inquiries.
                                </div>
                                <div className="border-t border-neutral-900/50 pt-1.5">
                                  <span className="font-bold text-primaryText">Technical Goals:</span> Fast loading times, SEO-friendly architecture, responsive on all devices, accessible UI, and reusable components.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {devgenSubTab === 'design' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                              THE MOOD & BRANDING RESEARCH
                            </h4>
                            <p className="text-xs sm:text-sm text-mutedText leading-relaxed font-sans">
                              The design language was influenced by modern SaaS and technology brands known for minimalism and polished interactions. Key observations included: strong typography, generous spacing, smooth micro-interactions, clear visual hierarchy, minimal but effective animations, and high contrast for readability.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                            <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-1">
                              <div className="font-mono text-[9px] text-primaryText uppercase font-bold tracking-wider">
                                1. INFO ARCHITECTURE
                              </div>
                              <p className="text-[11px] text-mutedText font-sans leading-relaxed">
                                Organized into clean user-focused sections: Hero, About, Services, Projects, Process, Testimonials, and Contact. This structure allows visitors to understand the business quickly.
                              </p>
                            </div>

                            <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-1">
                              <div className="font-mono text-[9px] text-primaryText uppercase font-bold tracking-wider">
                                2. VISUAL IDENTITY
                              </div>
                              <p className="text-[11px] text-mutedText font-sans leading-relaxed">
                                Emphasizes minimal design, strong typography, strategic white space, modern color palettes, consistent iconography, and a premium visual language.
                              </p>
                            </div>

                            <div className="p-3 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-1">
                              <div className="font-mono text-[9px] text-primaryText uppercase font-bold tracking-wider">
                                3. RESPONSIVE DESIGN
                              </div>
                              <p className="text-[11px] text-mutedText font-sans leading-relaxed">
                                Adapts seamlessly across Mobile, Tablet, Laptop, Desktop, and Ultrawide displays. Spacing, typography, and grids adapt smoothly to any screen.
                              </p>
                            </div>
                          </div>

                          <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-1">
                            <div className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                              CORE UX PRINCIPLES DEPLOYED
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-xs font-sans text-mutedText">
                              <div>
                                <span className="font-bold text-primaryText uppercase block text-[10px] mb-0.5">Clarity</span>
                                Users immediately understand what DevGen does, who it helps, and how to get started.
                              </div>
                              <div>
                                <span className="font-bold text-primaryText uppercase block text-[10px] mb-0.5">Speed</span>
                                Interactions feel responsive through optimized assets and lightweight animations.
                              </div>
                              <div>
                                <span className="font-bold text-primaryText uppercase block text-[10px] mb-0.5">Trust</span>
                                Professional visuals, consistent branding, and polished interactions reinforce credibility.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {devgenSubTab === 'engineering' && (
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <h4 className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                              THE DEVELOPMENT ARCHITECTURE
                            </h4>
                            <p className="text-xs sm:text-sm text-primaryText/95 leading-relaxed font-sans">
                              The project was built using reusable component architecture to simplify maintenance and future expansion. Key implementation highlights include modular React components, utility-first styling with Tailwind CSS, responsive breakpoints, optimized image loading, lazy-loaded assets, semantic HTML, and clean folder structure.
                            </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-2">
                              <div className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-wider">
                                PERFORMANCE SOLUTIONS
                              </div>
                              <ul className="list-none space-y-1 font-mono text-[11px] text-mutedText">
                                {[
                                  'Code splitting via route-based lazy loading',
                                  'Next-gen image format optimization',
                                  'On-demand asset lazy loading',
                                  'Reduced JavaScript bundle size',
                                  'Hardware-accelerated CSS animations',
                                  'Optimized web font rendering'
                                ].map((item) => (
                                  <li key={item} className="flex items-start gap-1.5">
                                    <span className="text-green-400 mt-0.5">✓</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-2">
                              <div className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                                ACCESSIBILITY & SEO CRITERIA
                              </div>
                              <div className="space-y-2 text-xs font-sans text-mutedText">
                                <div>
                                  <span className="font-bold text-primaryText">Accessibility:</span> Semantic HTML, full keyboard navigation, proper heading hierarchy, color contrast considerations, and responsive typography.
                                </div>
                                <div className="border-t border-neutral-900/50 pt-1.5">
                                  <span className="font-bold text-primaryText">SEO Optimizations:</span> Semantic markup, custom metadata, Open Graph preview tags, optimized page titles, and structured heading hierarchies.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {devgenSubTab === 'outcomes' && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-3.5 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-2">
                              <div className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider">
                                KEY CHALLENGES RESOLVED
                              </div>
                              <div className="space-y-2 text-xs font-sans text-mutedText">
                                <div>
                                  <span className="font-bold text-primaryText block">Creating Premium UI:</span>
                                  Balancing visual sophistication with simplicity required careful spacing, typography, and animation decisions.
                                </div>
                                <div className="border-t border-neutral-900/50 pt-1.5">
                                  <span className="font-bold text-primaryText block">Flawless Responsiveness:</span>
                                  Ensuring consistent layouts across devices without compromising the desktop experience required flexible grids and adaptive spacing.
                                </div>
                              </div>
                            </div>

                            <div className="p-3.5 bg-neutral-900/40 border border-neutral-850 rounded-none space-y-2">
                              <div className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-wider">
                                CASE STUDY RESULTS
                              </div>
                              <ul className="list-none space-y-1 font-sans text-xs text-mutedText">
                                {[
                                  'Modern professional branding establishing instant trust',
                                  'Strong visual hierarchy with outstanding whitespace',
                                  'Fluid user interactions & hardware-accelerated loops',
                                  'Mobile-friendly scaling & flexible bento grids',
                                  'Scalable and maintainable React architecture',
                                  'Optimized performance with high conversion focus'
                                ].map((item) => (
                                  <li key={item} className="flex items-start gap-1.5">
                                    <span className="text-green-400 mt-0.5">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                            <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-1">
                              <div className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                                LESSONS LEARNED
                              </div>
                              <p className="text-[11px] text-mutedText font-mono leading-relaxed">
                                Reinforced the absolute necessity of designing for performance from the start, building highly modular and reusable UI components, prioritizing accessibility, using animation purposefully, and maintaining consistency across every section.
                              </p>
                            </div>

                            <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-1">
                              <div className="font-mono text-[10px] text-primaryAccent font-bold uppercase tracking-wider">
                                FUTURE EXPANSION PATH
                              </div>
                              <p className="text-[11px] text-mutedText font-mono leading-relaxed">
                                CMS integration, blog system, dark/light theme switching, interactive case studies, client portal, AI chatbot, analytics dashboard, and localization support.
                              </p>
                            </div>
                          </div>

                          <div className="p-3.5 bg-neutral-950 border border-neutral-900 rounded-none space-y-1.5">
                            <div className="font-mono text-[10px] text-green-400 font-bold uppercase tracking-wider">
                              CONCLUSION
                            </div>
                            <p className="text-xs sm:text-sm text-primaryText/90 leading-relaxed font-sans">
                              DevGen demonstrates how thoughtful design and modern front-end development can create a website that is visually engaging, technically robust, and conversion-focused. By combining responsive layouts, clean architecture, performance optimization, and a premium user experience, the project serves as both a business website and a showcase of front-end development expertise.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Call to action */}
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-900 gap-4 flex-wrap">
                    <a 
                      href="https://devgen-omega.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-primaryAccent hover:text-secondaryAccent font-bold uppercase flex items-center gap-1 transition-colors"
                    >
                      VISIT DEVGEN WEBSITE
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
            }

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-surface-dark border border-neutral-800 rounded-none p-5 lg:p-6 space-y-6 relative overflow-hidden"
              >
                {/* Case Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
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
                <div className="flex justify-end pt-1">
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
