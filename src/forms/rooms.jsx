import React, { useEffect, useState } from 'react';
import Cardimage from '../components/cards';
import axios_client from '../axios/axios';
import Button from '../components/button';
import { 
  Loader2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  RefreshCw, 
  AlertCircle
} from 'lucide-react';

export default function Home({ 
  onAddToCart, 
  cartItems = [], 
  onSelectHouse,
  searchTerm: externalSearchTerm = '',
  selectedCategory = 'All'
}) {
  const [loading, setloading] = useState(true);
  const [value, setvalue] = useState([]);
  const [rawHouses, setRawHouses] = useState([]);
  
  // Pagination State: Navigation buttons at the bottom dictating the current page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const [totalItems, setTotalItems] = useState(12);
  const [itemsPerPage] = useState(4);

  // Local search state
  const [localSearch, setLocalSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState(selectedCategory);

  useEffect(() => {
    setActiveFilter(selectedCategory);
  }, [selectedCategory]);

  const searchTerm = externalSearchTerm || localSearch;

  // Fetch houses from backend endpoint as provided
  const fetchHouses = async (pageIndex = 1) => {
    setloading(true);
    try {
      const response = await axios_client.get(`/api/get_all?index=${pageIndex}&limit=${itemsPerPage}`);
      const dataPayload = response.data;

      if (dataPayload && dataPayload.data) {
        setRawHouses(dataPayload.data);
        const rows = dataPayload.data.map((item) => Object.values(item));
        setvalue(rows);
        
        if (dataPayload.totalPages) {
          setTotalPages(dataPayload.totalPages);
        }
        if (dataPayload.totalCount) {
          setTotalItems(dataPayload.totalCount);
        }
        if (dataPayload.page) {
          setCurrentPage(dataPayload.page);
        }
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      // Fallback data
      const fallback = [
        [101, 'Greenfield Comrades Heights', 'Bedsitter (Self-Contained)', 'KES 6,500 / month', 'Kefinco, Kakamega (450m from MMUST)', 'Borehole Water, WiFi', 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80', 'Available', '+254712345678'],
        [102, 'Sunrise Scholar Haven', '1-Bedroom Apartment', 'KES 9,500 / month', 'Amalemba, Kakamega (700m from Science Complex)', 'CCTV, Balcony', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80', 'Available', '+254723456789'],
        [103, 'Comrade Budget Suites', 'Single Room (Shared)', 'KES 3,800 / month', 'Lurambi, Kakamega (250m from Engineering Gate B)', 'Quiet Study Zone', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80', 'Available', '+254734567890'],
        [104, 'Westlands Comrades Loft', 'Modern Studio', 'KES 14,000 / month', 'Westlands, Nairobi (1.2km from Chiromo)', 'High Pressure Shower', 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=80', 'Available', '+254745678901'],
      ];
      setvalue(fallback);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchHouses(currentPage);
  }, [currentPage]);

  // Handle page change navigation
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const container = document.getElementById('rooms-column-top');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter rows
  const filteredRows = value.filter((row) => {
    const rowStr = JSON.stringify(row).toLowerCase();
    const matchesSearch = rowStr.includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || rowStr.includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div id="rooms-column-top" className="w-full flex flex-col items-center animate-fadeIn">
      {/* Top Banner & Filter Controls */}
      <div className="w-full max-w-3xl mb-5 space-y-4">
        {/* Lively Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                <Building2 size={18} />
              </div>
              <h2 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Available Student Rooms & Hostels
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Verified comrade accommodations in Kakamega (MMUST) & Nairobi
            </p>
          </div>

          {/* Current Page Indicator Pill */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-indigo-700 border border-indigo-200 shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => fetchHouses(currentPage)}
              title="Refresh listings"
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Quick Filter Bar */}
        <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search house name, Kefinco, Amalemba, MMUST..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Bedsitter', '1-Bedroom', 'Single Room'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === type
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Column of Shopping Cart Card Items */}
      {loading ? (
        <div className="w-full max-w-3xl py-16 flex flex-col items-center justify-center space-y-3 bg-white rounded-3xl border border-slate-200 shadow-xs">
          <Loader2 size={36} className="text-indigo-600 animate-spin" />
          <p className="text-xs font-semibold text-slate-600">
            Loading room listings for Page {currentPage}...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col gap-3.5">
          {filteredRows.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs space-y-3 shadow-xs">
              <AlertCircle size={28} className="mx-auto text-amber-500" />
              <p className="font-semibold text-sm text-slate-800">
                No rooms found matching "{searchTerm || activeFilter}".
              </p>
              <button
                onClick={() => {
                  setLocalSearch('');
                  setActiveFilter('All');
                }}
                className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-semibold text-xs transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredRows.map((data, index) => {
              const id = String(data[0] || index);
              const name = String(data[1] || '');
              const isCarted = cartItems.some(
                (item) => item.id === id || item.house_name === name
              );

              return (
                <Cardimage
                  key={`room-${currentPage}-${index}`}
                  text={data}
                  isCarted={isCarted}
                  onAddToCart={(item) => {
                    if (onAddToCart) {
                      onAddToCart(item);
                    }
                  }}
                  onSelect={onSelectHouse}
                />
              );
            })
          )}
        </div>
      )}

      {/* Navigation Buttons At The Bottom: Current Page Dictating the Page They Are In */}
      <div className="w-full max-w-3xl mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
          <span>Showing</span>
          <strong className="text-indigo-700 font-bold">
            Page {currentPage} of {totalPages}
          </strong>
          <span className="text-slate-300">•</span>
          <span>{totalItems} total student listings</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <ChevronLeft size={16} />
            <span>PREV</span>
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isActive = currentPage === pageNum;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                disabled={loading}
                title={`Go to Page ${pageNum}`}
                className={`w-10 h-10 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-300 scale-105 font-black'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>NEXT</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
