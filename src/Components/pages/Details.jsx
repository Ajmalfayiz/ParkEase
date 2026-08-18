import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  MapPin,
  Star,
  Zap,
  ShieldCheck,
  Clock,
  Car,
  Navigation,
  CheckCircle2,
  Phone,
  Info,
  Calendar,
  CreditCard,
  ChevronRight,
  ArrowLeft,
  Share2,
  Bookmark,
  Accessibility,
  Video,
  Sparkles,
  AlertCircle,
} from "lucide-react";

// Dataset corresponding to the directory spots
const PARKING_LOT_DATA = {
  "lot-1": {
    id: "lot-1",
    name: "Mission Bay Premier Garage",
    type: "Covered Multi-Level Garage",
    address: "580 4th Street, San Francisco, CA 94107",
    distance: "0.2 miles away (3 min walk)",
    hourlyRate: 6.0,
    dailyMax: 32.0,
    rating: 4.8,
    reviewCount: 342,
    totalSpots: 120,
    availableSpots: 34,
    clearance: "7ft 2in (2.18m)",
    hasEv: true,
    evRate: 4.0,
    isCovered: true,
    hasSecurity: true,
    valet: false,
    operatingHours: "Open 24/7 (Access via automated gate)",
    images: [
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Mission Bay Premier Garage is a modern, high-clearance parking garage offering automated license-plate recognition, Level 2 and DC Fast EV charging stations, CCTV security, and pedestrian elevators connecting directly to 4th Street.",
    amenities: [
      { icon: Video, title: "24/7 CCTV & Security Patrol", desc: "Monitored day and night" },
      { icon: Zap, title: "8 Fast EV Charging Bays", desc: "Tesla Supercharger & J1772" },
      { icon: ShieldCheck, title: "Covered & Weatherproof", desc: "Fully protected indoor deck" },
      { icon: Accessibility, title: "Accessible Parking", desc: "6 handicap bays near elevators" },
      { icon: Clock, title: "Contactless License Entry", desc: "No paper tickets required" },
      { icon: Navigation, title: "Level-by-Level LED Guides", desc: "Shows free bays per aisle" },
    ],
    entryInstructions: [
      "Approach the gate on 4th Street (between Townsend & King St).",
      "Your license plate will be automatically scanned. Alternatively, scan your app QR code at the scanner pillar.",
      "Park in any open standard bay on Levels 2 through 4 (Level 1 reserved for EV and Mobility Access).",
      "On exit, simply approach the barrier gate to validate out.",
    ],
    reviews: [
      {
        id: 1,
        author: "Marcus Vance",
        rating: 5,
        date: "2 days ago",
        comment: "Flawless check-in. The camera caught my license plate immediately and the EV fast charger filled my battery in under an hour.",
      },
      {
        id: 2,
        author: "Elena Rostova",
        rating: 5,
        date: "1 week ago",
        comment: "Very clean and bright compared to most downtown garages. Feeling safe walking back at 10 PM was a huge plus.",
      },
    ],
  },
  "lot-2": {
    id: "lot-2",
    name: "Downtown Financial Plaza Lot",
    type: "Underground Secure Facility",
    address: "201 California St, San Francisco, CA 94111",
    distance: "0.5 miles away (7 min walk)",
    hourlyRate: 8.5,
    dailyMax: 45.0,
    rating: 4.9,
    reviewCount: 512,
    totalSpots: 80,
    availableSpots: 8,
    clearance: "6ft 8in (2.03m)",
    hasEv: true,
    evRate: 5.0,
    isCovered: true,
    hasSecurity: true,
    valet: true,
    operatingHours: "6:00 AM – Midnight Daily",
    images: [
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Located in the heart of the Financial District, this premium subterranean facility features optional white-glove valet drop-off, heated interior decks, and on-site security personnel.",
    amenities: [
      { icon: ShieldCheck, title: "On-site Security Attendant", desc: "Dedicated personnel on duty" },
      { icon: Car, title: "Optional Valet Parking", desc: "Drop off keys at reception" },
      { icon: Zap, title: "EV Charging Stations", desc: "Universal Level 2 connectors" },
      { icon: Video, title: "High-Definition Surveillance", desc: "360-degree coverage" },
    ],
    entryInstructions: [
      "Enter via the California Street driveway ramp.",
      "Show your mobile reservation barcode to the valet booth attendant.",
      "Proceed to the assigned parking stall or hand keys to the valet captain.",
    ],
    reviews: [
      {
        id: 1,
        author: "David Chen",
        rating: 5,
        date: "3 days ago",
        comment: "Top notch executive parking. The valet service had my car ready at the exact requested departure time.",
      },
    ],
  },
  "lot-3": {
    id: "lot-3",
    name: "SOMA Open-Air Express Lot",
    type: "Paved Surface Lot",
    address: "850 Folsom St, San Francisco, CA 94107",
    distance: "0.8 miles away (11 min walk)",
    hourlyRate: 4.0,
    dailyMax: 20.0,
    rating: 4.3,
    reviewCount: 189,
    totalSpots: 50,
    availableSpots: 22,
    clearance: "No height restriction (Open-Air)",
    hasEv: false,
    evRate: 0,
    isCovered: false,
    hasSecurity: true,
    valet: false,
    operatingHours: "Open 24/7",
    images: [
      "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Budget-friendly, high-clearance surface lot ideal for large SUVs, pickup trucks, and quick stops near the Moscone Center and SOMA tech offices.",
    amenities: [
      { icon: Car, title: "No Height Restrictions", desc: "Oversized vehicles & vans welcome" },
      { icon: Video, title: "CCTV Perimeter Monitoring", desc: "Fenced lot with automated entry" },
      { icon: Clock, title: "Instant In & Out Access", desc: "Direct street-level bays" },
    ],
    entryInstructions: [
      "Pull up to the barrier gate on Folsom St.",
      "Scan the app QR code at the terminal.",
      "Park in any unreserved open stall.",
    ],
    reviews: [
      {
        id: 1,
        author: "Sarah Jenkins",
        rating: 4,
        date: "5 days ago",
        comment: "Great affordable rate for downtown SF! Plenty of room for my Ford F-150.",
      },
    ],
  },
  "lot-4": {
    id: "lot-4",
    name: "Embarcadero Pier Deck",
    type: "Rooftop & Covered Bays",
    address: "The Embarcadero & Green St, San Francisco, CA 94111",
    distance: "1.1 miles away (15 min walk)",
    hourlyRate: 7.0,
    dailyMax: 35.0,
    rating: 4.7,
    reviewCount: 278,
    totalSpots: 150,
    availableSpots: 65,
    clearance: "7ft 0in (2.13m)",
    hasEv: true,
    evRate: 4.5,
    isCovered: true,
    hasSecurity: true,
    valet: false,
    operatingHours: "Open 24/7",
    images: [
      "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Scenic waterfront facility offering both rooftop panoramic views and lower covered decks with direct pedestrian access to the Embarcadero promenade and ferry terminals.",
    amenities: [
      { icon: Zap, title: "Level 2 EV Stations", desc: "12 dual-port stations" },
      { icon: ShieldCheck, title: "24/7 Security Patrol", desc: "Regular foot and vehicle patrols" },
      { icon: Navigation, title: "Transit Proximity", desc: "Steps from MUNI & Ferry Building" },
    ],
    entryInstructions: [
      "Enter at the Green Street signal intersection.",
      "Tap credit card or scan mobile pass at the touch screen.",
      "Follow signage for rooftop or covered levels.",
    ],
    reviews: [
      {
        id: 1,
        author: "Carlos Mendez",
        rating: 5,
        date: "2 weeks ago",
        comment: "Perfect spot for catching the morning ferry. The rooftop level has stunning bay views too.",
      },
    ],
  },
};

const ParkingLotDetailsPage=()=> {
  const [activeLotId, setActiveLotId] = useState("lot-1");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [durationHours, setDurationHours] = useState(3);
  const [includeEv, setIncludeEv] = useState(false);
  const [vehicleSize, setVehicleSize] = useState("standard");
  const [isSaved, setIsSaved] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const lot = PARKING_LOT_DATA[activeLotId] || PARKING_LOT_DATA["lot-1"];

  // Cost calculation
  const parkingCost = durationHours * lot.hourlyRate;
  const evCost = lot.hasEv && includeEv ? lot.evRate : 0;
  const serviceFee = 1.75;
  const grandTotal = (parkingCost + evCost + serviceFee).toFixed(2);

  const handleReserve = (e) => {
    e.preventDefault();
    setIsBookingSuccess(true);
    setTimeout(() => setIsBookingSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased pb-16">
      
      {/* Top Navigation & Lot Selector Bar */}
      <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link
              to="/listing"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Back to search results"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
                
              <span className="text-xs text-slate-400">Viewing Facility</span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {lot.name}
              </div>
            </div>
          </div>

          {/* Quick Lot Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 hidden sm:inline">Switch Lot:</span>
            <select
              value={activeLotId}
              onChange={(e) => {
                setActiveLotId(e.target.value);
                setActiveImageIndex(0);
                setIncludeEv(false);
              }}
              className="bg-slate-800 text-slate-200 text-xs font-semibold rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(PARKING_LOT_DATA).map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} (${item.hourlyRate}/hr)
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-lg border transition ${
                isSaved
                  ? "bg-blue-600/20 border-blue-500 text-blue-400"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
              }`}
              title="Save Lot"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => alert("Link copied to clipboard!")}
              className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition"
              title="Share Lot"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Header Summary */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                {lot.type}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {lot.availableSpots} Spots Open
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lot.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white">{lot.rating}</span>
                <span className="text-slate-500 font-normal">({lot.reviewCount} verified reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{lot.address}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{lot.distance}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(lot.address)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-1.5"
            >
              <Navigation className="w-4 h-4" />
              Get Turn-by-Turn
            </a>
          </div>
        </div>

        {/* Visual Gallery & Quick Capacity Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
          
          {/* Main Photo Gallery */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 h-72 sm:h-96">
            <img
              src={lot.images[activeImageIndex] || lot.images[0]}
              alt={lot.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
            
            {/* Gallery Selector Thumbnails */}
            {lot.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {lot.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition ${
                      activeImageIndex === idx ? "border-blue-500 scale-105" : "border-slate-700/80 opacity-70"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-medium text-slate-300 border border-slate-700">
              Clearance: {lot.clearance}
            </div>
          </div>

          {/* Real-time Occupancy & Quick Stats Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Lot Occupancy
              </h2>
              
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-extrabold text-white">
                  {lot.availableSpots}{" "}
                  <span className="text-sm font-normal text-slate-400">/ {lot.totalSpots} Bays</span>
                </span>
                <span className="text-xs font-bold text-blue-400">
                  {Math.round(((lot.totalSpots - lot.availableSpots) / lot.totalSpots) * 100)}% Occupied
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((lot.totalSpots - lot.availableSpots) / lot.totalSpots) * 100}%`,
                  }}
                />
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-300 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Operating Schedule:</span>
                  <span className="font-medium text-white">{lot.operatingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">EV Superchargers:</span>
                  <span className="font-medium text-white">
                    {lot.hasEv ? "Available (Level 2 & DC)" : "Not Available"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Daily Max Rate:</span>
                  <span className="font-medium text-emerald-400">${lot.dailyMax.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />
              <span>Guaranteed parking space reserved immediately upon checkout.</span>
            </div>
          </div>

        </div>

        {/* Content Layout: Left Details, Right Reservation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          
          {/* Details & Specs Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview */}
            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-3">About this Parking Facility</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {lot.description}
              </p>
            </section>

            {/* Amenities Grid */}
            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Features & Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {lot.amenities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70"
                    >
                      <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 shrink-0 border border-blue-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">{item.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Entry Guidelines */}
            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Arrival & Parking Steps</h2>
              <div className="space-y-3">
                {lot.entryInstructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Verified Reviews */}
            <section className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">Driver Feedback</h2>
                  <p className="text-xs text-slate-400">Recent check-in experiences</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-amber-400 flex items-center gap-1 justify-end">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{lot.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-500">340+ drivers</span>
                </div>
              </div>

              <div className="space-y-3">
                {lot.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-white">{rev.author}</span>
                      <span className="text-slate-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Booking / Pricing Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              
              {/* Success Notification */}
              {isBookingSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Spot successfully booked! Pass issued to your account.</span>
                </div>
              )}

              {/* Price Header */}
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-black text-white">${lot.hourlyRate.toFixed(2)}</span>
                  <span className="text-xs text-slate-400"> / hour</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-emerald-400 block">Free Cancellation</span>
                  <span className="text-[10px] text-slate-500">Up to 1 hr prior</span>
                </div>
              </div>

              <form onSubmit={handleReserve} className="space-y-4">
                
                {/* Vehicle Sizing */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Vehicle Type
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setVehicleSize("standard")}
                      className={`py-2 px-3 rounded-lg border transition ${
                        vehicleSize === "standard"
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      Sedan / Compact
                    </button>
                    <button
                      type="button"
                      onClick={() => setVehicleSize("suv")}
                      className={`py-2 px-3 rounded-lg border transition ${
                        vehicleSize === "suv"
                          ? "bg-blue-600 text-white border-blue-500"
                          : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      SUV / Truck
                    </button>
                  </div>
                </div>

                {/* Duration Slider */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider">Duration</span>
                    <span className="text-blue-400 font-bold">{durationHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>1h</span>
                    <span>4h</span>
                    <span>8h</span>
                    <span>12h</span>
                  </div>
                </div>

                {/* EV Addon Toggle */}
                {lot.hasEv ? (
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="text-xs font-semibold text-white">Add EV Fast Charge</div>
                        <div className="text-[10px] text-slate-400">+${lot.evRate.toFixed(2)} plug-in fee</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={includeEv}
                      onChange={(e) => setIncludeEv(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                    />
                  </label>
                ) : (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] text-slate-500 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" />
                    <span>No EV chargers at this surface lot.</span>
                  </div>
                )}

                {/* Pricing Breakdown Calculation */}
                <div className="space-y-2 pt-3 border-t border-slate-800 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>
                      Parking ({durationHours} hrs × ${lot.hourlyRate.toFixed(2)})
                    </span>
                    <span>${parkingCost.toFixed(2)}</span>
                  </div>

                  {lot.hasEv && includeEv && (
                    <div className="flex justify-between text-slate-400">
                      <span>EV Dedicated Port Fee</span>
                      <span>${evCost.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-400">
                    <span>Service & Processing</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                    <span>Estimated Total</span>
                    <span className="text-blue-400 text-base">${grandTotal}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/30 transition duration-150 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  Reserve Spot (${grandTotal})
                </button>

                <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  100% Guaranteed spot with instant QR pass
                </p>

              </form>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default ParkingLotDetailsPage