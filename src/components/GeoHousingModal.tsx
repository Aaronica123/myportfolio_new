import React, { useState } from 'react';
import { 
  Building2, 
  X, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  DollarSign, 
  Volume2, 
  Hospital, 
  Trees, 
  Sparkles, 
  Cpu, 
  Database, 
  Server, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Search,
  SlidersHorizontal,
  Home,
  Users,
  Compass,
  AlertCircle
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GeoHousingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimulatedHouse {
  id: string;
  name: string;
  campusDistance: string;
  locality: string;
  type: string;
  priceKsh: number;
  securityRating: string;
  noiseLevel: 'Silent Study Zone' | 'Moderate' | 'Commercial Ambient';
  hospitalDist: string;
  waterSupply: string;
  aiHealthScore: number;
  aiHealthVerdict: string;
  coordinates: string;
  verifiedLeaser: string;
}

const SAMPLE_HOUSES: SimulatedHouse[] = [
  {
    id: 'h1',
    name: 'Greenfield Comrades Heights',
    campusDistance: '450m from MMUST Main Gate',
    locality: 'Kefinco / Kakamega',
    type: 'Bedsitter (Self-Contained)',
    priceKsh: 6500,
    securityRating: 'Perimeter Wall + Biometric Gate + Night Watchman',
    noiseLevel: 'Silent Study Zone',
    hospitalDist: '0.8 km to Kakamega County Referral',
    waterSupply: '24/7 Borehole + Metered Tokens',
    aiHealthScore: 96,
    aiHealthVerdict: 'Optimal natural lighting, verified ceiling ventilation, zero dampness/mold, county regulatory certified.',
    coordinates: '0.2827° N, 34.7519° E',
    verifiedLeaser: 'Kefinco Properties Agency (Verified via Supabase Profile)',
  },
  {
    id: 'h2',
    name: 'Sunrise Scholar Haven',
    campusDistance: '700m from Science Complex',
    locality: 'Amalemba / Kakamega',
    type: '1-Bedroom Apartment',
    priceKsh: 9500,
    securityRating: 'CCTV Surveillance + Steel Grille',
    noiseLevel: 'Moderate',
    hospitalDist: '1.2 km to St. Elizabeth Clinic',
    waterSupply: 'Council Water + Overhead Tank Reserve',
    aiHealthScore: 92,
    aiHealthVerdict: 'Spacious tiled floor, reliable electrical conduits, sound drainage integrity.',
    coordinates: '0.2791° N, 34.7584° E',
    verifiedLeaser: 'Amalemba Prime Holdings (Verified)',
  },
  {
    id: 'h3',
    name: 'Comrade Budget Suites',
    campusDistance: '250m from Engineering Gate B',
    locality: 'Lurambi / Kakamega',
    type: 'Single Room (Shared Amenities)',
    priceKsh: 3800,
    securityRating: 'Compound Gate Lock + Community Watch',
    noiseLevel: 'Silent Study Zone',
    hospitalDist: '0.5 km to Campus Health Dispensary',
    waterSupply: 'Solar Water Pump',
    aiHealthScore: 88,
    aiHealthVerdict: 'Solid masonry, fresh coat paint, adequate window-to-floor area ratio.',
    coordinates: '0.2865° N, 34.7490° E',
    verifiedLeaser: 'Lurambi Student Hostels Board',
  },
  {
    id: 'h4',
    name: 'Westlands Comrades Studio Loft',
    campusDistance: '1.2km from Chiromo / Parklands',
    locality: 'Westlands / Nairobi',
    type: 'Modern Studio Apartment',
    priceKsh: 14000,
    securityRating: 'Keycard Access + 24/7 Security Detail',
    noiseLevel: 'Moderate',
    hospitalDist: '0.9 km to MP Shah Hospital',
    waterSupply: 'Borehole & High-pressure Booster',
    aiHealthScore: 98,
    aiHealthVerdict: 'A-grade structural compliance, fire egress compliant, smart prepaid meter.',
    coordinates: '1.2674° S, 36.8080° E',
    verifiedLeaser: 'Nairobi Urban Living Leasers',
  },
];

export const GeoHousingModal: React.FC<GeoHousingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'architecture' | 'problem'>('simulator');
  const [selectedCampus, setSelectedCampus] = useState('MMUST Kakamega (Main Campus)');
  const [maxBudget, setMaxBudget] = useState(10000);
  const [selectedType, setSelectedType] = useState('All');
  const [onlyQuiet, setOnlyQuiet] = useState(false);
  const [useLiveGps, setUseLiveGps] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<SimulatedHouse | null>(SAMPLE_HOUSES[0]);

  if (!isOpen) return null;

  const filteredHouses = SAMPLE_HOUSES.filter((h) => {
    if (h.priceKsh > maxBudget) return false;
    if (selectedType !== 'All' && !h.type.toLowerCase().includes(selectedType.toLowerCase())) return false;
    if (onlyQuiet && h.noiseLevel !== 'Silent Study Zone') return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fadeIn font-['Plus_Jakarta_Sans']">
      <div className="w-full max-w-5xl max-h-[92vh] rounded-xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">
              <Compass size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-['Chakra_Petch'] font-bold text-base text-white">
                  GeoMakazi: Campus Housing & Geospatial AI
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700 font-semibold">
                  Active Project
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400">
                Solving Comrade Student Housing Across Kenya (1.36T KES Deficit)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 text-xs font-['Chakra_Petch'] font-semibold">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('simulator');
            }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'simulator'
                ? 'border-sky-500 text-sky-300 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Search size={14} />
            <span>Campus Finder Simulator</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('architecture');
            }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'architecture'
                ? 'border-sky-500 text-sky-300 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Cpu size={14} />
            <span>Architecture & File Blueprint</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('problem');
            }}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'problem'
                ? 'border-sky-500 text-sky-300 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <AlertCircle size={14} />
            <span>Socioeconomic Context</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              {/* Filter HUD */}
              <div className="p-4 rounded-xl bg-[#030917] border border-cyan-900/60 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-cyan-950 pb-3">
                  <div className="flex items-center gap-2 text-xs font-['Chakra_Petch'] font-bold text-cyan-300 uppercase">
                    <SlidersHorizontal size={14} />
                    <span>AI Geospatial Search Parameters</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        setUseLiveGps(!useLiveGps);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-['JetBrains_Mono'] flex items-center gap-1.5 transition-all ${
                        useLiveGps
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      <Navigation size={12} className={useLiveGps ? 'animate-spin' : ''} />
                      <span>{useLiveGps ? 'GPS ACTIVE: 0.2827° N, 34.7519° E' : 'USE MY LIVE GPS LOCATION'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-['JetBrains_Mono']">
                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">CAMPUS / GEOGRAPHICAL ZONE</label>
                    <select
                      value={selectedCampus}
                      onChange={(e) => {
                        soundManager.playClick();
                        setSelectedCampus(e.target.value);
                      }}
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="MMUST Kakamega (Main Campus)">MMUST Kakamega (Main Campus)</option>
                      <option value="UoN Chiromo / Parklands">UoN Chiromo / Main Campus</option>
                      <option value="KU Main Campus / Ruiru">Kenyatta University (KU Ruiru)</option>
                      <option value="TUM Mombasa Coastal Hub">TUM Mombasa (Coastal Region)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px] flex justify-between">
                      <span>MAX MONTHLY BUDGET:</span>
                      <strong className="text-cyan-300">KES {maxBudget.toLocaleString()}</strong>
                    </label>
                    <input
                      type="range"
                      min={3000}
                      max={20000}
                      step={500}
                      value={maxBudget}
                      onChange={(e) => setMaxBudget(Number(e.target.value))}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>KES 3,000</span>
                      <span>KES 20,000</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 text-[11px]">ROOM / HOUSE CATEGORY</label>
                    <div className="flex gap-1.5 flex-wrap">
                      {['All', 'Bedsitter', 'Single Room', '1-Bedroom'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedType(type);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                            selectedType === type
                              ? 'bg-cyan-500 text-black font-bold'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-['JetBrains_Mono'] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={onlyQuiet}
                      onChange={(e) => {
                        soundManager.playClick();
                        setOnlyQuiet(e.target.checked);
                      }}
                      className="accent-cyan-400 rounded"
                    />
                    <span>Filter Only "Silent Study Zones" (Zero Club / Matatu Ambient)</span>
                  </label>
                </div>
              </div>

              {/* Two Column Results & Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* House List Column */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>MATCHED LISTINGS VIA AI GEO-FILTER ({filteredHouses.length})</span>
                    <span className="text-cyan-400">REAL-TIME SATELLITE SYNC</span>
                  </div>

                  {filteredHouses.length === 0 ? (
                    <div className="p-8 text-center bg-slate-900/60 rounded-xl border border-slate-800 text-slate-400 text-xs">
                      No houses match these exact filters. Try raising the maximum budget slider.
                    </div>
                  ) : (
                    filteredHouses.map((house) => {
                      const isSelected = selectedHouse?.id === house.id;
                      return (
                        <div
                          key={house.id}
                          onClick={() => {
                            soundManager.playClick();
                            setSelectedHouse(house);
                          }}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? 'bg-[#091e38] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                              : 'bg-[#040c1a] border-cyan-950 hover:border-cyan-800'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-['Chakra_Petch'] font-bold text-base text-white">
                                  {house.name}
                                </h4>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50">
                                  {house.type}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                                <MapPin size={12} className="text-cyan-400 shrink-0" />
                                <span>{house.campusDistance} • {house.locality}</span>
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="text-base font-['Chakra_Petch'] font-bold text-emerald-400 block">
                                KES {house.priceKsh.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">per month</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-cyan-950/80 text-[10px] font-['JetBrains_Mono']">
                            <div className="text-slate-400">
                              <span className="block text-slate-500">NOISE AMBIENT</span>
                              <span className="text-cyan-300 font-semibold">{house.noiseLevel}</span>
                            </div>
                            <div className="text-slate-400">
                              <span className="block text-slate-500">HOSPITAL DIST</span>
                              <span className="text-slate-300 font-semibold">{house.hospitalDist}</span>
                            </div>
                            <div className="text-slate-400">
                              <span className="block text-slate-500">AI HEALTH SCORE</span>
                              <span className="text-emerald-400 font-bold">{house.aiHealthScore}% Verified</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Selected House Deep Dossier */}
                <div className="lg:col-span-5 space-y-4">
                  {selectedHouse ? (
                    <div className="p-5 rounded-xl bg-[#030917] border border-cyan-500/60 space-y-4 font-['Plus_Jakarta_Sans'] sticky top-0">
                      <div className="flex items-center justify-between border-b border-cyan-950 pb-3">
                        <div>
                          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                            GEOSPATIAL DOSSIER
                          </span>
                          <h4 className="font-['Chakra_Petch'] font-bold text-lg text-white">
                            {selectedHouse.name}
                          </h4>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 font-bold text-xs">
                          {selectedHouse.aiHealthScore}%
                        </div>
                      </div>

                      {/* Coordinates & Satellite Verification */}
                      <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-['JetBrains_Mono'] space-y-1.5">
                        <div className="flex justify-between text-slate-400">
                          <span>SATELLITE COORDINATES:</span>
                          <strong className="text-cyan-300">{selectedHouse.coordinates}</strong>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>VERIFIED LEASER (SUPABASE):</span>
                          <strong className="text-slate-200">{selectedHouse.verifiedLeaser}</strong>
                        </div>
                      </div>

                      {/* AI House Health & Regulatory Assessment */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-['Chakra_Petch'] font-bold text-amber-300">
                          <Sparkles size={13} className="text-amber-400" />
                          <span>AI STRUCTURAL HEALTH & REGULATORY AUDIT</span>
                        </div>
                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/40 text-xs text-amber-200 leading-relaxed">
                          {selectedHouse.aiHealthVerdict}
                        </div>
                      </div>

                      {/* Criteria Matrix */}
                      <div className="space-y-2 text-xs font-['JetBrains_Mono']">
                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <ShieldCheck size={14} className="text-emerald-400" /> Security Standard
                          </span>
                          <span className="text-slate-200 font-semibold text-right text-[11px] max-w-[200px] truncate">
                            {selectedHouse.securityRating}
                          </span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Volume2 size={14} className="text-cyan-400" /> Acoustic Profile
                          </span>
                          <span className="text-cyan-300 font-semibold">{selectedHouse.noiseLevel}</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Hospital size={14} className="text-blue-400" /> Medical Proximity
                          </span>
                          <span className="text-slate-200 font-semibold">{selectedHouse.hospitalDist}</span>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <CheckCircle2 size={14} className="text-emerald-400" /> Water & Utilities
                          </span>
                          <span className="text-slate-200 font-semibold">{selectedHouse.waterSupply}</span>
                        </div>
                      </div>

                      {/* MinIO Bucket & Direct Booking Action */}
                      <div className="pt-2">
                        <button
                          onClick={() => {
                            soundManager.playAchievement();
                            alert(`Simulating Direct Contact with ${selectedHouse.verifiedLeaser} via Supabase authenticated channel!`);
                          }}
                          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-['Chakra_Petch'] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        >
                          <Users size={14} />
                          <span>CONNECT DIRECTLY WITH LEASER (BYPASS BROKER)</span>
                        </button>
                        <p className="text-[10px] font-mono text-center text-slate-500 mt-2">
                          Images stored in MinIO S3 Buckets • Cached in Redis • Zero Rogue Middleman Fees
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500 text-xs font-mono">
                      Select a house on the left to inspect geospatial telemetry.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Architecture Overview Banner */}
              <div className="p-4 rounded-xl bg-[#030917] border border-cyan-900/60 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">
                  PRODUCTION SYSTEM BLUEPRINT
                </span>
                <h4 className="font-['Chakra_Petch'] font-bold text-lg text-white">
                  Decoupled Cloud Architecture: Supabase, MinIO, Redis, Express, Google Maps & Railway
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered strictly around the structural specification in the project proposal to provide high throughput, sub-meter geospatial accuracy, and frictionless onboarding for both university students and property providers.
                </p>
              </div>

              {/* Core Component Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-['Plus_Jakarta_Sans']">
                {/* Backend Services */}
                <div className="p-4 rounded-xl bg-[#040c1a] border border-cyan-950 space-y-3">
                  <div className="flex items-center gap-2 font-['Chakra_Petch'] font-bold text-sm text-cyan-300">
                    <Server size={16} />
                    <span>BACKEND API & FILE STRUCTURE</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-cyan-400 block">App.js</strong>
                      <span className="text-slate-400 text-[10px]">
                        Defines the Express app and all its configurations including all routed API files (/api/houses, /api/auth, /api/geo).
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-cyan-400 block">Index.js</strong>
                      <span className="text-slate-400 text-[10px]">
                        Executes the app Express object and opens the port starting the server with graceful shutdown hooks.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-cyan-400 block">Supabase.js</strong>
                      <span className="text-slate-400 text-[10px]">
                        Defines the Supabase client configurations and connection pool utilized across all database operations.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Database Schema */}
                <div className="p-4 rounded-xl bg-[#040c1a] border border-cyan-950 space-y-3">
                  <div className="flex items-center gap-2 font-['Chakra_Petch'] font-bold text-sm text-cyan-300">
                    <Database size={16} />
                    <span>SUPABASE RELATIONAL SCHEMA</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-emerald-400 block">Users Table</strong>
                      <span className="text-slate-400 text-[10px]">
                        Differentiates roles: House Leaser (Provider) vs House Finder (Comrade). Handles Gmail OAuth & password credentials.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-emerald-400 block">Houses Table</strong>
                      <span className="text-slate-400 text-[10px]">
                        Apartment specifications, GPS coordinates, price (KES), room category, noise classification, and AI health rating.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-emerald-400 block">Profile Table</strong>
                      <span className="text-slate-400 text-[10px]">
                        Stores registration metadata, student ID / institutional affiliation, leaser ownership validation, and saved listings.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Storage & Caching Layer */}
                <div className="p-4 rounded-xl bg-[#040c1a] border border-cyan-950 space-y-3">
                  <div className="flex items-center gap-2 font-['Chakra_Petch'] font-bold text-sm text-cyan-300">
                    <Layers size={16} />
                    <span>STORAGE, CACHING & GEO ASSETS</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-amber-400 block">MinIO Object Buckets</strong>
                      <span className="text-slate-400 text-[10px]">
                        Self-hosted S3-compatible bucket storage for high-resolution property imagery, floor plans, and inspection photos.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-amber-400 block">Redis In-Memory Cache</strong>
                      <span className="text-slate-400 text-[10px]">
                        Ultra-fast caching for static images, geospatial radii lookup results, and search query cache (&lt;50ms response).
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-amber-400 block">Google Maps & Satellite API</strong>
                      <span className="text-slate-400 text-[10px]">
                        Real-time accurate satellite mapping, route calculation from campus gates, and geolocation reverse-geocoding.
                      </span>
                    </div>
                  </div>
                </div>

                {/* DevOps & Gateway */}
                <div className="p-4 rounded-xl bg-[#040c1a] border border-cyan-950 space-y-3">
                  <div className="flex items-center gap-2 font-['Chakra_Petch'] font-bold text-sm text-cyan-300">
                    <Cpu size={16} />
                    <span>GATEWAY & DEPLOYMENT INFRASTRUCTURE</span>
                  </div>
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-sky-400 block">Nginx Web Server & Reverse Proxy</strong>
                      <span className="text-slate-400 text-[10px]">
                        Handles SSL termination, rate-limiting against bot scrapers, static asset delivery, and routing to Express API.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-sky-400 block">React Frontend Interface</strong>
                      <span className="text-slate-400 text-[10px]">
                        Responsive web application tailored for mobile phones, tablets, and desktop workstations with zero lag.
                      </span>
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <strong className="text-sky-400 block">Railway Deployment Platform</strong>
                      <span className="text-slate-400 text-[10px]">
                        Continuous deployment orchestration with automated environment health checks and autoscaling container workers.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'problem' && (
            <div className="space-y-6">
              {/* Telemetry Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#030917] border border-cyan-900/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 block">KENYA HOUSING SECTOR</span>
                  <strong className="text-xl sm:text-2xl font-bold text-cyan-400 font-['Chakra_Petch']">1.36 TRILLION KES</strong>
                  <span className="text-xs text-slate-500 block mt-1">8.4% of national GDP</span>
                </div>

                <div className="p-4 rounded-xl bg-[#030917] border border-cyan-900/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 block">NATIONAL HOUSING BUDGET</span>
                  <strong className="text-xl sm:text-2xl font-bold text-emerald-400 font-['Chakra_Petch']">50 BILLION KES</strong>
                  <span className="text-xs text-slate-500 block mt-1">Massive ongoing supply deficit</span>
                </div>

                <div className="p-4 rounded-xl bg-[#030917] border border-cyan-900/60 font-['JetBrains_Mono']">
                  <span className="text-[10px] text-slate-400 block">CORE BENEFICIARIES</span>
                  <strong className="text-xl sm:text-2xl font-bold text-amber-400 font-['Chakra_Petch']">COMRADES & STUDENTS</strong>
                  <span className="text-xs text-slate-500 block mt-1">University campuses & urban leasers</span>
                </div>
              </div>

              {/* Problem Analysis */}
              <div className="p-5 rounded-xl bg-[#040c1a] border border-cyan-950 space-y-3">
                <h4 className="font-['Chakra_Petch'] font-bold text-base text-white">
                  The Problem Statement: The Comrade Housing Ordeal
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  House hunters and university students lack a centralized reference point when searching for accommodation. Students are forced to wander on foot door-to-door under the sun for days, relying purely on luck and word-of-mouth. Out of exhaustion and lack of options, they frequently settle for substandard, insecure, or noisy rooms with unmet conditions. Meanwhile, house providers struggle to market their rooms effectively without paying exorbitant fees to unregistered brokers.
                </p>
              </div>

              {/* Objectives & Proposed Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-['Plus_Jakarta_Sans']">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <strong className="font-['Chakra_Petch'] font-bold text-sm text-cyan-300 block">
                    PROJECT OBJECTIVES
                  </strong>
                  <ul className="space-y-1.5 text-slate-300 text-xs list-disc list-inside">
                    <li>Design, build, and deploy a geographical AI-powered housing platform.</li>
                    <li>Achieve sub-meter real-time geographical accuracy via AI search algorithms and satellite mapping.</li>
                    <li>Implement multi-criteria filtering for budget, house type, security, noise, and hospitals.</li>
                    <li>Support both live GPS coordinate auto-detection and manual campus/town search.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <strong className="font-['Chakra_Petch'] font-bold text-sm text-emerald-300 block">
                    THE GEOMAKAZI SOLUTION
                  </strong>
                  <ul className="space-y-1.5 text-slate-300 text-xs list-disc list-inside">
                    <li>Single verified reference point connecting verified leasers and house hunters.</li>
                    <li>AI structural health inspection verifying natural light, ventilation, and safety standards.</li>
                    <li>Direct contact channel eliminating unregulated middlemen and broker extortion.</li>
                    <li>Showcases emerging AI technology solving tangible, critical infrastructure challenges in Kenya.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#030917] border-t border-cyan-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <span>PROJECT ARCHITECT: Aaron Mutua (@Aaronica123)</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-['Chakra_Petch'] font-bold"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
