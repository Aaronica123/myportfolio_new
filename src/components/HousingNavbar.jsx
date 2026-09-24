import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  ShoppingCart, 
  MapPin, 
  SlidersHorizontal, 
  X, 
  Trash2, 
  Phone, 
  CheckCircle2,
  Compass,
  Home as HomeIcon
} from 'lucide-react';

export default function HousingNavbar({
  children,
  activeRoute = 'houses',
  onNavigate,
  cartItems = [],
  onRemoveFromCart,
  onClearCart,
  searchTerm = '',
  onSearchChange,
  selectedCampus = 'All Campuses',
  onCampusChange,
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const totalRent = cartItems.reduce((acc, item) => {
    const numeric = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + numeric;
  }, 0);

  const handleNav = (route) => {
    if (onNavigate) {
      onNavigate(route);
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('houses')}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
                  <Compass size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                      Makazi<span className="text-indigo-600">Shop</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      ROOMS
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                    Student Accommodations & Direct Leaser Hub
                  </p>
                </div>
              </button>
            </div>

            <nav className="hidden md:flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => handleNav('houses')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeRoute === 'houses'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <HomeIcon size={14} />
                <span>All Rooms</span>
              </button>

              <button
                onClick={() => handleNav('register')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeRoute === 'register'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <PlusCircle size={14} />
                <span>Register House</span>
              </button>

              <button
                onClick={() => handleNav('map')}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeRoute === 'map'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <MapPin size={14} />
                <span>Radar & Map</span>
              </button>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-all flex items-center gap-2 border border-indigo-200/80 font-bold text-xs"
                title="View Shortlisted Rooms"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">SHORTLIST</span>
                {cartItems.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px] min-w-[18px] text-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 flex flex-col">
        {children}
      </main>

      {/* Shopping Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-900">
            <div className="flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <ShoppingCart size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    YOUR SHORTLISTED ROOMS
                  </h3>
                  <span className="text-xs text-slate-500">
                    {cartItems.length} room{cartItems.length === 1 ? '' : 's'} added
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShoppingCart size={36} className="mx-auto text-slate-300" />
                  <p className="font-semibold text-sm">Your shortlist is empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200 bg-white"
                  >
                    <img
                      src={item.image_url}
                      alt={item.house_name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item.house_name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{item.location}</p>
                      <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                        {item.price}
                      </span>
                    </div>
                    {onRemoveFromCart && (
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-semibold uppercase">Total Monthly Rent:</span>
                  <strong className="text-base font-extrabold text-emerald-700">
                    KES {totalRent.toLocaleString()} / mo
                  </strong>
                </div>

                {inquirySent ? (
                  <div className="p-2.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Inquiry sent to leasers!</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    {onClearCart && (
                      <button
                        onClick={onClearCart}
                        className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        Clear All
                      </button>
                    )}
                    <button
                      onClick={() => setInquirySent(true)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Phone size={14} />
                      <span>Contact Leasers (Direct WhatsApp)</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="w-full bg-white border-t border-slate-200 text-slate-500 py-4 px-4 text-center text-xs">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-slate-700">MakaziShop Comrade Housing</span>
          <span className="text-slate-500">MMUST Kakamega & Nairobi Campuses</span>
        </div>
      </footer>
    </div>
  );
}
