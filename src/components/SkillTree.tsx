import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Network, 
  Cloud, 
  Boxes, 
  GitBranch, 
  Brain, 
  Sparkles, 
  Server, 
  Cpu, 
  Database, 
  Layout, 
  CheckCircle2, 
  Zap,
  Filter,
  Code2,
  Layers,
  Globe,
  Palette,
  Send,
  Github,
  Box
} from 'lucide-react';
import { SKILL_NODES } from '../data/portfolioData';
import { SkillNode } from '../types';
import { soundManager } from '../utils/audio';

export const SkillTree: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tech Stack');

  const categories = [
    'Tech Stack',
    'All',
    'C & Systems',
    'DevOps & Cloud',
    'AI & Machine Learning',
    'Backend & Databases',
    'Frontend & Interaction',
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal size={18} />;
      case 'ShieldCheck': return <ShieldCheck size={18} />;
      case 'Network': return <Network size={18} />;
      case 'Cloud': return <Cloud size={18} />;
      case 'Boxes': return <Boxes size={18} />;
      case 'GitBranch': return <GitBranch size={18} />;
      case 'Brain': return <Brain size={18} />;
      case 'Sparkles': return <Sparkles size={18} />;
      case 'Server': return <Server size={18} />;
      case 'Cpu': return <Cpu size={18} />;
      case 'Database': return <Database size={18} />;
      case 'Layout': return <Layout size={18} />;
      case 'Code2': return <Code2 size={18} />;
      case 'Layers': return <Layers size={18} />;
      case 'Globe': return <Globe size={18} />;
      case 'Palette': return <Palette size={18} />;
      case 'Send': return <Send size={18} />;
      case 'Github': return <Github size={18} />;
      case 'Box': return <Box size={18} />;
      default: return <Zap size={18} />;
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'Training Active':
        return 'bg-amber-950/80 border-amber-500/60 text-amber-300';
      case 'Target Objective':
        return 'bg-blue-950/80 border-blue-500/60 text-blue-300';
      case 'Proficient':
        return 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300';
      default:
        return 'bg-cyan-950/80 border-cyan-500/60 text-cyan-300';
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? SKILL_NODES
    : SKILL_NODES.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-12 sm:py-16 bg-[#040916] border-t border-cyan-900/40 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-900/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-['JetBrains_Mono'] tracking-wide mb-2">
              <Zap size={13} className="text-cyan-400" />
              <span>TECHNICAL CAPABILITIES & PROFICIENCY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Chakra_Petch'] text-white">
              Skill Tree & <span className="text-cyan-400">Combat Proficiencies</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              From bare-metal C systems programming and containerized DevOps automation to machine learning pipelines and modern reactive web engineering.
            </p>
          </div>

          {/* Quick Mastery Tally */}
          <div className="flex items-center gap-3 font-['JetBrains_Mono'] text-xs">
            <div className="p-2.5 rounded-lg bg-[#061224] border border-cyan-900/50">
              <span className="text-slate-400 block text-[10px]">TOTAL NODES</span>
              <strong className="text-cyan-300 text-base font-bold">{SKILL_NODES.length} Skills Active</strong>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-['Chakra_Petch'] font-bold tracking-wide uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Node Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="rounded-xl border border-cyan-900/40 hover:border-cyan-500/60 bg-[#061224] p-5 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,180,216,0.12)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
                  {getIcon(skill.icon)}
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-['JetBrains_Mono'] font-bold uppercase px-2 py-0.5 rounded border ${getTierBadge(skill.tier)}`}>
                    {skill.tier}
                  </span>
                  <div className="text-xs font-['Chakra_Petch'] font-bold text-cyan-300 mt-1">
                    {skill.level}%
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <div>
                <h3 className="font-['Chakra_Petch'] font-bold text-base text-white">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-['JetBrains_Mono'] text-slate-400">
                  {skill.category}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-blue-400 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {skill.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-cyan-950/80">
                {skill.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
