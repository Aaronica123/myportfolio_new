import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import TechStackSection from './components/TechStackSection';
import { ProjectsSection } from './components/ProjectsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { QuestLog } from './components/QuestLog';
import { ContactSection } from './components/ContactSection';

// Interactive Modals & Simulators
import { ResumeModal } from './components/ResumeModal';
import { TerminalConsole } from './components/TerminalConsole';
import { JulishaModal } from './components/JulishaModal';
import { GeoHousingModal } from './components/GeoHousingModal';
import { VenevaOverhaulLab } from './components/VenevaOverhaulLab';
import { AICopilotModal } from './components/AICopilotModal';

import { soundManager } from './utils/audio';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { DEVELOPER_PROFILE } from './data/portfolioData';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Modal Dialog States
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isJulishaOpen, setIsJulishaOpen] = useState(false);
  const [isGeoHousingOpen, setIsGeoHousingOpen] = useState(false);
  const [isVenevaOpen, setIsVenevaOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  const openVenevaModal = () => {
    soundManager.playClick();
    setIsVenevaOpen(true);
  };

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-['Plus_Jakarta_Sans'] selection:bg-sky-500 selection:text-white">
      {/* Clean HUD Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Content Sections - Non-Duplicated & Clean Flow */}
      <main className="relative z-10 space-y-4">
        {/* Section 1: Overview & About Aaron Mutua */}
        <HeroSection
          onOpenVeneva={openVenevaModal}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenAI={() => setIsAIOpen(true)}
        />

        {/* Section 2: Complete 27 Tech Stack Technologies Showcase */}
        <TechStackSection />

        {/* Section 3: Featured Systems Projects & Julisha AI Platform */}
        <ProjectsSection
          onOpenVeneva={openVenevaModal}
          onOpenJulishaDemo={() => setIsJulishaOpen(true)}
          onOpenGeoHousing={() => setIsGeoHousingOpen(true)}
        />

        {/* Section 4: Official Accredited Certifications & Credentials */}
        <CertificationsSection />

        {/* Section 5: Experience, Education (MMUST & KMFRI) & Milestones */}
        <QuestLog />

        {/* Section 6: Direct Communication & Dispatch Terminal */}
        <ContactSection />
      </main>

      {/* Clean Developer Footer */}
      <footer className="border-t border-slate-800 bg-[#080c14] py-8 text-xs font-mono text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-slate-300 font-semibold font-['Chakra_Petch'] text-sm">
              Aaron Mutua · {DEVELOPER_PROFILE.title}
            </p>
            <p className="text-slate-500 text-[11px]">
              BSc IT Candidate · Masinde Muliro University of Science and Technology (MMUST) · Kenya
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <span>·</span>
            <a
              href={`https://${DEVELOPER_PROFILE.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <span>·</span>
            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer"
              title="Return to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <TerminalConsole
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenVeneva={openVenevaModal}
      />

      <JulishaModal
        isOpen={isJulishaOpen}
        onClose={() => setIsJulishaOpen(false)}
      />

      <GeoHousingModal
        isOpen={isGeoHousingOpen}
        onClose={() => setIsGeoHousingOpen(false)}
      />

      <VenevaOverhaulLab
        isOpen={isVenevaOpen}
        onClose={() => setIsVenevaOpen(false)}
      />

      <AICopilotModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onOpenVeneva={openVenevaModal}
      />
    </div>
  );
}
