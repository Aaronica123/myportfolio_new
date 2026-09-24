import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Send, CornerDownLeft, Sparkles } from 'lucide-react';
import { DEVELOPER_PROFILE, SKILL_NODES, DEV_ITEMS_LOADOUT, QUEST_LOG, VENEVA_OVERHAUL, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { TerminalLog } from '../types';
import { soundManager } from '../utils/audio';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVeneva: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({
  isOpen,
  onClose,
  onOpenVeneva,
}) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'log-0',
      command: 'sys.init',
      output: `AARONICA BASH // v2.4.0 (x86_64-systems-paladin)
Type 'help' to inspect command matrix or 'whoami' for operator profile.`,
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    soundManager.playTerminal();

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const lower = cmd.toLowerCase();
    let output = '';
    let type: TerminalLog['type'] = 'command';

    switch (lower) {
      case 'help':
        output = `AVAILABLE SYSTEM COMMANDS:
  whoami       - Display Aaron Mutua's developer dossier & callsign
  certs        - Display accredited industry certifications & credentials
  geohousing   - Explore GeoMakazi campus & national housing infrastructure AI
  c-lang       - Inspect low-level C secure systems training details
  azure        - Review Microsoft Azure Certification speedrun & DevOps
  veneva       - View Veneva 2.0 Overhaul architecture & launch lab
  julisha      - GDG Pwani Hackathon 2026 Julisha Healthcare AI
  skills       - Print active combat proficiency matrix
  inventory    - List equipped developer loot & items
  quests       - View active campaign quests & XP rewards
  contact      - Display direct communication channels
  matrix       - Initiate cyber text cascade
  clear        - Clear console buffer
  exit         - Close terminal session`;
        type = 'system';
        break;

      case 'certs':
      case 'certifications':
      case 'badges':
        output = `ACCREDITED INDUSTRY CERTIFICATIONS:
${CERTIFICATIONS_DATA.map((c) => `• [${c.issuerShort.padEnd(5)}] ${c.title} (${c.status}) - Mastery: ${c.level}%`).join('\n')}
Type 'c-lang' or 'azure' for deep dive into active specialization areas.`;
        type = 'success';
        break;

      case 'whoami':
      case 'bio':
        output = `OPERATOR: ${DEVELOPER_PROFILE.name} (${DEVELOPER_PROFILE.callsign})
ROLE: ${DEVELOPER_PROFILE.title}
LOCATION: ${DEVELOPER_PROFILE.location}
STATUS: ${DEVELOPER_PROFILE.status}
PHILOSOPHY: "${DEVELOPER_PROFILE.philosophy}"`;
        type = 'success';
        break;

      case 'c-lang':
      case 'c':
        output = `[C LANGUAGE SECURE SYSTEMS AT SCALE]
- Paradigm: Bare-metal memory management & deterministic execution
- Key Practices: Custom fixed-size chunk allocators, 0 mallocs in hot loops
- Security Armor: Buffer bounds checks, POSIX mutex thread safety, ASLR compliance
- Project: Veneva 2.0 Aegis Micro-Daemon (<1.2ms latency, 0 byte memory leak)`;
        type = 'success';
        break;

      case 'azure':
      case 'devops':
        output = `[MICROSOFT AZURE & DEVOPS OBJECTIVES]
- Target Certifications: AZ-900 (Fundamentals), AZ-104 (Administrator), AZ-400 (DevOps Solutions)
- Infrastructure: Docker multi-stage containers, GitHub Actions CI/CD pipelines
- Cloud Target: Automated Azure Container Apps & Kubernetes deployments`;
        type = 'success';
        break;

      case 'veneva':
        output = `[THE VENEVA PROJECT 2.0 OVERHAUL]
- Flaw 1 Solved: Non-blocking async worker pool replaces synchronous queue
- Flaw 2 Solved: Zero-Trust ed25519 token rotation replaces static cookies
- Flaw 3 Solved: Dual-Core C micro-daemon handles cryptography & high scale
- Flaw 4 Solved: Fluid cyber HUD responsive from mobile to 4K TV monitors!`;
        type = 'success';
        break;

      case 'julisha':
        output = `[JULISHA HEALTHCARE AI SYSTEM]
- Recognition: GDG Pwani Hackathon 2026 Gold Medal
- Mission: AI-powered multilingual healthcare management for Primary Health Centers
- Features: Swahili/English NLP, Pearson stockout-to-satisfaction engine, Biometric verification`;
        type = 'success';
        break;

      case 'geohousing':
      case 'makazi':
      case 'housing':
      case 'campus':
        output = `[GEOMAKAZI: GEOGRAPHICAL AI HOUSING PLATFORM (ONGOING INFRASTRUCTURE PROJECT)]
- Context: Kenya's 1.36 Trillion KES housing sector (8.4% GDP), 50B budget allocation
- Mission: Eradicate exhausting manual door-to-door room hunts for campus comrades & urban finders
- Architecture: React frontend, Google Maps satellite GIS, Express.js microservice (App.js, Index.js, Supabase.js)
- Database: Supabase PostgreSQL (Users, Houses, Profiles) with Google OAuth & Row-Level Security
- Storage & Caching: MinIO S3-compatible image buckets + in-memory Redis caching (<50ms response)
- AI Inspection: Automated house health & regulatory condition assessment (ventilation, mold, safety)
- Gateway & Host: Nginx reverse proxy + Railway container orchestration`;
        type = 'success';
        break;

      case 'skills':
        output = `PROFICIENCY TREE:
${SKILL_NODES.map((s) => `• ${s.name.padEnd(35)} [${s.level}%] (${s.tier})`).join('\n')}`;
        type = 'system';
        break;

      case 'inventory':
      case 'items':
        output = `TACTICAL ARSENAL:
${DEV_ITEMS_LOADOUT.map((item) => `[${item.rarity.toUpperCase()}] ${item.name} (LV.${item.level}) - ${item.category}`).join('\n')}`;
        type = 'system';
        break;

      case 'quests':
        output = `ACTIVE CAMPAIGN QUESTS:
${QUEST_LOG.map((q) => `• [${q.status}] ${q.title} (+${q.xpReward} XP, ${q.progressPct}% complete)`).join('\n')}`;
        type = 'system';
        break;

      case 'contact':
        output = `DIRECT COMM CHANNELS:
Email:    ${DEVELOPER_PROFILE.email}
Phone:    ${DEVELOPER_PROFILE.phone} (${DEVELOPER_PROFILE.phoneInternational})
GitHub:   ${DEVELOPER_PROFILE.github}
LinkedIn: https://${DEVELOPER_PROFILE.linkedin}`;
        type = 'success';
        break;

      case 'matrix':
      case 'hack':
        output = `WAKING UP THE NEO-CYBER DECK...
01000001 01000001 01010010 01001111 01001110 01001001 01000011 01000001
>>> ACCESS GRANTED: WELCOME TO AARON'S CORE SYSTEMS.`;
        type = 'easteregg';
        break;

      case 'clear':
      case 'cls':
        setLogs([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = `Command not recognized: '${cmd}'. Type 'help' to see valid commands.`;
        type = 'error';
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        command: cmd,
        output,
        timestamp: new Date().toLocaleTimeString(),
        type,
      },
    ]);

    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn font-mono">
      <div className="w-full max-w-3xl h-[520px] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            </div>
            <span className="text-sky-400 font-semibold ml-2 flex items-center gap-1.5">
              <TerminalIcon size={14} /> aaron-terminal -- v2.4.0
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[11px] hidden sm:inline">Type 'help' for command list</span>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-slate-950/60">
          {logs.map((log) => (
            <div key={log.id} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span className="text-sky-400 font-semibold">guest@aaron:~$</span>
                <span className="text-white font-semibold">{log.command}</span>
                <span className="text-[10px] ml-auto">{log.timestamp}</span>
              </div>
              <pre className={`whitespace-pre-wrap leading-relaxed pl-3 border-l-2 ${
                log.type === 'error'
                  ? 'border-red-500 text-red-400'
                  : log.type === 'success'
                  ? 'border-emerald-500 text-emerald-300'
                  : log.type === 'easteregg'
                  ? 'border-purple-500 text-purple-300'
                  : 'border-slate-700 text-slate-300'
              }`}>
                {log.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Bar */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 p-3 bg-slate-950 border-t border-slate-800"
        >
          <span className="text-sky-400 font-semibold text-xs pl-2">guest@aaron:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help', 'whoami', 'c-lang', 'azure', 'techstack'..."
            className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono placeholder:text-slate-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded bg-sky-600 text-white font-semibold text-xs hover:bg-sky-500 transition-colors cursor-pointer"
          >
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
