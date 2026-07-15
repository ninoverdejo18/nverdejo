/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { 
  Mail, 
  Linkedin, 
  Github, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Zap, 
  Clock, 
  Terminal,
  Volume2
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactFormInput } from '../types';
import { SplineSceneHero } from './SplineSceneHero';

const playRobotVoice = (text: string) => {
  if (typeof window === 'undefined') return;
  
  // 1. Play sci-fi modular robotic beep-boop synth sequence using Web Audio API
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // Let's queue up a rapid sequence of modular synthetic laser/beep pulses
      const pulses = [
        { time: 0, freq: 190, dur: 0.08 },
        { time: 0.08, freq: 140, dur: 0.06 },
        { time: 0.14, freq: 280, dur: 0.12 }
      ];
      
      pulses.forEach((p) => {
        const osc = ctx.createOscillator();
        const modOsc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        const modGain = ctx.createGain();
        
        // Main metallic timbre
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(p.freq, now + p.time);
        osc.frequency.exponentialRampToValueAtTime(p.freq * 0.7, now + p.time + p.dur);
        
        // Ring modulation carrier to give it that "Dalek" / electronic ring
        modOsc.type = 'sine';
        modOsc.frequency.setValueAtTime(65, now + p.time);
        
        modGain.gain.setValueAtTime(45, now + p.time);
        
        // Bandpass filter to add electronic resonance
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now + p.time);
        filter.Q.setValueAtTime(6, now + p.time);
        
        // Volume envelope
        gainNode.gain.setValueAtTime(0, now + p.time);
        gainNode.gain.linearRampToValueAtTime(0.12, now + p.time + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + p.time + p.dur);
        
        // Connections
        modOsc.connect(modGain);
        modGain.connect(osc.frequency);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        modOsc.start(now + p.time);
        osc.start(now + p.time);
        
        modOsc.stop(now + p.time + p.dur);
        osc.stop(now + p.time + p.dur);
      });
    }
  } catch (err) {
    console.warn('Web Audio synthesis is blocked or unsupported:', err);
  }

  // 2. Synthesize deep-pitched robotic speech voice via SpeechSynthesis API
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select the best voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.includes('Google US English') || v.name.includes('Microsoft') || v.name.includes('Male') || v.name.includes('David'))
      ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.rate = 0.85;  // Slow, methodical pacing
      utterance.pitch = 0.45; // Low-pitched mechanical sound
      utterance.volume = 1.0;
      
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.warn('SpeechSynthesis is blocked or unsupported:', err);
  }
};

export default function ContactTab() {
  const [form, setForm] = useState<ContactFormInput>({
    name: '',
    email: '',
    business: '',
    projectType: 'AI Automation',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error' | 'simulated';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Strict client validation
    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: 'error',
        message: 'Name, email, and message fields are strictly required.'
      });
      return;
    }

    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    // Retrieve EmailJS configuration from environment variables safely in strict TS
    const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || 'service_pdnki0s';
    const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || 'template_sym6wks';
    const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || 'Um40NagmPxC9YUZAO';

    // Check if keys exist
    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      setStatus({
        type: 'error',
        message: 'EmailJS Public Key is required! Please configure the VITE_EMAILJS_PUBLIC_KEY environment variable in your Settings menu to enable live message delivery.'
      });
      return;
    }

    try {
      // Send real EmailJS message if configured
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        business: form.business,
        project_type: form.projectType,
        message: form.message,
        to_email: 'ninoverdejo@gmail.com'
      };

      // Create a 10-second timeout promise to avoid getting stuck if adblockers silently drop the request
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('TRANSMISSION_TIMEOUT'));
        }, 10000);
      });

      // Race the EmailJS dispatch against the timeout promise
      await Promise.race([
        emailjs.send(serviceId, templateId, templateParams, publicKey),
        timeoutPromise
      ]);
      
      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Operational inquiry dispatched successfully. Response time target: <2 hours.'
      });
      
      setForm({
        name: '',
        email: '',
        business: '',
        projectType: 'AI Automation',
        message: ''
      });
    } catch (err: unknown) {
      console.error('EmailJS transmission error:', err);
      setLoading(false);
      
      let errorMessage = 'Pipeline communication failure. Please send direct email to ninoverdejo@gmail.com.';
      if (err instanceof Error) {
        if (err.message === 'TRANSMISSION_TIMEOUT') {
          errorMessage = 'Transmission timed out. This typically happens when an ad-blocker (like uBlock Origin, Brave Shields, or Ghostery) silently blocks/drops the request to api.emailjs.com, or if your network is unstable. Please temporarily disable your ad-blocker or contact Niño directly at ninoverdejo@gmail.com.';
        } else {
          errorMessage = `${err.message} (Please verify your EmailJS keys or contact Niño directly at ninoverdejo@gmail.com)`;
        }
      } else if (typeof err === 'object' && err !== null && 'text' in err) {
        errorMessage = `${(err as { text: string }).text} (Please verify your EmailJS keys or contact Niño directly at ninoverdejo@gmail.com)`;
      }
      
      setStatus({
        type: 'error',
        message: errorMessage
      });
    }
  };

  return (
    <div id="contact-tab-container" className="space-y-12 lg:space-y-16 pb-8">
      
      {/* Immersive Spline 3D Robot Hero */}
      <SplineSceneHero />
      
      {/* Split Contact Section */}
      <div id="split-contact-grid" className="pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch scroll-mt-24">
        
        {/* LEFT COLUMN: Contact Cards & Direct Access */}
        <div className="lg:col-span-5 space-y-5 flex flex-col justify-between">
          
          <div className="space-y-5">
            <div className="p-5 bg-surface-dark border-b border-neutral-800 rounded-none space-y-4 relative overflow-hidden">
              <div className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-semibold">
                DIRECT INBOX
              </div>
              <h3 className="font-display text-lg font-black text-primaryText uppercase">
                Niño Verdejo
              </h3>
              <p className="text-xs sm:text-sm text-mutedText/90 leading-relaxed font-sans">
                Connect directly for high-ticket contracts, retainer sprint inquiries, or urgent operational assistance.
              </p>
              
              <div className="space-y-2 pt-1">
                <a 
                  href="mailto:ninoverdejo@gmail.com" 
                  className="flex items-center gap-2 text-xs sm:text-sm text-primaryAccent hover:text-secondaryAccent font-mono font-bold transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  ninoverdejo@gmail.com
                </a>
              </div>
            </div>

            {/* Social Channels panel */}
            <div className="p-5 bg-neutral-900/40 border-b border-neutral-800/80 rounded-none space-y-3">
              <div 
                onClick={() => playRobotVoice('External Networks')}
                className="font-mono text-[9px] text-neutral-500 hover:text-primaryAccent uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer transition-all group select-none"
                title="Click to play robot voice transmission"
              >
                <Volume2 className="w-3.5 h-3.5 text-neutral-500 group-hover:text-primaryAccent group-hover:scale-110 transition-all shrink-0" />
                <span>EXTERNAL NETWORKS</span>
                <span className="text-[8px] text-primaryAccent font-mono opacity-0 group-hover:opacity-100 transition-opacity ml-auto tracking-normal">
                  [PLAY AUDIO TRANSMISSION]
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="https://www.linkedin.com/in/ni%C3%B1o-verdejo-949198330/?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-850 rounded-none text-xs text-primaryText font-mono font-bold transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-primaryAccent" />
                    LinkedIn
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>

                <a 
                  href="https://github.com/ninoverdejo18?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 hover:border-neutral-850 rounded-none text-xs text-primaryText font-mono font-bold transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-secondaryAccent" />
                    GitHub
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Core Response Timeline */}
          <div className="bg-transparent rounded-none font-mono text-[11px] text-neutral-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-primaryText font-bold">
              <Clock className="w-3.5 h-3.5" />
              RESPONSE TIME
            </div>
            <p className="leading-normal">
              Inquiries are typically reviewed within 24 hours.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The EmailJS Form */}
        <div className="lg:col-span-7">
          <div className="p-5 lg:p-6 bg-surface-dark border border-neutral-800 rounded-none space-y-5">
            
            <div className="pb-3">
              <h3 className="font-display text-base font-black text-primaryText uppercase tracking-tight">
                WEB PROJECT INQUIRY
              </h3>
              <p className="text-[10px] text-mutedText font-mono">
                DESIGN & DEVELOPMENT BRIEFING ACTIVE
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              
              {/* Name & Email Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-bold">
                    Full Name / Contact *
                  </label>
                  <input 
                    type="text" 
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Type your name" 
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-primaryAccent text-primaryText py-2.5 px-3 rounded-none outline-none font-sans transition-colors text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-bold">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Type your email address" 
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-primaryAccent text-primaryText py-2.5 px-3 rounded-none outline-none font-sans transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Business & Project Type Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-bold">
                    Business / Startup Name
                  </label>
                  <input 
                    type="text" 
                    name="business"
                    value={form.business}
                    onChange={handleChange}
                    placeholder="Type your business name" 
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-primaryAccent text-primaryText py-2.5 px-3 rounded-none outline-none font-sans transition-colors text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-bold">
                    System Architecture Need *
                  </label>
                  <select 
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full bg-neutral-950 border border-neutral-850 focus:border-primaryAccent text-primaryText py-2.5 px-3 rounded-none outline-none font-mono transition-colors text-xs"
                  >
                    <option value="Web/App Development">Web & App Development</option>
                    <option value="AI Automation">AI Workflow Automations</option>
                    <option value="Technical VA">Technical Assistance</option>
                    <option value="Other">Custom Integrated System</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="font-mono text-[9px] text-mutedText uppercase tracking-widest font-bold">
                  Project Scope & Visual Style *
                </label>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your design aesthetics, desired pages/features, responsive layout needs, or custom backend services. (Minimum 10 words)"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-primaryAccent text-primaryText py-2.5 px-3 rounded-none outline-none font-sans transition-colors resize-none leading-relaxed text-xs"
                />
              </div>

              {/* Status Alert Panels */}
              {status.message && (
                <div className={`p-3.5 rounded-none border font-mono text-[11px] flex items-start gap-2.5 ${
                  status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  status.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                  'bg-primaryAccent/10 border-primaryAccent/20 text-primaryAccent'
                }`}>
                  {status.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-0.5 flex-1">
                    <span className="font-bold block">
                      {status.type === 'error' ? 'TRANSMISSION ERROR' : 
                       status.type === 'success' ? 'TRANSMISSION SUCCESSFUL' : 
                       'INTEGRATION DIAGNOSTIC'}
                    </span>
                    <span className="leading-relaxed block">{status.message}</span>
                    
                    {/* Diagnostic assist text for simulator */}
                    {status.type === 'simulated' && (
                      <div className="mt-2 p-2 bg-neutral-950 border border-neutral-850 text-[10px] text-mutedText font-mono leading-relaxed space-y-1 rounded-none">
                        <div className="text-secondaryAccent font-bold">🔧 Developers: Active EmailJS keys missing.</div>
                        <div>To activate real emails:</div>
                        <div>1. Open <code className="text-primaryText font-bold bg-neutral-900 px-1 rounded-none">.env.example</code></div>
                        <div>2. Add <code className="text-primaryText bg-neutral-900 px-1 rounded-none">VITE_EMAILJS_SERVICE_ID</code>, etc.</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primaryAccent hover:bg-primaryAccent/90 disabled:bg-neutral-800 text-white font-mono font-bold uppercase tracking-wider text-[10px] py-3 rounded-none transition-all cursor-pointer shadow-none hover:shadow-none"
              >
                {loading ? (
                  <span className="flex items-center gap-1.5 font-mono text-[10px]">
                    <Terminal className="w-3.5 h-3.5 animate-spin text-white" />
                    DISPATCHING COURIER...
                  </span>
                ) : (
                  <>
                    DISPATCH INQUIRY
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
}
