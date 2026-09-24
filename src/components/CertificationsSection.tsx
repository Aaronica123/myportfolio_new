import React, { useState } from 'react';
import { 
  Award, 
  ShieldAlert, 
  Globe, 
  Cpu, 
  Code2, 
  Cloud, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  X,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/portfolioData';
import { Certification } from '../types';
import { soundManager } from '../utils/audio';

export const CertificationsSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'verified' | 'aspiring'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert size={20} className="text-sky-400" />;
      case 'Globe': return <Globe size={20} className="text-emerald-400" />;
      case 'Cpu': return <Cpu size={20} className="text-indigo-400" />;
      case 'Code2': return <Code2 size={20} className="text-amber-400" />;
      case 'Cloud': return <Cloud size={20} className="text-sky-400" />;
      default: return <Award size={20} className="text-sky-400" />;
    }
  };

  const filteredCerts = CERTIFICATIONS_DATA.filter((c) => {
    if (filter === 'verified') return c.status === 'Verified & Active';
    if (filter === 'aspiring') return c.status === 'Target Objective';
    return true;
  });

  const verifiedCount = CERTIFICATIONS_DATA.filter((c) => c.status === 'Verified & Active').length;

  return (
    <section id="certifications" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-wider font-semibold block mb-1">
              Accredited Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Chakra_Petch'] text-white">
              Official Certifications & Badges
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Industry-standard certifications validating cybersecurity, enterprise web architecture, software engineering, and cloud automation.
            </p>
          </div>

          {/* Metrics summary */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Verified Active</span>
                <strong className="text-white font-bold">{verifiedCount} Badges</strong>
              </div>
            </div>

            <div className="px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2">
              <Cloud size={16} className="text-sky-400" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Cloud Roadmap</span>
                <strong className="text-white font-bold">AWS & Azure</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Credentials' },
              { id: 'verified', label: 'Verified & Active' },
              { id: 'aspiring', label: 'Target Cloud Path' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setFilter(tab.id as unknown as typeof filter);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-['Chakra_Petch'] font-semibold tracking-wide uppercase transition-colors cursor-pointer ${
                  filter === tab.id
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
            Click any certificate to inspect syllabus & validated skills
          </span>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCerts.map((cert) => {
            const isVerified = cert.status === 'Verified & Active';

            return (
              <div
                key={cert.id}
                onClick={() => {
                  soundManager.playAchievement();
                  setSelectedCert(cert);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className="rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 p-5 space-y-3.5 cursor-pointer transition-all duration-150 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Row: Issuer & Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                        {getIcon(cert.badgeIcon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 inline-block">
                          {cert.issuer}
                        </span>
                        <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1">
                          {isVerified ? (
                            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                              <CheckCircle2 size={12} /> {cert.status}
                            </span>
                          ) : (
                            <span className="text-amber-400 flex items-center gap-1 font-semibold">
                              <Sparkles size={12} /> {cert.status}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-sky-400 block">
                        Level {cert.level}%
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase">
                        {cert.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-['Chakra_Petch'] font-bold text-lg text-white group-hover:text-sky-300 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1 font-normal line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  {/* Validated Skills */}
                  <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                      Validated Capabilities:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cert.skillsVerified.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                      {cert.skillsVerified.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          +{cert.skillsVerified.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/60">
                  <span>ID: VERIFIED</span>
                  <span className="text-slate-400 group-hover:text-sky-400 flex items-center gap-0.5 transition-colors font-semibold">
                    View Syllabus <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Credential Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl relative text-slate-200">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                  {getIcon(selectedCert.badgeIcon)}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 inline-block">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="font-['Chakra_Petch'] font-bold text-xl text-white mt-0.5">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <strong className="text-slate-300 font-semibold uppercase block text-[11px]">
                    Credential Overview:
                  </strong>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    {selectedCert.description}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block font-semibold">
                    Curriculum & Skills Evaluated:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {selectedCert.skillsVerified.map((skill, idx) => (
                      <div key={idx} className="p-2 rounded bg-slate-800/80 border border-slate-700/60 flex items-center gap-1.5 font-mono text-[11px]">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                        <span className="text-slate-200">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-center justify-between font-mono text-[11px] text-slate-400">
                  <span>Issued Date: {selectedCert.issueDate}</span>
                  <span className="text-emerald-400 font-semibold">Status: {selectedCert.status}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="mt-5 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-colors cursor-pointer"
              >
                Close Credential
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
