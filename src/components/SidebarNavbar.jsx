import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  ShoppingCart, 
  MapPin, 
  X, 
  Trash2, 
  Phone, 
  CheckCircle2, 
  Home as HomeIcon,
  Compass,
  Layers,
  Menu,
  Tag,
  ArrowRight,
  Code2
} from 'lucide-react';

export default function SidebarNavbar({
  children,
  activeRoute = 'houses',
  onNavigate,
  cartItems = [],
  onRemoveFromCart,
  onClearCart,
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'All',
  onSelectCategory,
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  // Calculate total monthly rent in cart
  const totalRent = cartItems.reduce((acc, item) => {
    const numeric = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + numeric;
  }, 0);

  const categories = [
    { label: 'All Listings', icon: Layers, value: 'All' },
    { label: 'Bedsitters', icon: HomeIcon, value: 'Bedsitter' },
    { label: 'Single Rooms', icon: Tag, value: 'Single Room' },
    { label: '1-Bedroom Flats', icon: Building2, value: '1-Bedroom' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-['Plus_Jakarta_Sans']">
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
              M
            </div>
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              Makazi<span className="text-indigo-600">Shop</span>
            </span>
          </div>
        </div>

        {/* Mobile Cart Trigger */}
        <button
          onClick={() => setIsCartModalOpen(true)}
          className="relative p-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          <ShoppingCart size={20} />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs animate-fadeIn"
        />
      )}

      {/* Left Sidebar Navigation Bar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Compass size={22} />
              </div>
              <div>
                <h1 className="font-extrabold text-lg text-slate-900 tracking-tight leading-tight">
                  Makazi<span className="text-indigo-600">Shop</span>
                </h1>
                <p className="text-[11px] font-medium text-slate-500">
                  Student Housing Marketplace
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Nav Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
              Menu
            </span>

            <button
              onClick={() => {
                onNavigate('houses');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeRoute === 'houses'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HomeIcon size={18} />
                <span>Browse Rooms</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  activeRoute === 'houses'
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                Catalog
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('register');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeRoute === 'register'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle size={18} />
                <span>List / Register Room</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">
                Landlord
              </span>
            </button>

            <button
              onClick={() => {
                onNavigate('map');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeRoute === 'map'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin size={18} />
                <span>Campus Radar & Map</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">MMUST</span>
            </button>

            <button
              onClick={() => {
                onNavigate('portfolio');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeRoute === 'portfolio'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Code2 size={18} />
                <span>Tech Stack & Portfolio</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">
                27 Tech
              </span>
            </button>
          </div>

          {onSelectCategory && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
                Quick Category Filter
              </span>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.value}
                    onClick={() => {
                      onSelectCategory(cat.value);
                      if (activeRoute !== 'houses') onNavigate('houses');
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={15} className={isSelected ? 'text-indigo-600' : 'text-slate-400'} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Shopping Cart Summary Card Inside Sidebar */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-emerald-50/50 border border-indigo-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
                  <ShoppingCart size={15} />
                </div>
                <span className="font-bold text-xs text-slate-800">Your Shortlist</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[11px]">
                {cartItems.length}
              </span>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-xs text-slate-500">
                No rooms added yet. Click <strong className="text-slate-700">"Add to Cart"</strong> on any house listing to compare!
              </p>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Monthly Rent:</span>
                  <strong className="text-emerald-700 font-extrabold">
                    KES {totalRent.toLocaleString()}
                  </strong>
                </div>

                <button
                  onClick={() => setIsCartModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Review Shortlist ({cartItems.length})</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Direct Comrade Access</span>
            <span className="font-bold text-emerald-600">0% Commission</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pt-16 lg:pt-0">
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {onSearchChange ? (
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by house name, campus distance, MMUST, Kefinco..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
              </div>
            ) : (
              <span className="text-xs font-semibold text-slate-500">
                Verified Student Rooms • Masinde Muliro University & Nairobi
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCartModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-indigo-200/60 font-semibold text-xs cursor-pointer"
            >
              <ShoppingCart size={15} />
              <span>Cart</span>
              {cartItems.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-[10px] min-w-[18px] text-center">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-semibold text-slate-700">
              MakaziShop Comrade Housing Marketplace
            </span>
            <span>Serving MMUST Kakamega & Nairobi University Students</span>
          </div>
        </footer>
      </div>

      {/* Shortlist Cart Modal */}
      {isCartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col max-h-[85vh] overflow-hidden text-slate-900">
            <div className="flex items-center justify-between p-4.5 bg-slate-50 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Your Shortlisted Rooms ({cartItems.length})
                  </h3>
                  <span className="text-xs text-slate-500">
                    Compare rooms and connect directly with verified leasers
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsCartModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <ShoppingCart size={36} className="mx-auto text-slate-300" />
                  <p className="font-semibold text-sm text-slate-700">Your cart is empty</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Browse the rooms list and click "ADD TO CART" on any house to add it here.
                  </p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 transition-all shadow-xs"
                  >
                    <img
                      src={item.image_url}
                      alt={item.house_name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {item.house_name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">{item.location}</p>
                      <span className="text-sm font-extrabold text-emerald-600 block mt-0.5">
                        {item.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
                      className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-colors"
                      title="Remove from shortlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-4.5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 uppercase">Estimated Total Rent:</span>
                  <strong className="text-lg font-black text-emerald-700">
                    KES {totalRent.toLocaleString()} / mo
                  </strong>
                </div>

                {inquirySent ? (
                  <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Inquiry sent to leasers! They will contact you shortly.</span>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={onClearCart}
                      className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setInquirySent(true)}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
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
    </div>
  );
}
