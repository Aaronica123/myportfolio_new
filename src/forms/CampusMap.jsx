import React, { useState } from 'react';
import { MapPin, Compass, ShieldCheck, Volume2, ArrowRight } from 'lucide-react';
import Button from '../components/button';

const MAP_HOTSPOTS = [
  {
    id: 101,
    name: 'Greenfield Comrades Heights',
    zone: 'Kefinco Sector',
    coords: '0.2827° N, 34.7519° E',
    distance: '450m from MMUST Main Gate',
    price: 'KES 6,500 / mo',
    type: 'Bedsitter (Self-Contained)',
    security: 'Biometric Gate + Guard',
    noise: 'Silent Study Zone',
    topPct: '32%',
    leftPct: '45%',
  },
  {
    id: 102,
    name: 'Sunrise Scholar Haven',
    zone: 'Amalemba Sector',
    coords: '0.2791° N, 34.7584° E',
    distance: '700m from Science Complex',
    price: 'KES 9,500 / mo',
    type: '1-Bedroom Apartment',
    security: 'CCTV + Perimeter Fence',
    noise: 'Moderate',
    topPct: '58%',
    leftPct: '68%',
  },
  {
    id: 103,
    name: 'Comrade Budget Suites',
    zone: 'Lurambi Sector',
    coords: '0.2865° N, 34.7490° E',
    distance: '250m from Engineering Gate B',
    price: 'KES 3,800 / mo',
    type: 'Single Room (Shared)',
    security: 'Compound Gate Lock',
    noise: 'Silent Study Zone',
    topPct: '22%',
    leftPct: '28%',
  },
  {
    id: 108,
    name: 'Apex Comrade Living Hub',
    zone: 'Science Complex Bypass',
    coords: '0.2840° N, 34.7540° E',
    distance: '380m from Science Complex',
    price: 'KES 6,800 / mo',
    type: 'Bedsitter (Self-Contained)',
    security: '24/7 Guard + Water Supply',
    noise: 'Silent Study Zone',
    topPct: '42%',
    leftPct: '52%',
  },
];

export default function CampusMap({ onSelectHouse, onNavigateToRooms }) {
  const [selectedHotspot, setSelectedHotspot] = useState(MAP_HOTSPOTS[0]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
            Geospatial Proximity Radar
          </span>
          <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">
            MMUST Kakamega & Comrade Accommodations Map
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Explore hostels and private rentals by distance to campus lecture halls & gates
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onNavigateToRooms && (
            <Button size="sm" onClick={onNavigateToRooms} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl">
              View List Column
            </Button>
          )}
        </div>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xs">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-60"></div>

        {/* Center MMUST Campus Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3.5 rounded-2xl bg-white/95 backdrop-blur-xs border-2 border-indigo-600 shadow-xl text-center z-10 pointer-events-none">
          <Compass size={22} className="mx-auto text-indigo-600 animate-spin" />
          <span className="font-bold text-xs text-slate-900 block mt-1">
            MMUST MAIN CAMPUS
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            Kakamega Center (0.2827° N, 34.7519° E)
          </span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-indigo-200 pointer-events-none opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-indigo-100 pointer-events-none"></div>

        {/* Pin Hotspots */}
        {MAP_HOTSPOTS.map((spot) => {
          const isSelected = selectedHotspot?.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={() => setSelectedHotspot(spot)}
              style={{ top: spot.topPct, left: spot.leftPct }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-2xl transition-all duration-200 z-20 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isSelected
                  ? 'bg-indigo-600 text-white font-extrabold shadow-lg shadow-indigo-600/30 scale-110 ring-4 ring-indigo-200'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              <MapPin size={16} className={isSelected ? 'text-white' : 'text-rose-500'} />
              <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
                {spot.name.split(' ')[0]} ({spot.price.split(' ')[1]})
              </span>
            </button>
          );
        })}

        {/* Selected Pin Dossier Card */}
        {selectedHotspot && (
          <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-30">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-slate-900">
                  {selectedHotspot.name}
                </h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {selectedHotspot.type}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {selectedHotspot.distance} • {selectedHotspot.coords}
              </p>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 mt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  {selectedHotspot.security}
                </span>
                <span className="flex items-center gap-1">
                  <Volume2 size={14} className="text-indigo-600" />
                  {selectedHotspot.noise}
                </span>
              </div>
            </div>

            <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
              <span className="text-base font-extrabold text-emerald-600">
                {selectedHotspot.price}
              </span>
              {onNavigateToRooms && (
                <button
                  onClick={onNavigateToRooms}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View in Rooms</span>
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
