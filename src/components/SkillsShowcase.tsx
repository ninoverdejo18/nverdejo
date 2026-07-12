import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Globe, 
  Layout, 
  Cpu, 
  Server, 
  Settings, 
  Workflow, 
  Database, 
  PenTool, 
  Sparkles, 
  Smartphone, 
  Cloud, 
  Terminal, 
  Monitor 
} from 'lucide-react';

// Skill category definitions
export const SKILL_CATEGORIES = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks' },
  { id: 'styling-design', label: 'Design & Styling' },
  { id: 'tooling-backend', label: 'Tooling & Workflows' }
];

// Complete list of skills with deep technical breakdowns
export const SKILLS_LIST = [
  {
    name: 'TypeScript',
    category: 'languages',
    level: 95,
    icon: 'Code',
    tag: 'Type Safety',
    description: 'Interfaces, generics, custom decorators, and strict compilation checks to write robust applications.',
    highlights: ['Generics & Utility Types', 'Advanced Inference', 'Strict Null Checks']
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'languages',
    level: 98,
    icon: 'Globe',
    tag: 'Core Scripting',
    description: 'High-performance asynchronous loops, scope structures, memory profiling, and event loop orchestration.',
    highlights: ['Async/Await & Promises', 'Functional Coding', 'JSON & Data Structures']
  },
  {
    name: 'HTML5',
    category: 'languages',
    level: 100,
    icon: 'Globe',
    tag: 'Semantic Markup',
    description: 'Perfect document architecture conforming to modern SEO guidelines and accessibility requirements (WCAG/ARIA).',
    highlights: ['SEO Validation', 'Accessible markup (ARIA)', 'Media & Form APIs']
  },
  {
    name: 'Supabase',
    category: 'languages',
    level: 92,
    icon: 'Database',
    tag: 'Backend-as-a-Service',
    description: 'Real-time database subscriptions, relational PostgreSQL architecture, user authentication, edge functions, and secure storage buckets.',
    highlights: ['Postgres Schema Design', 'Row Level Security (RLS)', 'Real-time Subscriptions']
  },
  {
    name: 'CSS3 / Tailwind CSS',
    category: 'styling-design',
    level: 98,
    icon: 'Layout',
    tag: 'Visual Layouts',
    description: 'Modern styling mechanisms utilizing advanced grid patterns, variable setups, transitions, and fluid utility structures.',
    highlights: ['Tailwind Playbooks', 'Subtle Transitions', 'Responsive Grid systems']
  },
  {
    name: 'Figma UI/UX Mastery',
    category: 'styling-design',
    level: 92,
    icon: 'PenTool',
    tag: 'Visual Blueprints',
    description: 'Designing interactive high-fidelity mockups, variable spacing systems, component libraries, and visual design assets.',
    highlights: ['Responsive Auto-Layout', 'Design Tokens Mapping', 'Interactive Prototypes']
  },
  {
    name: 'Motion & Animations',
    category: 'styling-design',
    level: 90,
    icon: 'Sparkles',
    tag: 'Interactive Motion',
    description: 'Adding fluid entrance transitions, micro-interactions, layout morphing, and physics-based motion vectors (Framer Motion / GSAP).',
    highlights: ['Staggered Animations', 'Layout Transitions', 'Gesture-Based Triggers']
  },
  {
    name: 'React 18+',
    category: 'frameworks',
    level: 96,
    icon: 'Cpu',
    tag: 'Dynamic UI',
    description: 'Component architecture based on custom hooks, performance profiling, precise state synchronization, and render limits.',
    highlights: ['Custom Hooks Pattern', 'State Optimization', 'Concurrent Features']
  },
  {
    name: 'Next.js & App Router',
    category: 'frameworks',
    level: 92,
    icon: 'Server',
    tag: 'Modern Server UI',
    description: 'Modern full-stack frameworks leveraging Server Components, layouts, static regeneration, and server-side operations.',
    highlights: ['Server vs Client boundary', 'API Proxy Routing', 'Dynamic Loading']
  },
  {
    name: 'Node.js & Express',
    category: 'frameworks',
    level: 90,
    icon: 'Terminal',
    tag: 'Backend Services',
    description: 'Creating high-throughput backend services, proxy routes, middleware chains, token verifications, and custom APIs.',
    highlights: ['RESTful Endpoint Design', 'Custom Middlewares', 'Error-Handling Systems']
  },
  {
    name: 'React Native & Expo',
    category: 'frameworks',
    level: 86,
    icon: 'Smartphone',
    tag: 'Cross-Platform Mobile',
    description: 'Compiling universal app experiences across iOS and Android with single-source efficiency and native device bindings.',
    highlights: ['Expo Client Workflows', 'Native Module Bridges', 'Fluid Mobile Layouts']
  },
  {
    name: 'UI/UX Translation',
    category: 'styling-design',
    level: 94,
    icon: 'Monitor',
    tag: 'Pixel-Perfect',
    description: 'Precision engineering translating Figma blueprints, spacing rules, color tokens, and layout guidelines directly into code.',
    highlights: ['Figma-to-React precision', 'Micro-Interactions', 'Fluid Scale Spacing']
  },
  {
    name: 'Vite & Bundlers',
    category: 'tooling-backend',
    level: 90,
    icon: 'Settings',
    tag: 'Build Orchestration',
    description: 'High-speed local bundling pipelines, code splitting techniques, dynamic file loaders, and production asset tuning.',
    highlights: ['Dynamic Lazy Imports', 'Bundle Size Controls', 'Plugins & Prefetches']
  },
  {
    name: 'Git & GitHub',
    category: 'tooling-backend',
    level: 94,
    icon: 'Workflow',
    tag: 'Collaborative Dev',
    description: 'Advanced source code management, branching workflows, continuous integration hooks, and code review standards.',
    highlights: ['Rebase & Branch Hygiene', 'GitHub Actions', 'Monorepo Structuring']
  },
  {
    name: 'APIs & Cloud Integrations',
    category: 'tooling-backend',
    level: 92,
    icon: 'Cloud',
    tag: 'System Integration',
    description: 'Connecting third-party services, implementing RESTful gateways, GraphQL schemas, Firebase, or Supabase real-time sync systems.',
    highlights: ['OAuth 2.0 Integration', 'Real-time Subscriptions', 'Webhook Gateways']
  }
];

// Helper to select the correct React lucide icon dynamically
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu': return <Cpu className="w-4 h-4" />;
    case 'Workflow': return <Workflow className="w-4 h-4" />;
    case 'Globe': return <Globe className="w-4 h-4" />;
    case 'Database': return <Database className="w-4 h-4" />;
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

export default function SkillsShowcase() {
  const [activeCategory, setActiveCategory] = useState('languages');
  const [selectedSkill, setSelectedSkill] = useState<any>(SKILLS_LIST[0]);

  // Handle active category updates: auto-select the first skill of the new category
  useEffect(() => {
    const categorySkills = SKILLS_LIST.filter(s => s.category === activeCategory);
    if (categorySkills.length > 0) {
      setSelectedSkill(categorySkills[0]);
    }
  }, [activeCategory]);

  return (
    <div id="skills-showcase-container" className="relative glass-panel rounded-none border border-neutral-800 overflow-hidden shadow-2xl p-5 space-y-5">
      {/* Category selector tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-neutral-900 pb-3">
        {SKILL_CATEGORIES.map(category => (
          <button
            key={category.id}
            id={`skill-tab-${category.id}`}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-none transition-all cursor-pointer ${
              activeCategory === category.id
                ? 'bg-primaryAccent/10 border-primaryAccent text-primaryAccent font-bold'
                : 'bg-neutral-950/40 border-neutral-850 text-mutedText hover:border-neutral-700 hover:text-primaryText'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SKILLS_LIST.filter(s => s.category === activeCategory).map(skill => (
          <div
            key={skill.name}
            id={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            onClick={() => setSelectedSkill(skill)}
            className={`p-3 border transition-all cursor-pointer relative overflow-hidden group ${
              selectedSkill?.name === skill.name
                ? 'bg-neutral-950/80 border-primaryAccent/60 shadow-lg shadow-primaryAccent/5'
                : 'bg-neutral-950/30 border-neutral-850 hover:border-neutral-700 hover:bg-neutral-950/50'
            }`}
          >
            {/* Tiny decorative level indicator dot */}
            <div 
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-primaryAccent transition-colors" 
              style={selectedSkill?.name === skill.name ? { backgroundColor: 'var(--color-primaryAccent)' } : {}} 
            />
            
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-none border ${
                selectedSkill?.name === skill.name ? 'bg-primaryAccent/10 border-primaryAccent/30 text-primaryAccent' : 'bg-neutral-900 border-neutral-800 text-mutedText'
              }`}>
                {getSkillIcon(skill.icon)}
              </div>
              <div>
                <div className="font-display text-xs font-extrabold text-primaryText group-hover:text-primaryAccent transition-colors">
                  {skill.name}
                </div>
                <div className="font-mono text-[9px] text-neutral-500">
                  {skill.tag}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3 w-full bg-neutral-950 h-1 overflow-hidden rounded-none">
              <div 
                className={`h-full transition-all duration-500 ${
                  selectedSkill?.name === skill.name ? 'bg-primaryAccent' : 'bg-neutral-700'
                }`}
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Active Skill Telemetry Card */}
      {selectedSkill && (
        <div id="selected-skill-telemetry" className="p-4 bg-neutral-950/80 border border-neutral-850 relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2 py-0.5 bg-primaryAccent/10 border-b border-l border-neutral-850 text-primaryAccent font-mono text-[8px] font-bold tracking-widest uppercase">
            Skill Spec
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primaryAccent/5 border border-primaryAccent/20 text-primaryAccent">
                {getSkillIcon(selectedSkill.icon)}
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-primaryText">
                  {selectedSkill.name}
                </h4>
                <p className="font-mono text-[9px] text-primaryAccent font-medium">
                  Expertise Depth: {selectedSkill.level}%
                </p>
              </div>
            </div>

            <p className="text-mutedText/90 text-xs leading-relaxed font-sans">
              {selectedSkill.description}
            </p>

            {/* Key Capabilities */}
            <div className="space-y-1.5 border-t border-neutral-900 pt-3">
              <div className="font-mono text-[8px] text-neutral-500 font-bold uppercase tracking-widest">
                Core Competencies
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedSkill.highlights.map((h: string) => (
                  <span 
                    key={h} 
                    className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-[9px] font-mono text-mutedText"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
