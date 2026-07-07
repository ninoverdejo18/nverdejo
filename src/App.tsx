/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Layers, 
  Menu, 
  X, 
  Bot, 
  Zap, 
  Activity, 
  Cpu, 
  Clock,
  Sun,
  Moon
} from 'lucide-react';
import { TabType } from './types';
import HomeTab from './components/HomeTab';
import ServicesTab from './components/ServicesTab';
import ResultsTab from './components/ResultsTab';
import AboutTab from './components/AboutTab';
import ContactTab from './components/ContactTab';
import ChatbotAssistant from './components/ChatbotAssistant';
import SplashCursor from './components/SplashCursor';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderStatusText, setLoaderStatusText] = useState('INITIALIZING...');
  const [loaderShowLogo, setLoaderShowLogo] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync theme with document class on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme as 'dark' | 'light');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Lag-free mouse-follow spotlight effect using requestAnimationFrame
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateSpotlight = () => {
      // Smooth interpolation for lag-free cursor tracking
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${currentX}px`);
        containerRef.current.style.setProperty('--mouse-y', `${currentY}px`);
      }
      requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Cinematic boot loader sequence (Step 1 to 6)
  useEffect(() => {
    // Step 1: System initializing (0ms)
    
    // Step 2: Loading neural interface (600ms)
    const timeout1 = setTimeout(() => {
      setLoaderStatusText('LOADING WORKSPACES...');
    }, 7000); // We speed this up slightly for a tight 3.2s total duration

    // Step 3: Count up percentage (0ms to 2000ms)
    const percentageMilestones = [
      { t: 300, p: 12, s: 'CORE INITIALIZED.' },
      { t: 800, p: 37, s: 'ESTABLISHING SECURE CONNECTION...' },
      { t: 1400, p: 82, s: 'COMPILING STYLE SCHEMAS...' },
      { t: 1800, p: 100, s: 'LOADED.' }
    ];

    percentageMilestones.forEach(m => {
      setTimeout(() => {
        setLoaderProgress(m.p);
        setLoaderStatusText(m.s);
        if (m.p === 100) {
          // Step 4: Show central emblem
          setLoaderShowLogo(true);
        }
      }, m.t);
    });

    // Step 5: Scanner sweep on logo (2000ms - 2800ms)
    // Step 6: Glitch out and enter app (3100ms)
    const enterTimeout = setTimeout(() => {
      setLoading(false);
    }, 3200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(enterTimeout);
    };
  }, []);

  const tabList: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'results', label: 'Results' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-bg-dark text-primary-text relative overflow-x-hidden selection:bg-primaryAccent selection:text-white"
    >
      
      {/* Background radial mouse-follow lighting overlay */}
      <div className="spotlight-bg" />

      {/* Global Interactive Fluid Splash Cursor */}
      <SplashCursor 
        VELOCITY_DISSIPATION={5}
        COLOR_UPDATE_SPEED={5}
        PRESSURE={0.9}
        DENSITY_DISSIPATION={1.5}
        SPLAT_FORCE={3500}
        COLOR="#3B82F6"
        RAINBOW_MODE={false}
      />

      {/* 1. CINEMATIC BOOT LOADER OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            id="cinematic-boot-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(20px)' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-bg-dark z-50 flex flex-col items-center justify-center p-6 font-mono selection:bg-neutral-800"
          >
            <div className="max-w-md w-full space-y-8 relative">
              
              {/* Scanline flickering filter */}
              <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none mix-blend-overlay" />

              {/* Status Log Box */}
              <div className="p-5 bg-surface-dark border-2 border-neutral-800 rounded relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 p-1.5 bg-neutral-900 border-b border-l border-neutral-800 text-[10px] text-primaryAccent font-bold">
                  CORE: v3.5
                </div>

                <div className="flex items-center gap-2 text-primaryAccent">
                  <Terminal className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider">LAUNCH DIAGNOSTICS</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-neutral-500">
                    <span>HOST NODE</span>
                    <span className="text-primary-text">VERDEJO_ENGINE_01</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-500">
                    <span>SECURITY</span>
                    <span className="text-green-400 font-bold">SSL_VERIFIED</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-muted-text">
                    <span className="font-bold truncate">{loaderStatusText}</span>
                    <span className="text-primaryAccent font-bold">{loaderProgress}%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-2 border border-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primaryAccent to-secondaryAccent"
                      style={{ width: `${loaderProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Step 4-5: Central logo emblem appears with scanner sweep */}
              {loaderShowLogo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="flex flex-col items-center gap-3 py-4 relative"
                >
                  {/* Scanner Sweep Line */}
                  <div className="scanner-line" />

                  {/* Logo Icon Block */}
                  <div className="relative p-5 bg-neutral-900 border-2 border-primaryAccent rounded-xl shadow-[0_0_25px_rgba(139,92,246,0.25)]">
                    <span className="font-display text-4xl font-extrabold text-primary-text tracking-tighter">
                      N<span className="text-primaryAccent font-light">V</span>
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-text uppercase tracking-widest mt-1">
                    DEVELOPER PROFILE
                  </span>
                </motion.div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN WEB APP CONTENT */}
      {!loading && (
        <div id="main-application-stage" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen justify-between pointer-events-auto ${(activeTab === 'home' || activeTab === 'contact') ? 'pb-4 pt-0' : 'py-4'}`}>
          
          {/* TOP HEADER: BRAND LOGO & DESKTOP NAVIGATION */}
          <header className={`py-5 flex items-center justify-between pointer-events-auto ${
            (activeTab === 'home' || activeTab === 'contact') 
              ? 'absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto' 
              : 'relative'
          }`}>
            
            {/* Branding Logo */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 group cursor-pointer selection:bg-transparent"
            >
              <div className="p-2 bg-neutral-900 border border-neutral-800 rounded group-hover:border-primaryAccent transition-colors">
                <span className="font-display text-lg font-bold text-primary-text tracking-tighter">
                  N<span className="text-primaryAccent">V</span>
                </span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-sm font-bold text-primary-text uppercase tracking-tight">
                  Niño Verdejo
                </div>
                <div className="font-mono text-[9px] text-primaryAccent uppercase tracking-widest font-bold">
                  WEB DESIGN & DEVELOPMENT EXPERT
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tab Interface with sliding Framer Motion indicator */}
            <nav className="hidden md:flex items-center bg-neutral-950/60 p-1 border border-neutral-900 rounded-lg">
              {tabList.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer ${
                      isActive ? 'text-primary-text' : 'text-muted-text hover:text-primary-text'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-underline"
                        className="absolute inset-0 bg-neutral-900 border border-neutral-800 rounded"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop Secondary Action Button - Replaced with Theme Switcher */}
            <div className="hidden md:block">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 bg-primaryAccent/10 hover:bg-primaryAccent/20 border border-primaryAccent/40 hover:border-primaryAccent text-primaryAccent font-display font-bold uppercase text-[10px] tracking-widest py-2.5 px-4 rounded transition-all cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5" />
                    LIGHT MODE
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5" />
                    DARK MODE
                  </>
                )}
              </button>
            </div>

            {/* Mobile Navigation Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-neutral-900 border border-neutral-800 rounded hover:border-primaryAccent text-primary-text transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Sliding Navigation Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 bg-surface-dark border-2 border-neutral-800 rounded-lg p-4 mt-2 z-40 space-y-2 font-display"
                >
                  {tabList.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-3 px-4 rounded font-semibold text-sm uppercase tracking-wide transition-colors cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-neutral-900 text-primaryAccent border-l-4 border-primaryAccent' 
                          : 'text-muted-text hover:text-primary-text hover:bg-neutral-900/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setActiveTab('contact');
                        setMobileMenuOpen(false);
                      }}
                      className="bg-neutral-900 border border-neutral-800 hover:border-primaryAccent text-primary-text py-3 rounded text-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      CONTACT ME
                    </button>
                    <button
                      onClick={() => {
                        toggleTheme();
                        setMobileMenuOpen(false);
                      }}
                      className="bg-primaryAccent/10 border border-primaryAccent/30 text-primaryAccent py-3 rounded text-center text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                      {theme === 'dark' ? 'LIGHT' : 'DARK'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </header>

          {/* ACTIVE CONTENT VIEW WINDOW */}
          <main className={`flex-1 pointer-events-auto ${(activeTab === 'home' || activeTab === 'contact') ? '' : 'my-6 lg:my-8'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {activeTab === 'home' && <HomeTab setActiveTab={setActiveTab} theme={theme} />}
                {activeTab === 'services' && <ServicesTab setActiveTab={setActiveTab} />}
                {activeTab === 'results' && <ResultsTab setActiveTab={setActiveTab} />}
                {activeTab === 'about' && <AboutTab setActiveTab={setActiveTab} />}
                {activeTab === 'contact' && <ContactTab />}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* FLOATING BOTTLENECK DIAGNOSTIC CONSULTANT */}
          <ChatbotAssistant setActiveTab={setActiveTab} />

          {/* BOTTOM FOOTER */}
          <footer className="border-t border-neutral-900 py-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-500 pointer-events-auto">
            <div className="text-center md:text-left space-y-1">
              <div>© {new Date().getFullYear()} NIÑO VERDEJO. ALL RIGHTS RESERVED.</div>
              <div>PREMIUM WEB DESIGN & CUSTOM DEVELOPMENT</div>
            </div>
            
            {/* Live Infrastructure Ping Simulation */}
            <div className="flex items-center gap-2 bg-neutral-900/50 border border-neutral-800/80 px-3 py-1 rounded">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span>NODES: SECURE</span>
              <span className="text-neutral-700">|</span>
              <span>VERCEL TARGET STATUS: DEPLOYABLE</span>
            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
