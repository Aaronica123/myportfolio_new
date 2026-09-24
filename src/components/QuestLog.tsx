import React from 'react';
import { 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Award
} from 'lucide-react';
import { QUEST_LOG, EDUCATION_AND_EXPERIENCE } from '../data/portfolioData';

export const QuestLog: React.FC = () => {
  return (
    <section id="quests" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold block mb-1">
              Campaign Objectives & Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
              Experience & Milestone Quests
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Track progress across professional certifications, hackathon victories, academic credentials, and enterprise attache milestones.
            </p>
          </div>

          <div className="font-mono text-xs text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Active Milestone Tracking</span>
          </div>
        </div>

        {/* Quests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUEST_LOG.map((quest) => {
            const isCompleted = quest.status === 'Completed';
            return (
              <div
                key={quest.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/70 hover:border-slate-700 p-5 space-y-3 transition-all duration-150 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-sky-400 font-semibold">
                        [{quest.type.toUpperCase()}]
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isCompleted 
                          ? 'bg-slate-800 border-slate-700 text-emerald-400' 
                          : 'bg-slate-800 border-slate-700 text-amber-400'
                      }`}>
                        {quest.status}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      +{quest.xpReward} XP
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Chakra_Petch'] font-bold text-lg text-white">
                    {quest.title}
                  </h3>

                  {/* Objective */}
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {quest.objective}
                  </p>

                  {/* Milestones / Deliverables */}
                  <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1.5 text-xs">
                    <span className="text-slate-400 font-mono text-[10px] uppercase block font-semibold">
                      Deliverables & Objectives:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {quest.deliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className={`shrink-0 mt-0.5 ${isCompleted ? 'text-emerald-400' : 'text-amber-400'}`} />
                          <span className="leading-normal">{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>BADGE: {quest.badge}</span>
                  <span className={isCompleted ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                    {isCompleted ? '✓ VERIFIED' : '⏳ IN PROGRESS'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Education & Experience Detailed Section */}
        <div className="pt-6 border-t border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold block mb-1">
              Curriculum Vitae Timeline
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Chakra_Petch'] text-white">
              Education & Professional Attache
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION_AND_EXPERIENCE.map((item, idx) => {
              const isEducation = item.type === 'education';
              return (
                <div key={idx} className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                        {isEducation ? <GraduationCap size={20} /> : <Briefcase size={20} />}
                      </div>
                      <div>
                        <h4 className="font-['Chakra_Petch'] font-bold text-base text-white">
                          {item.role}
                        </h4>
                        <p className="text-xs font-mono text-slate-400">
                          {item.institution}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-sky-300">
                      {item.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1.5">
                    <span className="text-slate-400 font-mono text-[10px] uppercase block font-semibold">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {item.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
