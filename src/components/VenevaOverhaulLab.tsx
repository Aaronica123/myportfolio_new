import React, { useState } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  RefreshCw, 
  Terminal, 
  Sliders, 
  TrendingUp, 
  Lock, 
  Smartphone, 
  Monitor, 
  Tv, 
  Tablet, 
  Code,
  Gauge,
  X
} from 'lucide-react';
import { VENEVA_OVERHAUL } from '../data/portfolioData';
import { soundManager } from '../utils/audio';

interface VenevaOverhaulLabProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const VenevaOverhaulLab: React.FC<VenevaOverhaulLabProps> = ({ isOpen, onClose }) => {
  if (isOpen !== undefined && !isOpen) return null;
  const [activeTab, setActiveTab] = useState<'flaws' | 'language' | 'auth' | 'simulator' | 'responsive'>('simulator');
  
  // Simulator State
  const [engine, setEngine] = useState<'c_daemon' | 'node_ts' | 'legacy'>('c_daemon');
  const [concurrency, setConcurrency] = useState<number>(10000);
  const [authMode, setAuthMode] = useState<'zero_trust' | 'legacy'>('zero_trust');
  const [pipelineMode, setPipelineMode] = useState<'async_pool' | 'legacy_blocking'>('async_pool');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simResults, setSimResults] = useState<{
    throughput: number;
    latency: number;
    memory: number;
    cpu: number;
    leaks: number;
    security: string;
    status: string;
    logs: string[];
  }>({
    throughput: 18450,
    latency: 0.78,
    memory: 24.2,
    cpu: 13.8,
    leaks: 0,
    security: 'A+ (Cryptographically Hardened)',
    status: 'OPTIMAL: Zero-Contention Event Loop',
    logs: [
      '[SYSTEM] Initialized Veneva 2.0 Aegis C-Daemon.',
      '[KERNEL] Bound epoll listener to socket descriptor. 8 worker threads active.',
      '[MEMORY] Allocated deterministic 4096-byte chunk pool. 0 mallocs in hot loop.',
      '[AUTH] Verified ed25519 token signature. Ephemeral key rotation armed.',
      '[BENCHMARK] Dispatched 10,000 transactions: Completed in 542ms (18,450 req/s).',
    ],
  });

  // Responsive device view preview state
  const [selectedDevice, setSelectedDevice] = useState<'phone' | 'tablet' | 'laptop' | 'tv'>('laptop');

  const runSimulation = async () => {
    soundManager.playClick();
    setIsSimulating(true);

    try {
      const response = await fetch('/api/veneva/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ engine, concurrency, authMode, pipelineMode }),
      });

      if (response.ok) {
        const data = await response.json();
        setSimResults({
          throughput: data.throughputReqSec,
          latency: data.latencyP99Ms,
          memory: data.memoryFootprintMb,
          cpu: data.cpuUsagePct,
          leaks: data.memoryLeaksBytes,
          security: data.securityScore,
          status: data.processStatus,
          logs: data.logs,
        });
      } else {
        throw new Error('Fallback simulation');
      }
    } catch {
      // Local deterministic calculation if server unavailable
      let t = engine === 'c_daemon' ? 18500 : engine === 'node_ts' ? 3400 : 410;
      let l = engine === 'c_daemon' ? 0.8 : engine === 'node_ts' ? 12.5 : 180;
      if (pipelineMode === 'legacy_blocking') {
        t = Math.round(t * 0.25);
        l += 140;
      }
      setSimResults({
        throughput: t,
        latency: l,
        memory: engine === 'c_daemon' ? 24 : engine === 'node_ts' ? 175 : 850,
        cpu: engine === 'c_daemon' ? 14 : engine === 'node_ts' ? 48 : 95,
        leaks: engine === 'legacy' ? 4194304 : 0,
        security: authMode === 'zero_trust' ? 'A+ (Zero-Trust ed25519)' : 'D- (Vulnerable Session)',
        status: pipelineMode === 'async_pool' ? 'OPTIMAL: Asynchronous Worker Stream' : 'DEGRADED: Blocking Pipeline Stalled',
        logs: [
          `[SIM] Dispatched ${concurrency.toLocaleString()} requests through ${engine.toUpperCase()} engine.`,
          `[AUTH] Auth mode: ${authMode}. Validation completed.`,
          `[RESULT] Throughput: ${t.toLocaleString()} req/sec with P99 latency of ${l}ms.`,
        ],
      });
    } finally {
      setIsSimulating(false);
      soundManager.playAchievement();
    }
  };

  return (
    <section id="veneva" className="py-12 sm:py-16 bg-[#040b17] border-y border-cyan-900/40 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-900/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 text-xs font-['JetBrains_Mono'] tracking-wide mb-2">
              <Zap size={14} className="text-cyan-400" />
              <span>FLAGSHIP ARCHITECTURAL REDESIGN</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Chakra_Petch'] text-white">
              The Veneva Project <span className="text-cyan-400">2.0 Overhaul</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-1">
              Comprehensive re-engineering: eliminating legacy process flaws, benchmarking a high-throughput C micro-daemon vs. modern JavaScript, implementing military-grade Zero-Trust authentication, and delivering an adaptable cyber UI.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex flex-wrap items-center gap-2 font-['JetBrains_Mono'] text-xs">
            <div className="px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 flex items-center gap-1.5 font-bold">
              <TrendingUp size={14} /> +840% Throughput
            </div>
            <div className="px-3 py-1.5 rounded bg-blue-950/80 border border-blue-500/50 text-blue-300 flex items-center gap-1.5 font-bold">
              <ShieldCheck size={14} /> Zero-Trust Auth
            </div>
            <div className="px-3 py-1.5 rounded bg-amber-950/80 border border-amber-500/50 text-amber-300 flex items-center gap-1.5 font-bold">
              <Gauge size={14} /> Sub-Millisecond Latency
            </div>
          </div>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-cyan-950 pb-2">
          {[
            { id: 'simulator', label: 'Interactive Simulator', icon: Play },
            { id: 'flaws', label: 'Process Flaw Diagnosis', icon: AlertTriangle },
            { id: 'language', label: 'C vs JavaScript Benchmark', icon: Cpu },
            { id: 'auth', label: 'Zero-Trust Authentication', icon: Lock },
            { id: 'responsive', label: 'Multi-Screen Adaptive UI', icon: Smartphone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as unknown as typeof activeTab);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-['Chakra_Petch'] font-bold tracking-wide uppercase flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: INTERACTIVE ARCHITECTURAL SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Simulator Controls */}
            <div className="lg:col-span-5 bg-[#061224] rounded-2xl border border-cyan-800/60 p-5 space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
                <span className="font-['Chakra_Petch'] font-bold text-sm text-cyan-300 flex items-center gap-2">
                  <Sliders size={16} /> ARCHITECTURE BENCHMARK CONTROLLER
                </span>
                <span className="text-[11px] font-['JetBrains_Mono'] text-slate-400">VENEVA 2.0 LAB</span>
              </div>

              {/* Engine Selection */}
              <div className="space-y-2">
                <label className="text-xs font-['JetBrains_Mono'] text-slate-300 uppercase font-semibold flex items-center justify-between">
                  <span>Language / Execution Core</span>
                  <span className="text-cyan-400 font-normal">
                    {engine === 'c_daemon' ? 'C Low-Level Daemon' : engine === 'node_ts' ? 'Node.js / TypeScript' : 'Legacy Engine'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setEngine('c_daemon')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-center border transition-all ${
                      engine === 'c_daemon'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚡ C Daemon
                  </button>
                  <button
                    onClick={() => setEngine('node_ts')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-center border transition-all ${
                      engine === 'node_ts'
                        ? 'bg-blue-950 border-blue-400 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.4)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    🚀 Node.js / TS
                  </button>
                  <button
                    onClick={() => setEngine('legacy')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-center border transition-all ${
                      engine === 'legacy'
                        ? 'bg-red-950 border-red-500 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚠️ Legacy Monolith
                  </button>
                </div>
              </div>

              {/* Pipeline Architecture Mode */}
              <div className="space-y-2">
                <label className="text-xs font-['JetBrains_Mono'] text-slate-300 uppercase font-semibold">
                  Process Pipeline Architecture
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPipelineMode('async_pool')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-left border transition-all ${
                      pipelineMode === 'async_pool'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-white font-bold">2.0 Async Worker Pool</div>
                    <div className="text-[10px] text-slate-400 font-normal">Non-blocking event stream</div>
                  </button>
                  <button
                    onClick={() => setPipelineMode('legacy_blocking')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-left border transition-all ${
                      pipelineMode === 'legacy_blocking'
                        ? 'bg-red-950 border-red-500 text-red-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-white font-bold">Legacy Blocking Queue</div>
                    <div className="text-[10px] text-slate-400 font-normal">Synchronous bottleneck</div>
                  </button>
                </div>
              </div>

              {/* Authentication Protocol Mode */}
              <div className="space-y-2">
                <label className="text-xs font-['JetBrains_Mono'] text-slate-300 uppercase font-semibold">
                  Authentication Standard
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAuthMode('zero_trust')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-left border transition-all ${
                      authMode === 'zero_trust'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-white font-bold">Zero-Trust JWT + Bio</div>
                    <div className="text-[10px] text-slate-400 font-normal">Rotating ed25519 signatures</div>
                  </button>
                  <button
                    onClick={() => setAuthMode('legacy')}
                    className={`p-2.5 rounded text-xs font-['Chakra_Petch'] font-bold text-left border transition-all ${
                      authMode === 'legacy'
                        ? 'bg-red-950 border-red-500 text-red-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-white font-bold">Legacy Cookie Token</div>
                    <div className="text-[10px] text-slate-400 font-normal">Static unencrypted state</div>
                  </button>
                </div>
              </div>

              {/* Concurrency Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-slate-300">Simulated Concurrency:</span>
                  <span className="text-cyan-400 font-bold">{concurrency.toLocaleString()} users</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={concurrency}
                  onChange={(e) => setConcurrency(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1,000 (Burst)</span>
                  <span>10,000 (Load)</span>
                  <span>50,000 (Stress Test)</span>
                </div>
              </div>

              {/* Trigger Benchmark Button */}
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="w-full py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 text-black font-['Chakra_Petch'] font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>RUNNING COMPREHENSIVE BENCHMARK...</span>
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    <span>EXECUTE VENEVA 2.0 BENCHMARK</span>
                  </>
                )}
              </button>
            </div>

            {/* Benchmark Live Telemetry HUD */}
            <div className="lg:col-span-7 space-y-4">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#061224] border border-cyan-800/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 uppercase block">Throughput</span>
                  <div className="text-xl sm:text-2xl font-bold text-cyan-300 mt-1 font-['Chakra_Petch']">
                    {simResults.throughput.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-500">req / second</span>
                </div>

                <div className="p-3 rounded-xl bg-[#061224] border border-cyan-800/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 uppercase block">P99 Latency</span>
                  <div className={`text-xl sm:text-2xl font-bold mt-1 font-['Chakra_Petch'] ${
                    simResults.latency < 2 ? 'text-emerald-400' : simResults.latency < 50 ? 'text-cyan-300' : 'text-red-400'
                  }`}>
                    {simResults.latency}ms
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {simResults.latency < 2 ? 'Bare-metal speed' : 'Network bounded'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#061224] border border-cyan-800/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 uppercase block">RAM Usage</span>
                  <div className="text-xl sm:text-2xl font-bold text-blue-300 mt-1 font-['Chakra_Petch']">
                    {simResults.memory} MB
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {engine === 'c_daemon' ? 'Deterministic heap' : 'V8 GC heap'}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#061224] border border-cyan-800/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 uppercase block">Memory Leaks</span>
                  <div className={`text-xl sm:text-2xl font-bold mt-1 font-['Chakra_Petch'] ${
                    simResults.leaks === 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {simResults.leaks === 0 ? '0 Bytes' : '4.19 MB!'}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {simResults.leaks === 0 ? 'Valgrind Clean' : 'Unbounded cache'}
                  </span>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3.5 rounded-xl border flex items-center justify-between font-['JetBrains_Mono'] text-xs ${
                simResults.status.includes('DEGRADED')
                  ? 'bg-red-950/60 border-red-500/60 text-red-200'
                  : 'bg-cyan-950/60 border-cyan-500/60 text-cyan-200'
              }`}>
                <div className="flex items-center gap-2">
                  {simResults.status.includes('DEGRADED') ? (
                    <AlertTriangle size={16} className="text-red-400" />
                  ) : (
                    <CheckCircle2 size={16} className="text-cyan-400" />
                  )}
                  <span><strong>Status:</strong> {simResults.status}</span>
                </div>
                <span className="font-bold">{simResults.security}</span>
              </div>

              {/* Real-time Telemetry Terminal Logs */}
              <div className="rounded-xl border border-cyan-900/60 bg-[#020610] p-4 font-['JetBrains_Mono'] text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between border-b border-cyan-950 pb-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-2 text-cyan-400 font-bold">
                    <Terminal size={14} /> LIVE ENGINE EVENT STREAM
                  </span>
                  <span>STDERR / STDOUT</span>
                </div>
                <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar font-mono text-[11px]">
                  {simResults.logs.map((log, idx) => (
                    <div key={idx} className={
                      log.includes('WARNING') || log.includes('ALERT') 
                        ? 'text-red-400 font-semibold' 
                        : log.includes('C_DAEMON') || log.includes('BENCHMARK') 
                        ? 'text-cyan-300' 
                        : 'text-slate-300'
                    }>
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROCESS FLAW DIAGNOSIS */}
        {activeTab === 'flaws' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VENEVA_OVERHAUL.legacyFlaws.map((flaw, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-cyan-900/50 bg-[#061224] p-5 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <span className="font-['Chakra_Petch'] font-bold text-white text-base">
                    {flaw.title}
                  </span>
                  <span className={`text-[10px] font-['JetBrains_Mono'] font-bold px-2 py-0.5 rounded border ${
                    flaw.riskSeverity === 'Critical' 
                      ? 'bg-red-950/80 border-red-500/60 text-red-400' 
                      : 'bg-amber-950/80 border-amber-500/60 text-amber-400'
                  }`}>
                    {flaw.riskSeverity} Risk
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <strong className="text-red-400 block font-['JetBrains_Mono']">
                    ⚠️ Legacy Process Flaw:
                  </strong>
                  <p className="leading-relaxed text-slate-400">{flaw.flawDescription}</p>
                </div>

                <div className="pt-2 border-t border-cyan-950/80 space-y-1.5 text-xs">
                  <strong className="text-cyan-300 flex items-center gap-1.5 font-['JetBrains_Mono']">
                    <CheckCircle2 size={14} /> Veneva 2.0 Architectural Solution:
                  </strong>
                  <p className="leading-relaxed text-slate-300">{flaw.solutionIn2}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: C VS JAVASCRIPT BENCHMARK MATRIX */}
        {activeTab === 'language' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#061224] border border-cyan-800/60">
              <h3 className="font-['Chakra_Petch'] font-bold text-lg text-white mb-2">
                Architectural Shift Analysis: Dual-Core Hybrid
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Rather than choosing between C or JavaScript arbitrarily, Aaron proposed a <strong className="text-cyan-300">Dual-Core Hybrid Architecture</strong>. The compute-intensive, memory-critical daemon and crypto tasks run in a hardened <strong className="text-cyan-300">C daemon</strong>, while the user interface and high-velocity API orchestration leverage modern <strong className="text-cyan-300">TypeScript / Node.js</strong>.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-cyan-900/60 bg-[#061224]">
              <table className="w-full text-left text-xs font-['JetBrains_Mono']">
                <thead className="bg-[#030a16] text-cyan-400 border-b border-cyan-900/60 font-['Chakra_Petch'] text-xs uppercase">
                  <tr>
                    <th className="p-3 sm:p-4">Benchmark Metric</th>
                    <th className="p-3 sm:p-4 text-red-400">Legacy Veneva</th>
                    <th className="p-3 sm:p-4 text-cyan-300">C Low-Level Daemon</th>
                    <th className="p-3 sm:p-4 text-blue-300">TypeScript / Node.js</th>
                    <th className="p-3 sm:p-4 text-emerald-400">Architectural Decision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-950/60 text-slate-300">
                  {VENEVA_OVERHAUL.languageComparison.map((row, i) => (
                    <tr key={i} className="hover:bg-cyan-950/20 transition-colors">
                      <td className="p-3 sm:p-4 font-semibold text-white">{row.feature}</td>
                      <td className="p-3 sm:p-4 text-red-400">{row.legacy}</td>
                      <td className="p-3 sm:p-4 text-cyan-300 font-bold">{row.cCore}</td>
                      <td className="p-3 sm:p-4 text-blue-300">{row.jsTsAlternative}</td>
                      <td className="p-3 sm:p-4 text-emerald-300 font-bold">{row.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ZERO-TRUST AUTHENTICATION */}
        {activeTab === 'auth' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {VENEVA_OVERHAUL.authRoadmap.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-cyan-800/60 bg-[#061224] p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-['JetBrains_Mono'] text-cyan-400 font-bold">
                      {step.phase}
                    </span>
                    <Lock size={16} className="text-cyan-400" />
                  </div>
                  <h4 className="font-['Chakra_Petch'] font-bold text-white text-base">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="pt-2 border-t border-cyan-950 text-[11px] font-mono text-cyan-300">
                    <strong className="text-slate-400 block">Standard:</strong>
                    {step.tech}
                  </div>
                </div>
              ))}
            </div>

            {/* Token Lifecycle Flow Visualizer */}
            <div className="p-5 rounded-xl border border-cyan-800/60 bg-[#030a16] space-y-4">
              <h4 className="font-['Chakra_Petch'] font-bold text-sm text-cyan-300 uppercase">
                Zero-Trust Token Rotation Pipeline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-['JetBrains_Mono']">
                <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-cyan-400 font-bold mb-1">1. Auth Request</div>
                  <span className="text-[11px] text-slate-400">WebAuthn / Biometric Hash</span>
                </div>
                <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-cyan-400 font-bold mb-1">2. Ed25519 Sign</div>
                  <span className="text-[11px] text-slate-400">Asymmetric C Daemon Key</span>
                </div>
                <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-cyan-400 font-bold mb-1">3. Ephemeral JWT</div>
                  <span className="text-[11px] text-slate-400">5-Minute Expiry Duration</span>
                </div>
                <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-center">
                  <div className="text-cyan-400 font-bold mb-1">4. Silent Rotation</div>
                  <span className="text-[11px] text-slate-400">Replay Attack Immunity</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MULTI-SCREEN ADAPTIVE UI */}
        {activeTab === 'responsive' && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#061224] p-4 rounded-xl border border-cyan-800/60">
              <div>
                <h4 className="font-['Chakra_Petch'] font-bold text-base text-white">
                  Cross-Device Adaptive Cyber Interface
                </h4>
                <p className="text-xs text-slate-300">
                  Engineered with fluid container math and responsive grid breakpoints ensuring pixel-perfect layout from 320px mobile screens to 4K TV monitors.
                </p>
              </div>

              {/* Viewport Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800">
                <button
                  onClick={() => setSelectedDevice('phone')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 ${
                    selectedDevice === 'phone' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone size={14} /> Phone (320-480px)
                </button>
                <button
                  onClick={() => setSelectedDevice('tablet')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 ${
                    selectedDevice === 'tablet' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet size={14} /> Tablet (768-1024px)
                </button>
                <button
                  onClick={() => setSelectedDevice('laptop')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 ${
                    selectedDevice === 'laptop' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor size={14} /> Laptop (1280-1440px)
                </button>
                <button
                  onClick={() => setSelectedDevice('tv')}
                  className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 ${
                    selectedDevice === 'tv' ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tv size={14} /> 4K TV / Ultrawide
                </button>
              </div>
            </div>

            {/* Interactive Viewport Frame */}
            <div className="flex justify-center p-4 bg-[#020610] rounded-2xl border border-cyan-900/60 overflow-hidden">
              <div
                className={`transition-all duration-300 rounded-xl border-2 border-cyan-500/50 bg-[#050e1d] p-4 shadow-2xl overflow-hidden ${
                  selectedDevice === 'phone'
                    ? 'w-80'
                    : selectedDevice === 'tablet'
                    ? 'w-[540px]'
                    : selectedDevice === 'laptop'
                    ? 'w-full max-w-4xl'
                    : 'w-full'
                }`}
              >
                <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-3 text-[11px] font-mono text-cyan-400">
                  <span>VENEVA 2.0 HUD // {selectedDevice.toUpperCase()} VIEWPORT</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    60 FPS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800/40 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 block">PROCESS FLOW</span>
                    <strong className="text-white block mt-1">Non-Blocking Queue</strong>
                    <span className="text-cyan-400 text-[10px] font-mono">0 locks active</span>
                  </div>
                  <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800/40 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 block">SECURITY CORE</span>
                    <strong className="text-white block mt-1">Zero-Trust ed25519</strong>
                    <span className="text-emerald-400 text-[10px] font-mono">Token valid</span>
                  </div>
                  <div className="p-3 rounded bg-cyan-950/40 border border-cyan-800/40 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 block">MICRO-DAEMON</span>
                    <strong className="text-white block mt-1">C Systems Engine</strong>
                    <span className="text-cyan-400 text-[10px] font-mono">0.82ms P99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
