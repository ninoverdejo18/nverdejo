import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Globe, Smartphone, FolderHeart, Cpu } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  icon: any;
  items: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    title: 'WEB DEVELOPMENT',
    icon: Globe,
    items: [
      {
        id: 'web-1',
        question: 'What kinds of websites do you build?',
        answer: 'I build clean, responsive portfolios, business websites, and fast web applications using modern, reliable technologies.'
      },
      {
        id: 'web-2',
        question: 'Will my website load fast and work on Google?',
        answer: 'Yes, I optimize every website so it loads almost instantly, looks great on mobile, and is easy for Google search to find.'
      },
      {
        id: 'web-3',
        question: 'Can you customize the design to match my brand?',
        answer: 'Yes, I design everything from scratch to fit your exact business goals, colors, and unique brand style.'
      },
      {
        id: 'web-4',
        question: 'How long does it take to build a website?',
        answer: 'Most simple websites or landing pages take 1 to 2 weeks, while larger custom web systems may take 3 to 4 weeks.'
      },
      {
        id: 'web-5',
        question: 'Do you offer support after the website goes live?',
        answer: 'Yes, I can provide regular monthly support to make sure everything stays secure, fast, and fully updated.'
      }
    ]
  },
  {
    title: 'APP DEVELOPMENT',
    icon: Smartphone,
    items: [
      {
        id: 'app-1',
        question: 'Do you build mobile-friendly apps?',
        answer: 'Yes, I create responsive web apps that look and work beautifully on smartphones, tablets, laptops, and desktop screens.'
      },
      {
        id: 'app-2',
        question: 'Can my app save data or work offline?',
        answer: 'Yes, I can set up your app to store information locally so it remains accessible and functional even without internet.'
      },
      {
        id: 'app-3',
        question: 'Will the app have smooth transitions and animations?',
        answer: 'Yes, I add clean, subtle animations that make navigating through the app feel premium, fast, and satisfying.'
      },
      {
        id: 'app-4',
        question: 'Can you connect the app to a database?',
        answer: 'Yes, I can connect your app to a secure database so user accounts and settings are always saved safely.'
      },
      {
        id: 'app-5',
        question: 'Can I export or download my data from the app?',
        answer: 'Yes, I can add simple buttons to let you download reports, spreadsheets, or backup files with one click.'
      }
    ]
  },
  {
    title: 'VIRTUAL ASSISTANT',
    icon: FolderHeart,
    items: [
      {
        id: 'va-1',
        question: 'What tasks can you do as a virtual assistant?',
        answer: 'I help organize files, manage daily administrative tasks, write helpful guides, and handle support requests to keep your operations running smoothly.'
      },
      {
        id: 'va-2',
        question: 'Can you help organize my spreadsheets and files?',
        answer: 'Yes, I clean up Google Sheets, organize files in Drive, set up Notion databases, and configure collaboration tools.'
      },
      {
        id: 'va-3',
        question: 'How do you share project updates with me?',
        answer: 'I provide regular, easy-to-read updates over email or Slack so you always know the exact progress without needing long meetings.'
      },
      {
        id: 'va-4',
        question: 'What tools do you use to manage tasks?',
        answer: 'I am comfortable using Notion, Trello, Asana, Google Workspace, and Slack to keep all tasks highly organized.'
      },
      {
        id: 'va-5',
        question: 'Can you help with customer support emails?',
        answer: 'Yes, I can draft clear, friendly email templates and answer basic customer inquiries to save you time.'
      }
    ]
  },
  {
    title: 'AI AUTOMATION',
    icon: Cpu,
    items: [
      {
        id: 'ai-1',
        question: 'How can basic AI help my business?',
        answer: 'I set up simple tools that use AI to summarize long text files, organize incoming emails, and automate repetitive tasks.'
      },
      {
        id: 'ai-2',
        question: 'Is it safe to connect my accounts to AI tools?',
        answer: 'Yes, I configure private connections securely on a backend server to ensure your API keys and business data are fully protected.'
      },
      {
        id: 'ai-3',
        question: 'Can you build a simple AI chatbot for me?',
        answer: 'Yes, I can create a helpful chat assistant to answer basic customer questions and route important messages straight to you.'
      },
      {
        id: 'ai-4',
        question: 'Do I need an expensive subscription to use AI tools?',
        answer: 'No, we can often use free tiers or pay-as-you-go keys from Google Gemini that cost pennies per month.'
      },
      {
        id: 'ai-5',
        question: 'Can AI automate my incoming emails or forms?',
        answer: 'Yes, we can set up simple automations to auto-reply to common questions or organize form answers into a Google Sheet.'
      }
    ]
  }
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-section-container" className="border-t border-neutral-900 pt-16 pb-12 space-y-12 relative z-10 pointer-events-auto max-w-[800px] w-full mx-auto px-4 sm:px-6">
      {/* FAQ Header Row */}
      <div id="faq-section-header" className="space-y-3 text-center flex flex-col items-center">

        <h2 id="faq-section-title" className="font-display text-2xl sm:text-3xl font-black text-primaryText uppercase tracking-tight">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p id="faq-section-subtitle" className="text-mutedText text-xs sm:text-sm max-w-2xl leading-relaxed font-sans text-center">
          Got questions about my services or technical setups? Explore simple answers about how I design, develop, and automate systems.
        </p>
      </div>

      {/* Categorized Accordions Grid */}
      <div id="faq-categories-grid" className="grid grid-cols-1 gap-10 w-full mx-auto">
        {FAQ_CATEGORIES.map((cat, catIdx) => {
          const IconComponent = cat.icon;
          return (
            <div key={cat.title} id={`faq-cat-group-${catIdx}`} className="space-y-4">
              {/* Category Header */}
              <div id={`faq-cat-header-${catIdx}`} className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                <IconComponent className="w-4 h-4 text-primaryAccent" />
                <h3 className="font-display text-base font-black text-primaryText uppercase tracking-wider">
                  {cat.title}
                </h3>
              </div>

               {/* Category Items Accordion */}
              <div id={`faq-cat-items-${catIdx}`} className="grid grid-cols-1 gap-3">
                {cat.items.map((item) => {
                  const isOpen = openId === item.id;
                  return (
                    <div 
                      key={item.id}
                      id={`faq-item-card-${item.id}`}
                      className={`border transition-all duration-200 bg-neutral-950/60 ${
                        isOpen 
                          ? 'border-primaryAccent/40 bg-neutral-950 shadow-[0_0_15px_rgba(80,200,120,0.03)]' 
                          : 'border-neutral-900 hover:border-neutral-850'
                      }`}
                    >
                      <button
                        id={`faq-item-trigger-${item.id}`}
                        onClick={() => toggleFAQ(item.id)}
                        className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div id={`faq-item-content-${item.id}`} className="space-y-1">
                          <h4 id={`faq-item-question-${item.id}`} className="font-display text-sm sm:text-base font-bold text-primaryText leading-snug">
                            {item.question}
                          </h4>
                        </div>
                        <div id={`faq-item-icon-wrapper-${item.id}`} className="mt-1 shrink-0">
                          <ChevronDown 
                            id={`faq-item-icon-${item.id}`}
                            className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-primaryAccent' : ''
                            }`} 
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-item-collapse-${item.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div id={`faq-item-answer-${item.id}`} className="px-5 pb-5 pt-1 border-t border-neutral-900/40 text-xs sm:text-sm text-mutedText leading-relaxed font-sans max-w-3xl">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
