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
  Terminal
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ContactFormInput } from '../types';
import { SplineSceneHero } from './SplineSceneHero';

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
    const viteMeta = import.meta as unknown as { env: Record<string, string | undefined> };
    const serviceId = viteMeta.env.VITE_EMAILJS_SERVICE_ID || '';
    const templateId = viteMeta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    const publicKey = viteMeta.env.VITE_EMAILJS_PUBLIC_KEY || '';

    // Check if keys exist
    if (!serviceId || !templateId || !publicKey) {
      // Simulate successful submission and provide clear debugging configuration details
      setTimeout(() => {
        setLoading(false);
        setStatus({
          type: 'simulated',
          message: 'Project pipeline inquiry initiated (Simulation Mode).'
        });
        // Clear form
        setForm({
          name: '',
          email: '',
          business: '',
          projectType: 'AI Automation',
          message: ''
        });
      }, 1500);
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

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
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
      setLoading(false);
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Pipeline communication failure. Please use direct email.'
      });
    }
  };

  return (
    <div id="contact-tab-container" className="space-y-12 lg:space-y-16 pb-8">
      
      {/* Immersive Spline 3D Robot Hero */}
      <SplineSceneHero />
      
      {/* Split Contact Section */}
      <div id="split-contact-grid" className="border-t border-neutral-900 pt-12 lg:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch scroll-mt-24">
        
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
              <div className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold">
                EXTERNAL NETWORKS
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
          <div className="p-4 bg-neutral-950 border-b border-neutral-900 rounded-none font-mono text-[11px] text-neutral-500 space-y-1.5">
            <div className="flex items-center gap-1.5 text-primaryText font-bold">
              <Clock className="w-3.5 h-3.5 text-green-400" />
              RESPONSE COMMITTED PROTOCOL
            </div>
            <p className="leading-normal">
              Every inquiry is triaged within 120 minutes. If accepted, you will receive an active workspace diagram detailing exact milestones, development timelines, and fixed retainer metrics.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: The EmailJS Form */}
        <div className="lg:col-span-7">
          <div className="p-5 lg:p-6 bg-surface-dark border border-neutral-800 rounded-none space-y-5">
            
            <div className="border-b border-neutral-900 pb-3">
              <h3 className="font-display text-base font-black text-primaryText uppercase tracking-tight">
                TRANSMISSION FORM
              </h3>
              <p className="text-[10px] text-mutedText font-mono">
                SECURE SSL PIPELINE ACTIVE
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
                    placeholder="Niño Verdejo" 
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
                    placeholder="ninoverdejo@gmail.com" 
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
                    placeholder="SaaS Corp" 
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
                  Bottleneck Description & Goal *
                </label>
                <textarea 
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your current manual bottlenecks, workflows requiring optimization, or active server faults. (Minimum 10 words)"
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
