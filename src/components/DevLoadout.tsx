import React, { useState } from 'react';
import { 
  Binary, 
  Cloud, 
  Box, 
  BrainCircuit, 
  Database, 
  Code2, 
  ShieldAlert, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Zap
} from 'lucide-react';
import { DEV_ITEMS_LOADOUT } from '../data/portfolioData';
import { DevItem } from '../types';
import { soundManager } from '../utils/audio';

export const DevLoadout: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<DevItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Binary': return <Binary size={22} />;
      case 'Cloud': return <Cloud size={22} />;
      case 'Box': return <Box size={22} />;
      case 'BrainCircuit': return <BrainCircuit size={22} />;
      case 'Database': return <Database size={22} />;
      case 'Code2': return <Code2 size={22} />;
      default: return <Zap size={22} />;
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Mythic':
        return 'border-amber-400 bg-amber-950/80 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]';
      case 'Legendary':
        return 'border-cyan-400 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.5)]';
      case 'Epic':
        return 'border-purple-400 bg-purple-950/80 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.5)]';
      default:
        return 'border-blue-400 bg-blue-950/80 text-blue-300';
    }
  };

  const handleSelectItem = (item: DevItem) => {
    soundManager.playAchievement();
    setSelectedItem(item);
  };

  return (
    <section id="inventory" className="py-12 sm:py-16 text-slate-100 font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-cyan-900/60 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-950/40 text-purple-300 text-xs font-['JetBrains_Mono'] tracking-wide mb-2">
              <Sparkles size={13} className="text-purple-400" />
              <span>DEVELOPER ARSENAL & LOOT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Chakra_Petch'] text-white">
              Tactical Loadout & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Inventory</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Click any legendary item to inspect technical stats, compiler flags, and architectural lore.
            </p>
          </div>

          <div className="font-['JetBrains_Mono'] text-xs text-slate-400 bg-[#061224] border border-cyan-900/50 px-3 py-1.5 rounded-lg">
            SLOTS: <span className="text-cyan-400 font-bold">6 / 6 EQUIPPED</span>
          </div>
        </div>

        {/* Loadout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEV_ITEMS_LOADOUT.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectItem(item)}
              onMouseEnter={() => soundManager.playHover()}
              className="text-left rounded-2xl border-2 border-slate-800 hover:border-cyan-500/70 bg-gradient-to-b from-[#071326] to-[#040a14] p-5 relative overflow-hidden group transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.2)] focus:outline-none"
            >
              {/* Item Card Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700 group-hover:border-cyan-400 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-all">
                  {getIcon(item.icon)}
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-['JetBrains_Mono'] font-bold uppercase px-2 py-0.5 rounded border ${getRarityBadge(item.rarity)}`}>
                    {item.rarity}
                  </span>
                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    LV. {item.level}
                  </div>
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="font-['Chakra_Petch'] font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h3>
              <p className="text-[11px] font-['JetBrains_Mono'] text-cyan-400/90 mb-2.5">
                {item.category}
              </p>

              {/* Lore preview */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                {item.lore}
              </p>

              {/* Stats Preview */}
              <div className="space-y-1.5 border-t border-slate-800/80 pt-3 text-[11px] font-['JetBrains_Mono']">
                {item.stats.map((st, i) => (
                  <div key={i} className="flex justify-between items-center text-slate-400">
                    <span>{st.label}:</span>
                    <span className="text-cyan-300 font-semibold">{st.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-slate-500 pt-2 border-t border-slate-800/60">
                <span>STATUS: EQUIPPED</span>
                <span className="text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  INSPECT SPECS <ChevronRight size={12} />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Item Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-lg rounded-2xl border-2 border-cyan-500/80 bg-[#061224] p-6 shadow-[0_0_40px_rgba(6,182,212,0.35)] relative overflow-hidden font-['Plus_Jakarta_Sans']">
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  {getIcon(selectedItem.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-['JetBrains_Mono'] font-bold uppercase px-2 py-0.5 rounded border ${getRarityBadge(selectedItem.rarity)}`}>
                      {selectedItem.rarity} ITEM
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      LEVEL {selectedItem.level}
                    </span>
                  </div>
                  <h3 className="font-['Chakra_Petch'] font-bold text-xl text-white mt-1">
                    {selectedItem.name}
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">{selectedItem.category}</span>
                </div>
              </div>

              {/* Lore Block */}
              <div className="p-3.5 rounded-xl bg-[#020610] border border-cyan-950 mb-4 text-xs text-slate-300 leading-relaxed font-mono">
                <strong className="text-cyan-300 block mb-1 font-['Chakra_Petch'] text-sm">ARCHITECTURAL LORE:</strong>
                "{selectedItem.lore}"
              </div>

              {/* Full Stats Table */}
              <div className="space-y-2 mb-5 font-['JetBrains_Mono'] text-xs">
                <strong className="text-slate-300 block uppercase">Combat Attributes & Benchmarks:</strong>
                {selectedItem.stats.map((st, i) => (
                  <div key={i} className="flex justify-between items-center p-2 rounded bg-slate-900/80 border border-slate-800">
                    <span className="text-slate-400">{st.label}</span>
                    <span className="text-cyan-300 font-bold">{st.value}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-['Chakra_Petch'] font-bold text-xs uppercase tracking-wider"
              >
                Close Item Dossier
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
