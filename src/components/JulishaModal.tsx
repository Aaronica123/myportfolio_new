import React, { useState } from 'react';
import { 
  Award, 
  X, 
  Activity, 
  Pill, 
  HeartPulse, 
  TrendingDown, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface JulishaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JulishaModal: React.FC<JulishaModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'triage' | 'stockout'>('analytics');
  const [triageInput, setTriageInput] = useState('Homa kali kwa siku tatu na kifua kinabana wakati wa usiku');
  const [triageResult, setTriageResult] = useState<{
    urgency: string;
    condition: string;
    adviceSwahili: string;
    adviceEnglish: string;
    vitalsSuggested: string;
  } | null>({
    urgency: 'URGENT (Level 2 Triage)',
    condition: 'Acute Bronchial Spasm / Severe Respiratory Infection',
    adviceSwahili: 'Mgonjwa anahitaji kupimwa kiwango cha oksijeni (SpO2) mara moja na kupewa nebulization.',
    adviceEnglish: 'Immediate SpO2 assessment and nebulization required. Correlate with Salbutamol inventory.',
    vitalsSuggested: 'BP: 120/80 | SpO2: 91% | Temp: 38.6°C',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold">
              <Award size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Chakra_Petch'] font-bold text-base text-white">
                  Julisha Healthcare AI Platform
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  GDG Pwani Winner 2026
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Primary Healthcare Intelligence · Stockout Predictor · Swahili NLP Triage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 text-xs font-['Chakra_Petch'] font-semibold">
          {[
            { id: 'analytics', label: 'Stockout Correlation Analytics' },
            { id: 'triage', label: 'Interactive Swahili AI Triage' },
            { id: 'stockout', label: 'Sub-County Stock Dispatch' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-xs sm:text-sm bg-slate-950/40">
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-['Chakra_Petch'] font-bold text-sm text-white flex items-center gap-2">
                  <HeartPulse size={16} className="text-sky-400" />
                  Pearson Correlation: Medicine Stockouts vs. Patient Satisfaction
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Real-time algorithmic reconciliation matching clinical stock shortages to patient retention indices across 14 Primary Healthcare Centers in Kakamega & Coastal Sub-Counties.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block uppercase">Pearson Coefficient (r)</span>
                  <strong className="text-lg font-bold text-rose-400">-0.874</strong>
                  <span className="text-[10px] text-slate-500 block">Strong Inverse Correlation</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block uppercase">Predictive Stockout Window</span>
                  <strong className="text-lg font-bold text-sky-400">7.2 Days</strong>
                  <span className="text-[10px] text-slate-500 block">Lead Time Alert</span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-center font-mono">
                  <span className="text-[10px] text-slate-400 block uppercase">Biometric Verification</span>
                  <strong className="text-lg font-bold text-emerald-400">99.4%</strong>
                  <span className="text-[10px] text-slate-500 block">SHA-256 Ghost Patient Guard</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'triage' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-sky-400 font-semibold uppercase block">
                  Simulate Patient Symptom Intake (Swahili or English):
                </span>
                <textarea
                  rows={3}
                  value={triageInput}
                  onChange={(e) => setTriageInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white outline-none focus:border-sky-500 font-mono resize-none transition-colors"
                />
                <button
                  onClick={() => {
                    soundManager.playAchievement();
                    setTriageResult({
                      urgency: 'URGENT (Level 2 Triage)',
                      condition: 'Acute Bronchial Spasm / Severe Respiratory Infection',
                      adviceSwahili: 'Mgonjwa anahitaji kupimwa kiwango cha oksijeni (SpO2) mara moja na kupewa nebulization.',
                      adviceEnglish: 'Immediate SpO2 assessment and nebulization required. Correlate with Salbutamol inventory.',
                      vitalsSuggested: 'BP: 120/80 | SpO2: 91% | Temp: 38.6°C',
                    });
                  }}
                  className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-['Chakra_Petch'] font-semibold text-xs uppercase tracking-wide transition-colors cursor-pointer"
                >
                  Run Multilingual NLP Clinical Triage
                </button>
              </div>

              {triageResult && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="font-mono text-amber-400 font-bold">{triageResult.urgency}</span>
                    <span className="font-mono text-slate-400">{triageResult.vitalsSuggested}</span>
                  </div>
                  <div>
                    <strong className="text-white block">Predicted Clinical Condition:</strong>
                    <span className="text-slate-300 font-medium">{triageResult.condition}</span>
                  </div>
                  <div>
                    <strong className="text-sky-400 block font-mono text-[11px]">Mwongozo kwa Kiswahili:</strong>
                    <p className="text-slate-300">{triageResult.adviceSwahili}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stockout' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-white font-['Chakra_Petch'] text-sm block">
                  Active Regional Medicine Redistribution Queue
                </span>
                <div className="space-y-2 pt-2">
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span>Amoxicillin 500mg (200 units)</span>
                    <span className="text-emerald-400 font-semibold">Surplus: Dispatched</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                    <span>Artemether + Lumefantrine (Malaria)</span>
                    <span className="text-amber-400 font-semibold">Critical: Transfer En Route</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
