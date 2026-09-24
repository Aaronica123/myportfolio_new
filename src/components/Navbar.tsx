import React, { useState } from 'react';
import { Terminal, Volume2, VolumeX, Menu, X, FileText, Send, Code, Sparkles } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTerminal: () => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTerminal,
  onOpenAI,
  onOpenResume,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Streamlined, uncrowded navigation
  const navLinks = [
    { id: 'overview', label: 'About' },
    { id: 'techstack', label: 'Tech Stack (27)' },
    { id: 'projects', label: 'Projects & Julisha' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'quests', label: 'Quests & Timeline' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    soundManager.playClick();
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.enabled = next;
    setSoundEnabled(next);
    if (next) soundManager.playAchievement();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800 text-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand: Clean & Uncluttered Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('overview')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sky-400 text-sm group-hover:border-sky-500/60 transition-colors">
                AM
              </div>
              <div className="flex flex-col">
                <span className="font-['Chakra_Petch'] text-base font-bold tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  Aaron Mutua
                </span>
                <span className="text-[11px] font-mono text-slate-400 -mt-0.5">
                  Junior Developer · DevOps & Systems
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-['Chakra_Petch'] text-xs font-semibold tracking-wide uppercase">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-800 text-sky-300 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities: Clean and Minimal */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle (subtle) */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Sound FX: On' : 'Sound FX: Off'}
              className={`p-2 rounded-lg border text-xs transition-colors cursor-pointer ${
                soundEnabled
                  ? 'border-sky-600/40 bg-sky-950/40 text-sky-300'
                  : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Terminal CLI Button */}
            <button
              onClick={() => {
                soundManager.playTerminal();
                onOpenTerminal();
              }}
              title="Launch Developer CLI"
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-sky-300 hover:border-slate-700 hover:bg-slate-800 transition-all text-xs flex items-center gap-1 cursor-pointer"
            >
              <Terminal size={15} />
              <span className="hidden sm:inline font-mono text-[11px]">CLI</span>
            </button>

            {/* AI Assistant Button (subtle, non-distracting) */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAI();
              }}
              title="Ask AI Assistant about Aaron"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles size={14} className="text-sky-400" />
              <span className="hidden md:inline font-['Chakra_Petch']">AI Assistant</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-['Chakra_Petch'] font-bold tracking-wide transition-all shadow-sm cursor-pointer"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c111d] border-b border-slate-800 px-4 pt-3 pb-4 space-y-1.5 font-['Chakra_Petch']">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-colors ${
                activeTab === link.id
                  ? 'bg-slate-800 text-sky-300 font-bold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 mt-2 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded bg-sky-600 text-white text-xs font-bold"
            >
              <FileText size={14} />
              <span>View Resume</span>
            </button>
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-300"
            >
              <Terminal size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
