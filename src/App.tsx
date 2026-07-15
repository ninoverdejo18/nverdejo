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
  Minimize2,
  Maximize2,
  ChevronDown,
  Github,
  Linkedin
} from 'lucide-react';
import { TabType } from './types';
import HomeTab from './components/HomeTab';
import ServicesTab from './components/ServicesTab';
import ResultsTab from './components/ResultsTab';
import AboutTab from './components/AboutTab';
import ContactTab from './components/ContactTab';
import ChatbotAssistant from './components/ChatbotAssistant';
import SplashCursor from './components/SplashCursor';
import { SpecialText } from './components/ui/special-text';
import Lenis from 'lenis';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = 'dark';
  const [showNavbar, setShowNavbar] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // fluid deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    (window as any).lenis = lenis;

    // Direct synchronization with Lenis scroll animation frame updates
    lenis.on('scroll', (e: any) => {
      if (e.scroll > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });

    // Run initial scroll check
    if (lenis.scroll > 20) {
      setIsScrolled(true);
    }

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Sync URL Hash with activeTab to support deep linking and back/forward browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs: TabType[] = ['home', 'services', 'results', 'about', 'contact'];
      if (validTabs.includes(hash as TabType)) {
        setActiveTab(hash as TabType);
      } else if (!hash) {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Check initial hash on first load to support direct deep linking
    const initialHash = window.location.hash.replace('#', '');
    const validTabs: TabType[] = ['home', 'services', 'results', 'about', 'contact'];
    if (validTabs.includes(initialHash as TabType)) {
      setActiveTab(initialHash as TabType);
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL Hash when activeTab changes
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '');
    if (activeTab === 'home') {
      if (currentHash !== '' && currentHash !== 'home') {
        window.history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } else {
      if (currentHash !== activeTab) {
        window.location.hash = activeTab;
      }
    }
  }, [activeTab]);

  // Update browser tab title dynamically based on the current section
  useEffect(() => {
    switch (activeTab) {
      case 'about':
        document.title = 'About • NVerdejo';
        break;
      case 'services':
        document.title = 'Services • NVerdejo';
        break;
      case 'results':
        document.title = 'Results • NVerdejo';
        break;
      case 'contact':
        document.title = 'Contact • NVerdejo';
        break;
      default:
        document.title = 'NVerdejo';
        break;
    }
  }, [activeTab]);

  // Scroll smoothly to top of the newly displayed section on active tab change
  useEffect(() => {
    const lenisInstance = (window as any).lenis;
    if (lenisInstance) {
      // Smooth scroll using Lenis to the top of the section
      lenisInstance.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  // Delay navigation bar appearance by 10 seconds upon opening the page for the 1st time
  useEffect(() => {
    const hasVisited = localStorage.getItem('nv_has_visited');
    if (hasVisited === 'true') {
      setShowNavbar(true);
    } else {
      const timer = setTimeout(() => {
        setShowNavbar(true);
        localStorage.setItem('nv_has_visited', 'true');
      }, 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Dropdown click outside listener to handle auto-closing when clicking away
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic auto-scaling to fit the entire viewport & adapt beautifully in real time to any screen size and zoom level
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Base width and height configurations
      let scale = 1;

      if (width < 640) {
        // Mobile layout: Fit perfectly by scaling relative to 375px base width
        scale = width / 375;
        // Keep it highly usable (avoid excessively small or large results on mobile variants)
        scale = Math.max(0.85, Math.min(scale, 1.15));
      } else if (width < 1024) {
        // Tablet/iPad layout: Fit beautifully based on 768px base width
        scale = width / 768;
        scale = Math.max(0.9, Math.min(scale, 1.25));
      } else {
        // Desktop / Laptops / Ultra-wide monitors
        // Dynamically compute fit scaling factor relative to 1440x900 design baseline
        const scaleW = width / 1440;
        const scaleH = height / 900;
        
        // Use the smaller scale factor to guarantee the entire layout fits in BOTH dimensions
        // (preventing page/canvas content overflow and keeping the layout perfectly proportioned).
        scale = Math.min(scaleW, scaleH);
        
        // Set solid bounds (0.75x to 1.6x) to preserve aesthetics and legibility
        scale = Math.max(0.75, Math.min(scale, 1.6));
      }

      // 16px base font multiplied by our real-time scale factor adapts all rem-based units dynamically
      const computedFontSize = 16 * scale;
      document.documentElement.style.fontSize = `${computedFontSize}px`;
    };

    // Calculate immediately and bind listeners
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Enforce dark theme on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

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

      {/* MAIN WEB APP CONTENT */}
      <div id="main-application-stage" className="relative z-10 w-full max-w-none mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex flex-col min-h-screen justify-between pointer-events-auto pb-4 pt-0">
          
          {/* TOP HEADER: BRAND LOGO & DESKTOP NAVIGATION */}
          <AnimatePresence>
            {showNavbar && (
              <motion.header
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 right-0 z-50 px-4 py-0 flex items-center justify-between pointer-events-auto w-full max-w-full mx-auto bg-transparent shadow-none border-none h-[50px]"
              >
            
            {/* Branding Logo */}
            <div 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-3 group cursor-pointer selection:bg-transparent"
            >
              <div className="w-9 h-9 bg-transparent overflow-hidden flex items-center justify-center">
                <img 
                  src="/nv-logo1.svg" 
                  alt="NV Logo" 
                  className={`w-full h-full object-cover transition-opacity duration-300 ${isScrolled ? 'opacity-40' : 'opacity-100'}`}
                />
              </div>
              <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left flex flex-col justify-center ${isScrolled ? 'opacity-0 -translate-x-3 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
                <SpecialText 
                  key={`${activeTab}-brand-title`}
                  speed={15} 
                  delay={0.1}
                  className="text-[8.5px] font-normal uppercase tracking-[0.15em] text-white whitespace-nowrap leading-[8.5px]"
                >
                  Niño Verdejo
                </SpecialText>
                <SpecialText 
                  key={`${activeTab}-brand-subtitle`}
                  speed={12} 
                  delay={0.3}
                  className="text-[7px] font-normal uppercase tracking-[0.25em] text-neutral-400 whitespace-nowrap leading-[7.5px] mt-1"
                >
                  WEB DESIGN & CUSTOM DEVELOPMENT
                </SpecialText>
              </div>
            </div>

            {/* Desktop Navigation Interface: Minimize Only with Dropdown List */}
            <div ref={dropdownRef} className="hidden md:flex relative flex-col items-center w-[110px]">
              <button
                onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                className={`relative w-full flex items-center justify-center bg-transparent hover:bg-transparent px-3 py-2.5 rounded-lg text-xs font-mono font-bold tracking-wider text-primaryAccent hover:text-primary-text transition-all duration-300 cursor-pointer shadow-none border-none group ${isScrolled ? 'opacity-40' : 'opacity-100'}`}
                title="Toggle Menu"
              >
                <span className="text-white">MENU</span>
                <ChevronDown className={`absolute right-3 w-3.5 h-3.5 text-white transition-transform duration-200 ${menuDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {menuDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 right-0 top-full mt-1.5 bg-transparent backdrop-blur-none rounded-lg shadow-none z-50 overflow-hidden border border-transparent"
                  >
                    {tabList.map((tab) => {
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            setMenuDropdownOpen(false);
                          }}
                          className={`w-full text-center px-2 py-2.5 font-display text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer block bg-transparent hover:bg-transparent border-none ${
                            isActive ? 'text-primaryAccent bg-transparent font-bold' : 'text-muted-text hover:text-primary-text'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
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
                  className="absolute top-full left-4 right-4 bg-surface-dark border-2 border-neutral-800 rounded-lg p-4 mt-2 z-40 space-y-2 font-display"
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
                </motion.div>
              )}
            </AnimatePresence>

              </motion.header>
            )}
          </AnimatePresence>

          {/* ACTIVE CONTENT VIEW WINDOW */}
          <main className="flex-1 pointer-events-auto">
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
            <div className="text-center md:text-left space-y-1.5">
              <div>© {new Date().getFullYear()} NIÑO VERDEJO. ALL RIGHTS RESERVED.</div>
              <div className="flex items-center justify-center md:justify-start gap-3 text-[9px] text-neutral-400">
                <a 
                  href="https://github.com/ninoverdejo18?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-secondaryAccent"
                >
                  <Github className="w-3 h-3" />
                  <span>GITHUB</span>
                </a>
                <span className="text-neutral-800">•</span>
                <a 
                  href="https://www.linkedin.com/in/ni%C3%B1o-verdejo-949198330/?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-primaryAccent"
                >
                  <Linkedin className="w-3 h-3" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>
            
            {/* Navigation links of Services, Results, About, Contact */}
            <div className={`${(mobileMenuOpen || menuDropdownOpen) ? 'hidden' : 'flex'} items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] mr-0 sm:mr-24`}>
              <button 
                onClick={() => setActiveTab('services')} 
                className={`transition-colors uppercase cursor-pointer hover:text-primaryAccent ${activeTab === 'services' ? 'text-primaryAccent font-bold' : ''}`}
              >
                Services
              </button>
              <span className="text-neutral-800">|</span>
              <button 
                onClick={() => setActiveTab('results')} 
                className={`transition-colors uppercase cursor-pointer hover:text-primaryAccent ${activeTab === 'results' ? 'text-primaryAccent font-bold' : ''}`}
              >
                Results
              </button>
              <span className="text-neutral-800">|</span>
              <button 
                onClick={() => setActiveTab('about')} 
                className={`transition-colors uppercase cursor-pointer hover:text-primaryAccent ${activeTab === 'about' ? 'text-primaryAccent font-bold' : ''}`}
              >
                About
              </button>
              <span className="text-neutral-800">|</span>
              <button 
                onClick={() => setActiveTab('contact')} 
                className={`transition-colors uppercase cursor-pointer hover:text-primaryAccent ${activeTab === 'contact' ? 'text-primaryAccent font-bold' : ''}`}
              >
                Contact
              </button>
            </div>
          </footer>

        </div>

    </div>
  );
}
