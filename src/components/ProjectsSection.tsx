import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Compass
} from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { ProjectDetail } from '../types';
import { soundManager } from '../utils/audio';

interface ProjectsSectionProps {
  onOpenVeneva: () => void;
  onOpenJulishaDemo: () => void;
  onOpenGeoHousing: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onOpenVeneva,
  onOpenJulishaDemo,
  onOpenGeoHousing,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ongoing Project':
      case 'Active Development':
        return 'bg-slate-800 text-emerald-400 border-slate-700';
      case 'Active Overhaul':
        return 'bg-slate-800 text-sky-400 border-slate-700';
      case 'Production / Hackathon':
        return 'bg-slate-800 text-amber-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold block mb-1">
              Production Architectures
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
              Featured Engineering Projects
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Real-world systems solving operational challenges, enterprise ticketing flows, and clinical healthcare delivery.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => {
                soundManager.playAchievement();
                onOpenGeoHousing();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-['Chakra_Petch'] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Compass size={14} className="text-emerald-400" />
              <span>GeoMakazi Housing</span>
            </button>

            <button
              onClick={() => {
                soundManager.playAchievement();
                onOpenJulishaDemo();
              }}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-['Chakra_Petch'] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Award size={14} />
              <span>Julisha AI Demo</span>
            </button>
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEATURED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 p-6 space-y-4 flex flex-col justify-between transition-all duration-150 group"
            >
              <div className="space-y-3">
                {/* Top Status & Category */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded border ${getStatusBadge(proj.status)}`}>
                    {proj.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {proj.category}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-['Chakra_Petch'] font-bold text-xl text-white group-hover:text-sky-300 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs font-mono text-sky-400 font-medium">
                  {proj.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {proj.summary}
                </p>

                {/* Architecture Highlights */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                  <strong className="text-slate-300 block font-['Chakra_Petch'] text-xs uppercase">
                    Core Technical Scope:
                  </strong>
                  <ul className="space-y-1 text-slate-400 text-[11px] list-disc list-inside">
                    {proj.keyFeatures.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="leading-normal">{feat}</li>
                    ))}
                  </ul>
                </div>

                {/* Metrics Badges */}
                {proj.metrics && (
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {proj.metrics.map((m, i) => (
                      <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 text-center font-mono">
                        <span className="text-[10px] text-slate-400 block">{m.label}</span>
                        <strong className="text-sky-300 font-bold text-xs sm:text-sm">{m.value}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Tech Stack & Action Links */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  {proj.id === 'geospatial-housing' ? (
                    <button
                      onClick={() => {
                        soundManager.playAchievement();
                        onOpenGeoHousing();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-['Chakra_Petch'] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      <Compass size={14} />
                      <span>GeoMakazi Blueprint & Demo</span>
                      <ArrowRight size={13} />
                    </button>
                  ) : proj.id === 'veneva-2' ? (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onOpenVeneva();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-['Chakra_Petch'] font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                    >
                      <span>Veneva 2.0 Lab & Benchmark</span>
                      <ArrowRight size={13} />
                    </button>
                  ) : proj.id === 'julisha-system' ? (
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onOpenJulishaDemo();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-['Chakra_Petch'] font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      <Play size={13} />
                      <span>Launch Julisha Interactive Demo</span>
                    </button>
                  ) : (
                    <a
                      href="https://github.com/Aaronica123/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-['Chakra_Petch'] font-semibold text-slate-300 hover:text-white transition-colors"
                    >
                      <Github size={13} />
                      <span>Inspect Source Code</span>
                    </a>
                  )}

                  {proj.gameLootUnlocked && (
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Sparkles size={11} className="text-amber-400" />
                      <span>{proj.gameLootUnlocked}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
