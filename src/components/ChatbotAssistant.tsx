/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  Sparkles, 
  Bot 
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { ChatMessage, TabType } from '../types';

interface ExtendedChatMessage extends ChatMessage {
  sources?: { title: string; url: string }[];
}

interface ChatbotAssistantProps {
  setActiveTab: (tab: TabType) => void;
}

type FlowState = 'idle' | 'lead_name' | 'lead_email' | 'lead_message' | 'submitting';

export default function ChatbotAssistant({ setActiveTab }: ChatbotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead collection states
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [fallbackMessage, setFallbackMessage] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      triggerBotResponse(
        "Hi there! 👋 I'm Odette, your digital guide to everything about Niño. How can I help you today?",
        [
          '💼 View Services & Rates',
          '🛠️ See My Skills & Tech Stack',
          '📖 About Niño Verdejo',
          '📬 Get in Touch / Hire Me'
        ]
      );
    }
  }, [isOpen]);

  const triggerBotResponse = (text: string, options?: string[]) => {
    setIsTyping(true);
    const delay = Math.min(1000 + text.length * 10, 2000); // Dynamic typing simulation
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options
        }
      ]);
    }, delay);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message to state
    const userMsg: ExtendedChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Advance states
    if (flowState === 'lead_name') {
      setLeadName(textToSend);
      setFlowState('lead_email');
      triggerBotResponse(
        `Great to meet you, ${textToSend}! What is the best email address to reach you at?`,
        ['⬅️ Back to Main Menu']
      );
    } 
    else if (flowState === 'lead_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(textToSend.trim())) {
        triggerBotResponse(
          "That email address doesn't seem quite right. 😅 Could you please double check and type a valid email?",
          ['⬅️ Back to Main Menu']
        );
        return;
      }
      setLeadEmail(textToSend.trim());
      setFlowState('lead_message');
      triggerBotResponse(
        "Got it. Briefly, what would you like to discuss? (e.g., a new project, a job opportunity, or just saying hi!)",
        ['⬅️ Back to Main Menu']
      );
    } 
    else if (flowState === 'lead_message') {
      setFlowState('submitting');
      setIsTyping(true);

      const viteMeta = import.meta as unknown as { env: Record<string, string | undefined> };
      const serviceId = viteMeta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = viteMeta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = viteMeta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (serviceId && templateId && publicKey) {
        try {
          const templateParams = {
            from_name: leadName,
            from_email: leadEmail,
            business: 'Chatbot Lead Capture',
            project_type: 'General Inquiry',
            message: `${fallbackMessage ? `[User Question: ${fallbackMessage}]\n\n` : ''}${textToSend}`,
            to_email: 'ninoverdejo@gmail.com'
          };
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
        } catch (err) {
          console.error('EmailJS error sending chatbot lead:', err);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      setIsTyping(false);
      setFlowState('idle');
      setFallbackMessage('');
      triggerBotResponse(
        "Perfect! I've sent that over to Niño Verdejo. You can expect a response within 24–48 hours. In the meantime, feel free to keep exploring the site! 🚀",
        ['⬅️ Back to Main Menu']
      );
    } 
    else {
      // Freeform chat using server-side Gemini API with Google Search grounding
      setIsTyping(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: textToSend,
            history: messages.slice(-10) // Send recent context
          })
        });

        if (!response.ok) {
          throw new Error('Chat API returned an error');
        }

        const data = await response.json();
        setIsTyping(false);

        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'bot',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            options: ['⬅️ Back to Main Menu'],
            sources: data.sources
          }
        ]);
      } catch (err) {
        console.error('Gemini Chat error, fallback activated:', err);
        setIsTyping(false);
        setFallbackMessage(textToSend);

        setMessages(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'bot',
            text: "I'm still learning, so I'm not quite sure about that one! 😅 However, I can pass this exact question to Niño Verdejo along with your email, or you can check out my predefined options below.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            options: ['Leave a Message', '⬅️ Back to Main Menu']
          }
        ]);
      }
    }
  };

  const handleOptionClick = (option: string) => {
    // Add user message to state
    const userMsg: ExtendedChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: option,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);

    // Handle options
    if (option === '💼 View Services & Rates') {
      triggerBotResponse(
        "I offer a few specialized services to help you achieve your goals. Here is what I can do for you:\n\n• **Full-Stack Web Development**\n• **UI/UX Design & Prototyping**\n• **Virtual Assistant**\n• **AI Automation**",
        ['💰 View Pricing/Packages', '📁 See Past Work (Portfolio)', '📅 Book a Consultation', '⬅️ Back to Main Menu']
      );
    } 
    else if (option === '🛠️ See My Skills & Tech Stack') {
      triggerBotResponse(
        "Here is a quick snapshot of Niño's core expertise:\n\n• **Languages/Frameworks**: React, Node.js, TypeScript, Express, Tailwind CSS\n• **Tools & Platforms**: Supabase, Firebase, AWS, Figma, Git\n• **Soft Skills**: Active communication, timely delivery, problem-solving, and attention to detail.",
        ['📄 Download Resume/CV', '💼 See Services', '⬅️ Back to Main Menu']
      );
    } 
    else if (option === '📖 About Niño Verdejo') {
      triggerBotResponse(
        "Niño is a Web Designer/Developer with 2 years of experience. He loves solving complex problems and has worked with startups, global brands, and local businesses to bring their digital products to life.",
        ['🔗 Read Full Bio on Website', '📸 View Personal Projects', '⬅️ Back to Main Menu']
      );
    } 
    else if (option === '📬 Get in Touch / Hire Me' || option === '📅 Book a Consultation' || option === 'Leave a Message') {
      setFlowState('lead_name');
      triggerBotResponse(
        "Awesome! I'd love to connect you with Niño Verdejo. First, what is your name?",
        ['⬅️ Back to Main Menu']
      );
    }
    else if (option === '💰 View Pricing/Packages') {
      setActiveTab('services');
      triggerBotResponse(
        "I offer competitive pricing and flexible monthly retainer packages designed to scale your business. You can view our full transparent pricing tables on our Services tab, or we can discuss a custom scope right now!",
        ['📬 Get in Touch / Hire Me', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '📁 See Past Work (Portfolio)') {
      setActiveTab('results');
      triggerBotResponse(
        "Switching you to the Case Studies & Results view! There you can browse in-depth metrics and see real examples of systems we built.",
        ['📬 Get in Touch / Hire Me', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '📄 Download Resume/CV') {
      window.open('https://github.com/ninoverdejo', '_blank');
      triggerBotResponse(
        "Opening Niño's professional resume! In his resume, you'll find complete career details, credentials, and references.",
        ['💼 See Services', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '🔗 Read Full Bio on Website') {
      setActiveTab('about');
      triggerBotResponse(
        "Navigating to Niño's profile and full bio page!",
        ['📬 Get in Touch / Hire Me', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '📸 View Personal Projects') {
      setActiveTab('results');
      triggerBotResponse(
        "Navigating to the showcase page, where you can view live web projects, design graphics, and interactive scenes!",
        ['📬 Get in Touch / Hire Me', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '💼 See Services') {
      setActiveTab('services');
      triggerBotResponse(
        "Navigating to the Services page!",
        ['💰 View Pricing/Packages', '⬅️ Back to Main Menu']
      );
    }
    else if (option === '⬅️ Back to Main Menu') {
      setFlowState('idle');
      setLeadName('');
      setLeadEmail('');
      triggerBotResponse(
        "How can I help you today?",
        [
          '💼 View Services & Rates',
          '🛠️ See My Skills & Tech Stack',
          '📖 About Niño Verdejo',
          '📬 Get in Touch / Hire Me'
        ]
      );
    }
    else {
      // Fallback text input mapping
      handleSendMessage(option);
    }
  };

  return (
    <div id="chatbot-assistant-root" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 font-sans max-w-[calc(100vw-2rem)]">
      
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-launcher-btn"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="flex items-center justify-center bg-primaryAccent hover:bg-primaryAccent/90 text-primaryText rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer border-2 border-primaryAccent active:scale-95 transition-all w-14 h-14 ml-auto"
            aria-label="Diagnostic Assistant"
          >
            <Bot className="w-6 h-6 text-primaryText" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expanded Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-[360px] sm:w-[400px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[80vh] glass-panel-accent rounded-none shadow-2xl flex flex-col overflow-hidden border border-neutral-800"
          >
            
            {/* Chat Header */}
            <div className="p-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primaryAccent/10 border border-primaryAccent/30 rounded-none">
                  <Bot className="w-3.5 h-3.5 text-primaryAccent" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-primaryText uppercase tracking-wider">
                    Odette Assistant
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[9px] text-green-400 font-mono">ONLINE</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-primaryText transition-colors p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-950/40">
              
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  {/* Sender labels */}
                  <span className="text-[8px] font-mono text-neutral-500 mb-0.5">
                    {msg.sender === 'bot' ? 'ODETTE' : 'VISITOR'}
                  </span>
                  
                  {/* Message Bubble */}
                  <div className={`p-2.5 rounded-none text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-primaryAccent text-white' 
                      : 'bg-neutral-900 border border-neutral-850 text-primaryText/95 font-mono'
                  }`}>
                    {msg.text}

                    {/* Search Grounding Sources Display */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-2 border-t border-neutral-850 space-y-1.5">
                        <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-wider">
                          Search References:
                        </div>
                        <div className="flex flex-col gap-1">
                          {msg.sources.slice(0, 3).map((src, idx) => (
                            <a
                              key={idx}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 text-[8px] text-primaryAccent font-mono rounded-none transition-colors"
                            >
                              <Sparkles className="w-2.5 h-2.5 shrink-0" />
                              <span className="truncate">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Options Selector List */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-2 py-1 bg-neutral-950 hover:bg-primaryAccent hover:text-white border border-neutral-800 hover:border-primaryAccent text-[10px] text-primaryText rounded-none font-mono transition-colors cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[8px] font-mono text-neutral-600 mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {/* Bot Typing Indicator */}
              {isTyping && (
                <div className="flex flex-col max-w-[80%] mr-auto items-start">
                  <span className="text-[8px] font-mono text-neutral-500 mb-0.5">ODETTE THINKING...</span>
                  <div className="p-2 bg-neutral-900 border border-neutral-850 rounded-none flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primaryAccent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-primaryAccent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-primaryAccent rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat Input Footer */}
            <div className="p-2.5 bg-neutral-950 border-t border-neutral-900 flex gap-1.5">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
                placeholder={
                  flowState === 'lead_name' ? "Enter your name..." :
                  flowState === 'lead_email' ? "Enter your email..." :
                  flowState === 'lead_message' ? "Enter your message..." :
                  "Ask Odette anything..."
                }
                className="flex-1 bg-neutral-900 border border-neutral-850 focus:border-primaryAccent text-primaryText rounded-none px-2.5 py-1.5 text-xs outline-none font-mono"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                className="p-1.5 bg-primaryAccent hover:bg-primaryAccent/90 text-white rounded-none cursor-pointer transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
