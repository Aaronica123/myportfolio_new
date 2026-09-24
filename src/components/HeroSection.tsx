import React from 'react';
import { ArrowRight, Github, Linkedin, Mail, Phone, MapPin, Award, FileText, Code2, ExternalLink, Terminal } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface HeroSectionProps {
  onOpenVeneva: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenAI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenVeneva,
  onOpenTerminal,
  onOpenResume,
  onOpenAI,
}) => {
  const scrollToTechStack = () => {
    soundManager.playClick();
    const el = document.getElementById('techstack');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    soundManager.playClick();
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    soundManager.playClick();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="overview" className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      {/* Subtle ambient gradient - non-distracting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-slate-800/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-sky-950/15 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header / Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Aaron's Name, Title & Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for Junior Developer & DevOps Roles</span>
            </div>

            {/* Name and Title - Clean, Bold, Uncrowded */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-['Chakra_Petch'] text-white tracking-tight leading-tight">
                Aaron Mutua
              </h1>
              <p className="text-lg sm:text-xl font-medium text-sky-400 font-['Chakra_Petch']">
                Junior Developer · DevOps & Backend Enthusiast · Gamer
              </p>
            </div>

            {/* Professional Summary from CV */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              I am an enthusiastic, adaptable developer ready to learn, collaborate with experts, and build dependable solutions for real-world problems. Currently pursuing my Bachelor of Science in Information Technology at <strong className="text-white">Masinde Muliro University</strong> (Class of 2027), undertaking training aiming for <strong className="text-white">AWS & DevOps</strong> certifications, and creator of the award-winning <strong className="text-white">Julisha AI</strong> healthcare management platform.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={scrollToTechStack}
                className="px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-['Chakra_Petch'] font-bold text-xs uppercase tracking-wide transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>View Tech Stack (27)</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={scrollToProjects}
                className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Projects</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={15} />
                <span>CV / Resume</span>
              </button>

              <button
                onClick={scrollToContact}
                className="px-4 py-2.5 rounded-lg bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-white font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                Get In Touch
              </button>
            </div>

            {/* Contact & Social Links */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-mono text-slate-400">
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Github size={15} />
                <span>Aaronica123</span>
              </a>
              <a
                href={`https://${DEVELOPER_PROFILE.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Mail size={15} />
                <span>{DEVELOPER_PROFILE.email}</span>
              </a>
              <a
                href={`tel:${DEVELOPER_PROFILE.phone}`}
                className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
              >
                <Phone size={15} />
                <span>{DEVELOPER_PROFILE.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Subtle, Sleek Developer & Gamer Dossier Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-5 text-slate-300">
              
              {/* Card Header: Developer & Gamer Identity */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 text-lg font-['Chakra_Petch']">
                    AM
                  </div>
                  <div>
                    <h2 className="font-['Chakra_Petch'] font-bold text-white text-base">
                      Developer Profile
                    </h2>
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <MapPin size={12} /> Kakamega & Nairobi, Kenya
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-sky-300 font-semibold">
                    Gamer · Dev
                  </span>
                </div>
              </div>

              {/* Education & Attache Highlights */}
              <div className="space-y-3 text-xs">
                
                {/* University */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Education · 2023 - 2027
                  </span>
                  <strong className="text-white text-xs block font-semibold">
                    BSc in Information Technology
                  </strong>
                  <p className="text-slate-400 text-[11px]">
                    Masinde Muliro University of Science and Technology (MMUST)
                  </p>
                </div>

                {/* Attache Experience */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Experience · May 2026 - Aug 2026
                  </span>
                  <strong className="text-white text-xs block font-semibold">
                    Attache, Kenya Marine Fisheries Research Institute
                  </strong>
                  <p className="text-slate-400 text-[11px]">
                    Engineered company ticketing system & identified system flow enhancements.
                  </p>
                </div>

                {/* Major Achievement */}
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 flex items-start gap-2.5">
                  <Award size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <strong className="text-white text-xs block font-semibold">
                      Winner · GDG Pwani Hackathon 2026
                    </strong>
                    <p className="text-slate-400 text-[11px]">
                      Created Julisha: Multilingual AI healthcare management platform.
                    </p>
                  </div>
                </div>

              </div>

              {/* Subtle Core Proficiencies Bar */}
              <div className="pt-2 border-t border-slate-800 space-y-2 font-mono text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Backend & Systems</span>
                  <span className="text-slate-300">Python · Django · Node.js · C</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>DevOps & Infra</span>
                  <span className="text-slate-300">Docker · CI/CD · Cloud</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Databases</span>
                  <span className="text-slate-300">Postgres · Supabase · Redis · Mongo</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
