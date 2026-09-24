import React, { useState } from 'react';
import { 
  Code2, 
  Sparkles, 
  Award, 
  FolderGit2, 
  GraduationCap, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Boxes,
  ArrowUpRight
} from 'lucide-react';
import TechStackSection from './TechStackSection';
import { 
  DEVELOPER_PROFILE, 
  FEATURED_PROJECTS, 
  CERTIFICATIONS_DATA, 
  EDUCATION_AND_EXPERIENCE 
} from '../data/portfolioData';
import { ResumeModal } from './ResumeModal';

export default function PortfolioView() {
  const [activeTab, setActiveTab] = useState('tech-stack');
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="space-y-8 animate-fadeIn font-['Plus_Jakarta_Sans'] pb-12">
      {/* Top Profile Dossier Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-lg shadow-indigo-600/20 shrink-0">
              AM
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {DEVELOPER_PROFILE.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  <span>Open for Opportunities</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold text-indigo-600">
                {DEVELOPER_PROFILE.title}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-rose-500 shrink-0" />
                  <span>Kakamega / Nairobi, Kenya</span>
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <GraduationCap size={13} className="text-indigo-600 shrink-0" />
                  <span>Masinde Muliro Univ (MMUST)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <FileText size={15} />
              <span>Inspect CV / Resume</span>
            </button>

            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>

            <a
              href={DEVELOPER_PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-indigo-600 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>

            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-emerald-600 transition-colors"
              title="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Bio summary */}
        <p className="mt-5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl border-t border-slate-100 pt-4">
          {DEVELOPER_PROFILE.bio}
        </p>
      </div>

      {/* Portfolio Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('tech-stack')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'tech-stack'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Code2 size={15} />
          <span>Tech Stack (27 Core)</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'projects'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FolderGit2 size={15} />
          <span>Key Projects</span>
        </button>

        <button
          onClick={() => setActiveTab('certifications')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'certifications'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Award size={15} />
          <span>Certifications & Education</span>
        </button>
      </div>

      {/* Tab 1: Tech Stack Category (Default & Core Focus) */}
      {activeTab === 'tech-stack' && (
        <TechStackSection />
      )}

      {/* Tab 2: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="p-4 bg-white rounded-2xl border border-slate-200">
            <h3 className="font-extrabold text-lg text-slate-900">Featured Architectures & Systems</h3>
            <p className="text-xs text-slate-500 mt-0.5">High-scale applications designed for real-world Kenyan infrastructure and healthcare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {proj.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.summary}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide block">Tech Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-semibold text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {proj.githubUrl && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>View GitHub Repository</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Certifications & Education */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 hover:border-indigo-300 hover:shadow-xs transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                      <Award size={20} />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{cert.title}</h4>
                      <span className="text-xs text-indigo-600 font-semibold">{cert.issuer}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {cert.status}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                  {cert.skillsVerified.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-slate-600">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4">
            <h4 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
              <GraduationCap size={18} className="text-indigo-600" />
              <span>Academic Background & Work History</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_AND_EXPERIENCE.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-indigo-700 border border-slate-200">
                      {item.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{item.period}</span>
                  </div>
                  <h5 className="font-extrabold text-sm text-slate-900">{item.institution}</h5>
                  <p className="text-xs font-semibold text-indigo-600">{item.role}</p>
                  <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                    {item.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
