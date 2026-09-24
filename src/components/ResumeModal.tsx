import React from 'react';
import { X, Printer, Mail, Phone, MapPin, Github, Linkedin, Award, Briefcase, GraduationCap, FolderGit2 } from 'lucide-react';
import { DEVELOPER_PROFILE, EDUCATION_AND_EXPERIENCE } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold font-mono text-xs">
              CV
            </div>
            <div>
              <h3 className="font-['Chakra_Petch'] font-bold text-base text-white">
                Aaron Mutua · Curriculum Vitae
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Masinde Muliro University · Kenya
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center gap-1.5 text-xs font-mono transition-colors cursor-pointer"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm bg-slate-950/60">
          {/* Header Info */}
          <div className="border-b border-slate-800 pb-5 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
              AARON MUTUA
            </h1>
            <p className="text-sky-400 font-mono font-semibold text-sm">
              Junior Developer · Systems & DevOps Enthusiast
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <Mail size={13} className="text-slate-400" /> {DEVELOPER_PROFILE.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-slate-400" /> {DEVELOPER_PROFILE.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-slate-400" /> Kakamega / Nairobi, Kenya
              </span>
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sky-400 hover:underline"
              >
                <Github size={13} /> github.com/Aaronica123
              </a>
            </div>
          </div>

          {/* Professional Summary from CV */}
          <div className="space-y-2">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider">
              PROFESSIONAL OBJECTIVE & PROFILE
            </h2>
            <p className="text-slate-300 leading-relaxed font-normal">
              I am an enthusiastic, adaptable developer ready to learn and interact with experts to perfect my skills and sharpen my career. Currently pursuing a Bachelor of Science in Information Technology at Masinde Muliro University of Science and Technology (MMUST), undertaking training aiming for AWS certifications to become a professional DevOps Engineer, and engineering platforms like the Julisha AI healthcare management platform and low-level systems architectures.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <GraduationCap size={15} /> EDUCATION
            </h2>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Masinde Muliro University of Science and Technology (MMUST)</span>
                <span className="font-mono text-xs text-slate-400">Sep 2023 – April 2027</span>
              </div>
              <p className="text-sky-300 text-xs font-mono">
                Bachelor of Science in Information Technology (Continuing student)
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Coursework: Systems Programming, Operating Systems, Database Management Systems, Data Structures & Algorithms, Network Security, Cloud Computing.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <Briefcase size={15} /> WORK & ATTACHE EXPERIENCE
            </h2>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Kenya Marine and Fisheries Research Institute (KMFRI)</span>
                <span className="font-mono text-xs text-slate-400">May 2026 – Aug 2026</span>
              </div>
              <p className="text-emerald-400 text-xs font-mono">
                Attache · Information Technology & Systems
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                <li>Understood corporate undertakings and organizational process flows.</li>
                <li>Proposed an improvement on current system flaws and workflow delays.</li>
                <li>Collaborated with staff in creating the company ticketing system.</li>
              </ul>
            </div>
          </div>

          {/* 27 Technologies Tech Stack */}
          <div className="space-y-3">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <Award size={15} /> TECHNICAL PROFICIENCIES (27 TECHNOLOGIES)
            </h2>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {[
                  'C', 'Python', 'React Router', 'RabbitMQ', 'React', 'NodeJS',
                  'Django', 'Vite', 'Express.js', 'Flask', 'HTML5', 'JavaScript',
                  'CSS3', 'Nginx', 'Supabase', 'Postgres', 'Redis', 'MongoDB',
                  'MySQL', 'MicrosoftSQLServer', 'Figma', 'Git', 'GitHub',
                  'GitHub Actions', 'Jest', 'Docker', 'Postman'
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <FolderGit2 size={15} /> FEATURED PROJECTS
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-white font-semibold">Julisha System: Multilingual AI Healthcare Platform</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">GDG Pwani Winner 2026</span>
                </div>
                <p className="text-slate-300 text-xs">
                  A multilingual AI-powered healthcare management platform designed for Primary Healthcare Centers and Community Health Centers, created during the Google Developers Group (GDG) Pwani Hackathon 2026.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <strong className="text-white font-semibold">GeoMakazi: Campus Housing & Geospatial System</strong>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">Production Ready</span>
                </div>
                <p className="text-slate-300 text-xs">
                  Student housing platform connecting campus comrades to verified bedsitters and apartments without middleman fees. Powered by React, Supabase, Redis, and satellite GIS.
                </p>
              </div>
            </div>
          </div>

          {/* Industry Certifications */}
          <div className="space-y-3">
            <h2 className="font-['Chakra_Petch'] font-bold text-xs uppercase text-sky-400 tracking-wider flex items-center gap-2">
              <Award size={15} /> CERTIFICATIONS & BADGES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-white block">Introduction to Cybersecurity</span>
                <p className="text-slate-400 text-[11px]">Cisco Networking Academy · Verified</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-white block">Web Fundamentals</span>
                <p className="text-slate-400 text-[11px]">IBM SkillsBuild · Verified</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-white block">IT Fundamentals</span>
                <p className="text-slate-400 text-[11px]">IBM SkillsBuild · Verified</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-semibold text-white block">Software Development</span>
                <p className="text-slate-400 text-[11px]">Power Learn Project (PLP) · Verified</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
