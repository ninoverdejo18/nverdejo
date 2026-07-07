/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Terminal, 
  CheckCircle, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Bot 
} from 'lucide-react';
import { ChatMessage, TabType } from '../types';

interface ChatbotAssistantProps {
  setActiveTab: (tab: TabType) => void;
}

export default function ChatbotAssistant({ setActiveTab }: ChatbotAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [currentQuestionStep, setCurrentQuestionStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [leadAnswers, setLeadAnswers] = useState({
    bottleneck: '',
    hoursLost: '',
    toolsUsed: '',
    teamSize: '',
    outcome: ''
  });

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
        "Tell me your workflow bottleneck. I'll help identify what can be automated.",
        ['Slowing Database / App', 'CRM Data Copying', 'Lead Processing Latency', 'Manual Spreadsheets']
      );
    }
  }, [isOpen]);

  const triggerBotResponse = (text: string, options?: string[], recommendedService?: string) => {
    setIsTyping(true);
    const delay = Math.min(1000 + text.length * 15, 2500); // Dynamic typing simulation
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options,
          recommendedService
        }
      ]);
    }, delay);
  };

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Advance qualification interview state machine
    const nextStep = currentQuestionStep + 1;
    setCurrentQuestionStep(nextStep);

    // Track answers and formulate next lead qualification prompt
    if (currentQuestionStep === 0) {
      setLeadAnswers(prev => ({ ...prev, bottleneck: textToSend }));
      triggerBotResponse(
        "Understood. Roughly how many hours weekly does your business lose to managing this manual process?",
        ['Less than 5 hours', '5–12 hours', '12–20 hours', '20+ hours']
      );
    } 
    else if (currentQuestionStep === 1) {
      setLeadAnswers(prev => ({ ...prev, hoursLost: textToSend }));
      triggerBotResponse(
        "Friction identified. What current tools/apps are utilized in this flow? (e.g. Excel, Gmail, Salesforce, custom dashboard)",
        ['Google Sheets + Email', 'Legacy Internal Portal', 'Airtable / Zapier', 'Multiple SQL Databases']
      );
    } 
    else if (currentQuestionStep === 2) {
      setLeadAnswers(prev => ({ ...prev, toolsUsed: textToSend }));
      triggerBotResponse(
        "Got it. What is your active team size running this operations loop?",
        ['1 founder / solo', '2–5 members', '5–15 members', '15+ members']
      );
    } 
    else if (currentQuestionStep === 3) {
      setLeadAnswers(prev => ({ ...prev, teamSize: textToSend }));
      triggerBotResponse(
        "Final point. What is your primary desired outcome after this is engineered?",
        ['Minimize manual hours', 'Eliminate data inaccuracies', 'Accelerate lead SLAs', 'Establish robust server uptime']
      );
    } 
    else if (currentQuestionStep === 4) {
      const outcome = textToSend;
      setLeadAnswers(prev => {
        const updated = { ...prev, outcome };
        
        // Formulate customized, ROI-centric automated recommendation report
        setTimeout(() => {
          generateFinalRecommendation(updated);
        }, 1000);

        return updated;
      });
    }
  };

  // Diagnostic recommendation generation
  const generateFinalRecommendation = (answers: typeof leadAnswers) => {
    setIsTyping(true);
    
    // Choose recommendation type based on answers
    let recommendationType = 'AI Automation';
    let detailedAnalysis = '';

    if (answers.bottleneck.toLowerCase().includes('database') || 
        answers.bottleneck.toLowerCase().includes('server') || 
        answers.toolsUsed.toLowerCase().includes('sql')) {
      recommendationType = 'Technical VA';
      detailedAnalysis = "Our technical analysis identifies database/server latency as a primary operational ceiling. Over-relying on unindexed database queries stalls system processing and drains team energy.";
    } else if (answers.bottleneck.toLowerCase().includes('app') || 
               answers.bottleneck.toLowerCase().includes('react') || 
               answers.bottleneck.toLowerCase().includes('dashboard')) {
      recommendationType = 'Web Development';
      detailedAnalysis = "Your operations require a clean React dashboard panel. Moving workflows away from fragile sheets and into dedicated user spaces eliminates data contamination risks completely.";
    } else {
      recommendationType = 'AI Automation';
      detailedAnalysis = `Connecting your workflows through triggered webhook pipelines will secure your data. Automating your processes restores operational capacity instantly.`;
    }

    setTimeout(() => {
      setIsTyping(false);
      
      const text = `DIAGNOSTIC ARCHITECTURE COMPLETE:
      
      System Recommendation: [${recommendationType.toUpperCase()}]
      
      Analysis: ${detailedAnalysis}
      
      Estimated ROI: Restoring roughly ${answers.hoursLost === '20+ hours' ? '20+' : answers.hoursLost === '12–20 hours' ? '15' : '8'} hours weekly, corresponding to a significant acceleration in operational cycles.
      
      Would you like to auto-inject these specifications directly into the active project pipeline and connect with Niño?`;

      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: 'bot',
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: ['Yes, launch project inquiry', 'Reset Diagnostics'],
          recommendedService: recommendationType
        }
      ]);
    }, 1800);
  };

  const handleOptionClick = (option: string, recommendedService?: string) => {
    if (option === 'Yes, launch project inquiry') {
      // Navigate to contact tab
      setActiveTab('contact');
      setIsOpen(false);
      return;
    }

    if (option === 'Reset Diagnostics') {
      setMessages([]);
      setCurrentQuestionStep(0);
      setLeadAnswers({
        bottleneck: '',
        hoursLost: '',
        toolsUsed: '',
        teamSize: '',
        outcome: ''
      });
      triggerBotResponse(
        "Tell me your workflow bottleneck. I'll help identify what can be automated.",
        ['Slowing Database / App', 'CRM Data Copying', 'Lead Processing Latency', 'Manual Spreadsheets']
      );
      return;
    }

    handleSendMessage(option);
  };

  return (
    <div id="chatbot-assistant-root" className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Launcher Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chatbot-launcher-btn"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="flex items-center justify-center bg-primaryAccent hover:bg-primaryAccent/90 text-primaryText rounded-full shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer border-2 border-primaryAccent active:scale-95 transition-all w-14 h-14"
            aria-label="Diagnostic Assistant"
          >
            <Bot className="w-6 h-6 text-primaryText animate-pulse" />
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
            className="w-[360px] sm:w-[400px] h-[500px] glass-panel-accent rounded-none shadow-2xl flex flex-col overflow-hidden border border-neutral-800"
          >
            
            {/* Chat Header */}
            <div className="p-4 bg-neutral-950 border-b border-neutral-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-primaryAccent/10 border border-primaryAccent/30 rounded-none">
                  <Bot className="w-3.5 h-3.5 text-primaryAccent" />
                </div>
                <div>
                  <div className="text-[10px] font-mono font-bold text-primaryText uppercase tracking-wider">
                    SYSTEM_CORE_CONSULTANT
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                    <span className="text-[9px] text-green-400 font-mono">STANDBY_ON</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-primaryText transition-colors p-1"
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
                    {msg.sender === 'bot' ? 'SYSTEM' : 'VISITOR'}
                  </span>
                  
                  {/* Message Bubble */}
                  <div className={`p-2.5 rounded-none text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-primaryAccent text-white' 
                      : 'bg-neutral-900 border border-neutral-850 text-primaryText/95 font-mono'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Options Selector List */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt, msg.recommendedService)}
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
                  <span className="text-[8px] font-mono text-neutral-500 mb-0.5">SYSTEM CLASSIFYING...</span>
                  <div className="p-2 bg-neutral-900 border border-neutral-850 rounded-none flex items-center gap-1">
                    <span className="w-1 h-1 bg-primaryAccent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1 h-1 bg-primaryAccent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1 h-1 bg-primaryAccent rounded-full animate-bounce" />
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
                placeholder="Type operational bottleneck..."
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
