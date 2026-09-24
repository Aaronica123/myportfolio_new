import React, { useState } from 'react';
import axios_client from '../axios/axios';
import { 
  Building2, 
  MapPin, 
  Upload, 
  Navigation, 
  CheckCircle2, 
  AlertCircle, 
  Phone,
  ArrowRight
} from 'lucide-react';
import Button from '../components/button';

export default function Register_Form({ onSuccess }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [houseName, setHouseName] = useState('Sunrise Comrade Heights');
  const [houseType, setHouseType] = useState('Bedsitter (Self-Contained)');
  const [price, setPrice] = useState('6500');
  const [locality, setLocality] = useState('Kefinco, Kakamega (MMUST Main Gate)');
  const [amenities, setAmenities] = useState('24/7 Borehole Water, High-Speed WiFi, CCTV');
  const [contact, setContact] = useState('+254 712 345 678');
  const [coordinates, setCoordinates] = useState({ lat: 0.2827, long: 34.7519 });
  const [isLocating, setIsLocating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Handle local image file selection
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  // Browser Geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage({ type: 'error', text: 'Geolocation is not supported by your browser.' });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoordinates({
          lat: Number(pos.coords.latitude.toFixed(6)),
          long: Number(pos.coords.longitude.toFixed(6)),
        });
        setIsLocating(false);
        setStatusMessage({
          type: 'success',
          text: `GPS coordinates captured: Lat ${pos.coords.latitude.toFixed(4)}, Long ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      (err) => {
        setIsLocating(false);
        setCoordinates({ lat: 0.2827, long: 34.7519 });
        setStatusMessage({
          type: 'error',
          text: 'Location permission denied. Defaulted to MMUST Kakamega (0.2827° N, 34.7519° E).',
        });
      },
      { enableHighAccuracy: true }
    );
  };

  // Submit to backend endpoint as provided
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);

    try {
      const payload = {
        house_name: houseName,
        type: houseType,
        price: price,
        location: locality,
        amenities: amenities,
        contact: contact,
        house_location: coordinates,
        image_url:
          imagePreview ||
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
      };

      const res = await axios_client.post('/api/register_house', payload);

      if (res.status === 200 || res.status === 201) {
        setStatusMessage({
          type: 'success',
          text: `"${houseName}" registered successfully! It is now live in the marketplace.`,
        });
        if (onSuccess) {
          setTimeout(onSuccess, 1400);
        }
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to register house. Please check data and try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fadeIn space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border border-slate-200/90 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
            Landlord & Leaser Portal
          </span>
          <h2 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
            List a Student Room / House
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Connect directly with verified students and comrades with 0% middleman fees.
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 shrink-0">
          <Building2 size={24} />
        </div>
      </div>

      {/* Status Notice */}
      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Registration Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              House / Hostel Name *
            </label>
            <input
              type="text"
              required
              value={houseName}
              onChange={(e) => setHouseName(e.target.value)}
              placeholder="e.g. Sunrise Comrades Heights"
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Room Category *
            </label>
            <select
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            >
              <option value="Bedsitter (Self-Contained)">Bedsitter (Self-Contained)</option>
              <option value="Single Room (Shared Amenities)">Single Room (Shared Amenities)</option>
              <option value="1-Bedroom Apartment">1-Bedroom Apartment</option>
              <option value="Modern Studio Apartment">Modern Studio Apartment</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Monthly Rent (KES) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                KES
              </span>
              <input
                type="number"
                required
                min={1000}
                max={50000}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="6500"
                className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              Landlord / Caretaker Phone *
            </label>
            <div className="relative">
              <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+254 712 345 678"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Locality & Distance to Campus *
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="e.g. Kefinco, Kakamega (450m from MMUST Main Gate)"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Included Amenities & Utilities
          </label>
          <input
            type="text"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
            placeholder="e.g. 24/7 Borehole Water, High-Speed WiFi, CCTV, Token Meter"
            className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium focus:border-indigo-500 focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Navigation size={14} className="text-indigo-600" />
              <span>Geolocation Coordinates</span>
            </span>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isLocating}
              className="px-3 py-1.5 rounded-xl bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <Navigation size={12} className={isLocating ? 'animate-spin' : ''} />
              <span>{isLocating ? 'Capturing GPS...' : 'Use My Current Location'}</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">LATITUDE:</span>
              <input
                type="number"
                step="any"
                value={coordinates.lat}
                onChange={(e) => setCoordinates({ ...coordinates, lat: parseFloat(e.target.value) || 0 })}
                className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs"
              />
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-semibold">LONGITUDE:</span>
              <input
                type="number"
                step="any"
                value={coordinates.long}
                onChange={(e) => setCoordinates({ ...coordinates, long: parseFloat(e.target.value) || 0 })}
                className="w-full p-2 rounded-xl bg-white border border-slate-200 text-slate-800 font-mono text-xs"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            Room / House Photograph
          </label>
          <div className="flex items-center gap-4">
            <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-5 cursor-pointer text-center bg-slate-50/50 hover:bg-indigo-50/20 transition-all">
              <Upload size={22} className="mx-auto text-indigo-600 mb-1.5" />
              <span className="text-xs font-semibold text-slate-700 block">
                Click to browse photo or drag & drop
              </span>
              <span className="text-[11px] text-slate-400">
                PNG, JPG or WEBP up to 10MB
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagePreview && (
              <div className="w-24 h-24 rounded-2xl border border-slate-200 overflow-hidden relative shrink-0 shadow-xs">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[10px] font-bold text-center text-white py-0.5">
                  PREVIEW
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={submitting}
            size="lg"
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-md shadow-indigo-600/20"
          >
            {submitting ? (
              <span>Publishing Room Listing...</span>
            ) : (
              <>
                <span>Publish Room to Marketplace</span>
                <ArrowRight size={17} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
